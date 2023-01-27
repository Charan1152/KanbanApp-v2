<template style="background-color:#CCCCCC;">
  <div class="card-body" style="padding-left:20px;">
    <div>
      <b-navbar fixed="top" toggleable="lg" type="dark" style="border-radius:12px;background-color:#243748">
        <b-navbar-brand></b-navbar-brand>
        <b-navbar-brand></b-navbar-brand>
        <b-navbar-brand><router-link to="/HomeView"><b>KanbanApp</b></router-link></b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav class="ml-auto">
            <b-nav-item><router-link to="/summary"><b>Summary</b></router-link></b-nav-item>
            <b-nav-item>|</b-nav-item>
            <!-- <a href="/"><b>Logout</b></a> -->
            <b-nav-item><b><router-link to="/logout">Logout</router-link></b></b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>

      <br/><br/><br/>


      <canvas id="stackedbar" style="width:50px;height:20px;"></canvas>
      <div class="d-grid gap-2 d-md-block" id="charts">
        <button class="btn btn-dark" type="button" id="bar">Bar Chart</button>
        &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;
        <button class="btn btn-dark" type="button" id="line">Line Chart</button>
      </div>
    </div>
  </div>
</template>

<script>
import Chart from 'chart.js/auto';
export default {
  name: 'SummaryView',
  data() {
    return {
      chartData: {
        labels: [],
        data0: [],
        data1: [],
        datasets: [{ data: [40, 20, 12] }]
      },
      chartOptions: {
        responsive: true
      }
    }
  },
  async mounted() {
    const response = await fetch('http://localhost:5000/api/1', { headers: { 'Authentication-token': this.$store.getters.token } })
    this.userData = await response.json()
    this.fun()
  },
  methods: {
    fun: function () {
      //     let labels = JSON.parse({{labels | tojson}})
      // let data1 = JSON.parse({{data1 | tojson}})
      // let data0 = JSON.parse({{data0 | tojson}})

      // let line = document.getElementById('line');
      // let bar = document.getElementById('bar');

      // line.addEventListener('click', linechart)
      // bar.addEventListener('click', barchart)
      for (let i = 0; i < this.userData.lists.length; i++) {
        this.chartData.labels.push(this.userData.lists[i].listname)
        let temp1 = 0
        let temp0 = 0
        for (let j = 0; j < this.userData.lists[i].cards.length; j++) {
          if (this.userData.lists[i].cards[j].iscomplete == true) {
            temp1 += 1
          }
          else {
            temp0 += 1
          }
        }
        this.chartData.data1.push(temp1)
        this.chartData.data0.push(temp0)
      }


      const data = {
        labels: this.chartData.labels,
        datasets: [{
          label: 'Completed',
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgb(54, 162, 235)',
          borderWidth: 4,
          data: this.chartData.data1,
        },
        {
          label: 'Not completed',
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgb(255, 99, 132)',
          borderWidth: 4,
          data: this.chartData.data0,
        }
        ]
      };
      const config = {
        type: 'bar',
        data: data,
        options: {
          scales: {
            x: {
              stacked: true,
            },
            y: {
              stacked: true,
              beginAtZero: true
            }
          }
        }
      };

      const myChart = new Chart(document.getElementById('stackedbar'), config);

      // console.log(myChart)
      let line = document.getElementById('line');
      let bar = document.getElementById('bar');

      line.addEventListener('click', linechart)
      bar.addEventListener('click', barchart)

      function barchart() {
        myChart.config.type = 'bar';
        myChart.update();
      }
      function linechart() {
        myChart.config.type = 'line';
        myChart.update();
      }
    }
  }
}
</script>





























<!-- <template>
  <Bar
    id="my-chart-id"
    :options="chartOptions"
    :data="chartData"
  />
</template>

<script lang="ts">
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: 'BarChart',
  components: { Bar },
  data() {
    return {
      chartData: {
        labels: [],
        datasets: [ { data: [40, 20, 12] } ]
      },
      chartOptions: {
        responsive: true
      }
    }
  },
  async mounted() {
      const response = await fetch('http://localhost:5000/api/1')
      this.userData = await response.json()
      let obj=[]
      for(let i in this.userData.lists){
        obj.push(this.userData.lists[i].listname)
      }
      this.chartData.labels = obj
    }
}
</script> -->


<template>
  <div class="card-body">
    <div>
        <canvas id="stackedbar"></canvas>
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
        data0:[],
        data1:[],
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
      this.fun()
    },
    methods:{
      fun: function(){
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
                    if (this.userData.lists[i].cards[j].iscomplete == '1') {
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
    ]};   
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


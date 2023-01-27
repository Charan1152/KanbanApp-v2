<template>
  <html>
  <div class="home" style="padding:30px;background-color:#CCCCCC;">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Trirong">
    
    <div>
      <b-navbar fixed="top" toggleable="lg" type="dark" style="border-radius:12px;background-color:#243748">
        <b-navbar-brand></b-navbar-brand>
        <b-navbar-brand></b-navbar-brand>
        <b-navbar-brand style="color:white;"><router-link to="/HomeView"><b style="color:white;">KanbanV2</b></router-link></b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav class="ml-auto">
            <b-nav-item v-b-modal.modal-prevent-closing><b style="color:white;">Add New List</b></b-nav-item>
            <b-nav-item >|</b-nav-item>
            <b-nav-item><router-link to="/summary"><b style="color:white;">Summary</b></router-link></b-nav-item>
            <b-nav-item >|</b-nav-item>
            <!-- <a href="/"><b>Logout</b></a> -->
            <b-nav-item><router-link to="/logout"><b style="color:white;">Logout</b></router-link></b-nav-item>
            <b-modal
              id="modal-prevent-closing"
              ref="modal"
              title="Add List"
              @show="resetModal"
              @hidden="resetModal"
              @ok="handleOk"
              >
              <form ref="form" @submit.stop.prevent="handleSubmit">
                <b-form-group
                  label="List Name"
                  label-for="name-input"
                  :invalid-feedback="invalidFeedbackadd"
                  :state="nameState"
                  >
                  <b-form-input
                    id="name-input"
                    v-model="listname"
                    :state="nameState"
                    trim
                    ></b-form-input>
                </b-form-group>
              </form>
            </b-modal>
            <b-nav-item >|</b-nav-item>
            
            <b-nav-form>
              <b-form-input v-model="search" size="sm" class="mr-sm-2" placeholder="Search Lists"></b-form-input>
            </b-nav-form>
            
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>


    <br>
    <br>


    <div>
      <b-card-group deck>
        <NoLists v-if="userData.lists.length == 0"></NoLists>
        <div class="container-fluid text-center col row cols-5 row-cols-1 row-cols-md-5 g-4">
          <MyList v-for="i, j in (userData.lists, searchlist)" :card="getActiveCards(i.cards)" :key="i.list_id" :title="searchlist[j].listname"
            :id="i.list_id" :lists="userData.lists" :lst="i"></MyList>
        </div>
      </b-card-group>
    </div>
  </div>
</html>

</template>

<script>
  // @ is an alias to /src  
  export default {
    name: 'HomeView',
    data: function () {
      return {
        userData: {},
        search: '',
        addlist: "addlist",
        listname: ''
      }
    },
    async mounted() {
      
      const response = await fetch(`http://127.0.0.1:5000/api/${localStorage.getItem('id')}`, {headers:{'Authentication-token':localStorage.getItem('token')}})
      this.userData = await response.json()
    },
    computed: {
      searchlist: function () {
        return this.userData.lists.filter(e => e.listname.includes(this.search))
      },
      
      
      nameState(){
        function check(listnameeditx,lists){
          for (let i in lists){
            if(lists[i].listname == listnameeditx){
              return true
            }
          }
          return false
        }
        return (this.listname.length > 0 && !check(this.listname,this.userData.lists))
      },
      invalidFeedbackadd(){
        function check(listname,lists){
          for (let i in lists){
            if(lists[i].listname == listname){
              return true
            }
          }
          return false
        }
        if (this.listname.length == 0){
          return "Name is required"
        }
        else if (check(this.listname,this.userData.lists)){
          return "Name already exits"
        }
        return "Please enter properly"
      }
    },
    methods: {
      checkFormValidity() {
        const valid = this.$refs.form.checkValidity()
        this.nameState = valid
        return valid
      },
      resetModal() {
        this.name = ''
        this.nameState = null
      },
      handleOk(bvModalEvent) {
        // Prevent modal from closing
        bvModalEvent.preventDefault()
        // Trigger submit handler
        this.handleSubmit()
      },
      async handleSubmit() {
        // Exit when the form isn't valid
        if (!this.checkFormValidity()) {
          return
        }
        // Push the name to submitted names
        await fetch(`http://localhost:5000/api/createList/${this.userData.user_id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authentication-token':localStorage.getItem('token')
          },
          body: JSON.stringify({
            listname : this.listname
          })
        });
        this.$router.go()
        // Hide the modal manually
        this.$nextTick(() => {
          this.$bvModal.hide('modal-prevent-closing')
        })
      },
      getActiveCards: function(l){
        let f=[]
        for(let i in l){
          if(l[i].isactive==true){
            f.push(l[i])
          }
        }
        return f
      }
    },
    components: {
    }
  }
</script>

<style scoped>
body{
  background-color: #CCCCCC;
}

</style>
<template>
  <div class="home" style="padding:30px;background-color:black">
    <div>
      <b-navbar fixed="top" toggleable="lg" type="dark" variant="primary" style="border-radius:12px;">
        <b-navbar-brand href="#">KanbanApp</b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav class="ml-auto">          
              <b-nav-item v-b-modal.modal-prevent-closing>Add New List</b-nav-item>
          
          
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
                    invalid-feedback="Name is required"
                    :state="nameState"
                  >
                    <b-form-input
                      id="name-input"
                      v-model="listname"
                      :state="nameState"
                      required
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
        <div class="row row-cols-1 row-cols-md-5 g-4">
          <!-- <MyList v-for="i in users" :key="i"  :todo="i"/> -->
          <NoLists v-if="userData.lists.length == 0"></NoLists>
          <MyList v-else v-for="i, j in (userData.lists, searchlist)" :card="getActiveCards(i.cards)" :key="i.list_id" :title="searchlist[j].listname"
            :id="i.list_id"></MyList>
        </div>
      </b-card-group>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  data: function () {
    return {
      userData: {},
      search: '',
      addlist: "addlist",
      listname: ''
    }
  },
  async mounted() {
    const response = await fetch('http://localhost:5000/api/1')
    this.userData = await response.json()
  },
  computed: {
    searchlist: function () {
      return this.userData.lists.filter(e => e.listname.includes(this.search))
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
    handleSubmit() {
      // Exit when the form isn't valid
      if (!this.checkFormValidity()) {
        return
      }
      // Push the name to submitted names
      fetch(`http://localhost:5000/api/createList/${this.userData.user_id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
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
  name: 'HomeView',
    components: {
    }
}
</script>

<style scoped>

</style>
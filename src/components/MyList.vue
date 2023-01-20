<template>
  
  <div>
    
    <b-card 
      
      img-src="@/assets/gradient (1).png"
      img-alt="Image"
      img-top
      tag="article"
      style="max-width: 20rem;min-width: 2rem;border:2px solid black;"
      class="mb-2"
      ><div>
        <div>
          <!-- <b-button v-b-modal.modal-1>Launch demo modal</b-button> -->
          
        </div>
        <div class="card-img-overlay" style="padding-top:50px;">
          <b-dropdown  id="dropdown-1" :text=title class="m-md-2 text-wrap" variant="primary" >
            <b-dropdown-item v-b-modal='modalId'>Add Card</b-dropdown-item>
            <b-dropdown-item v-b-modal="ListId">Edit List</b-dropdown-item>
            <b-dropdown-item @click="deleteList">Delete List</b-dropdown-item>
          </b-dropdown>
        </div>
      </div>
      
      <b-card-text>
      </b-card-text>

      <hr>
      <MyCard  v-for="c in card" :status="getCardStatus(c)" :key="c.card_id" :id="c.card_id" :card="c"></MyCard>
    </b-card>
    ------------------------
    <b-modal
      :id="modalId"
      ref="modal"
      title="Add Card"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
      >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group
          label="Name"
          label-for="name-input"
          invalid-feedback="Name is required"
          :state="nameState"
          >
          <b-form-input
            id="name-input"
            v-model="name"
            :state="nameState"
            required
            ></b-form-input>
        </b-form-group>
        
        <b-form-group
          label="Card Content"
          label-for="card-content"
          invalid-feedback="Content is required"
          :state="nameState"
          >
          <b-form-input
            id="card-content"
            v-model="card_content"
            :state="nameState"
            required
            ></b-form-input>
        </b-form-group>
        
        <b-form-group
          label="Card Deadline"
          label-for="card-deadline"
          invalid-feedback="Please select a valid deadline"
          :state="nameState"
          >
          <b-form-datepicker :min="minDate" id="card-deadline" v-model="date" class="mb-2" ></b-form-datepicker>
        </b-form-group>
      </form>
    </b-modal>
    
    
    <!-- Rename List Modal -->
    <b-modal
      :id="ListId"
      ref="modal"
      title="Edit List"
      @show="resetModall"
      @hidden="resetModall"
      @ok="handleOkl"
      >
      <form ref="form" @submit.stop.prevent="handleSubmitl">
        <b-form-group
          label="New List Name"
          label-for="new-list-input"
          :invalid-feedback='invalidFeedbackx'
          :state="nameStatex"
          >
          <b-form-input
            id="name-input"
            v-model="listnameedit"
            :state="nameStatex"
            trim>
          </b-form-input>
        </b-form-group>
        
      </form>
    </b-modal>
    
  </div>
</template>

<script>
  export default {
    name: 'MyList',
    components: {
    },
    props: [
      "todo",
      "title",
      "id",
      "card"],
    computed:{
      modalId(){
        return `modal-${this.id}`
      },
      ListId(){
        return `lmodal-${this.id}`
      },
      nameStatex(){
        function check(listnameeditx,lists){
          for (let i in this.lists){
            if(lists[i].listname.includes(listnameeditx)){
              return true
            }
          }
          return false
        }
        return (this.listnameedit.length > 0 && !check(this.listnameedit,this.lists))
      },
      invalidFeedbackx(){
        function check(listnameeditx,lists){
          for (let i in lists){
            if(lists[i].listname.includes(listnameeditx)){
              return true
            }
          }
          return false
        }
        if (this.listnameedit.length == 0){
          return "Name is required"
        }
        else if (check(this.listnameedit,this.lists)){
          return "Name already exists"
        }
        return "Please enter properly"
      }
    },
    data() {
      return {
        nameState: {
          name: '',
          date:'',
        },
        minDate: new Date(),
        listnameedit:''
      }
    }
    ,
    methods:{
      deleteList: function(){
        if(confirm("Are you sure you want to delete?")){
          fetch(`http://localhost:5000/api/deleteList/${this.id}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            },
          });
          this.$router.go()
        }
      },
      getCardStatus: function(card){
        const today = new Date()
        const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
        return (new Date(date) < new Date(card.deadline_dt.split(" ")[0]) && card.isactive==true)
      },

      // Card Add Handle
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
        if (new Date(this.date) < new Date()){
          alert("Please provide a valid deadline")
          return
        }
        
        // Exit when the form isn't valid
        if (!this.checkFormValidity()) {
          return
        }
        // fetch post to add card
        fetch(`http://localhost:5000/api/createCard/${this.id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            "list_id":this.id,
            "deadline_dt":this.date,
            "card_title":this.name,
            "card_content":this.card_content
          })
        });
        
        // Hide the modal manually
        this.$nextTick(() => {
          this.$bvModal.hide()
        })
        this.$router.go()
      },
      
      // Card add handle End

      // List Edit Handle


      checkFormValidityl() {
        const valid = this.$refs.form.checkValidity()
        this.nameStatex = valid
        return valid
      },
      resetModall() {
        this.name = ''
        this.nameStatex = null
      },
      handleOkl(bvModalEvent) {
        // Prevent modal from closing
        bvModalEvent.preventDefault()
        // Trigger submit handler
        this.handleSubmitl()
      },
      handleSubmitl() {
               
        // Exit when the form isn't valid
        if (!this.checkFormValidityl()) {
          return
        }
        // fetch post to add card
        fetch(`http://localhost:5000/api/updateList/${this.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            "listname": this.listnameedit
          })
        });
        
        // Hide the modal manually
        this.$nextTick(() => {
          this.$bvModal.hide()
        })
        this.$router.go()
      }
      //List Edit  Handle End


    }
  }
</script>

<style scoped>
  
</style>

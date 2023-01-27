<template>
  <div>
    <b-card
      v-if="status==true"
      style="max-width: 20rem;"
      class="mb-2"
      >
      <b-dropdown  id="dropdown-1" :text=card.card_title class="m-md-2 text-wrap" variant="secondary" >
        <b-dropdown-item v-b-modal="cardId">Edit Card</b-dropdown-item>
        <b-dropdown-item @click="markcom">Mark as Complete</b-dropdown-item>
        <b-dropdown-item @click="deleteCard">Delete Card</b-dropdown-item>
      </b-dropdown>
      <hr class="myhr2">
      <b-card-text>
        {{ card.card_content }}
      </b-card-text>
      <template #footer>
        <b-button-group style="color:red;"><b-icon icon="exclamation-circle-fill" ></b-icon></b-button-group><b style="color:red;">&nbsp;{{ card.deadline_dt.split(" ")[0] }}</b>
      </template>
      <!-- <b-button href="#" variant="primary">Go somewhere</b-button> -->
    </b-card>
    
    <b-card
      v-else
        style="max-width: 20rem;"
      class="mb-2"
      >
      <b-dropdown  id="dropdown-1" :text=card.card_title class="m-md-2 text-wrap" variant="secondary" >
        <b-dropdown-item v-b-modal="cardId">Edit Card</b-dropdown-item>
        <b-dropdown-item @click="markicom">Mark as Incomplete</b-dropdown-item>
        <b-dropdown-item @click="deleteCard">Delete Card</b-dropdown-item>
      </b-dropdown>
      <hr class="myhr">
      <b-card-text>
        {{ card.card_content }}
      </b-card-text>
      <template #footer>
        <b-button-group style="color:green;"><b-icon icon="hand-thumbs-up-fill" ></b-icon></b-button-group><b style="color:green;">&nbsp;{{ card.deadline_dt.split(" ")[0] }}</b>
      </template>
    </b-card>


    <!-- Edit Card -->
 <b-modal
 :id="cardId"
 ref="modal"
 title="Edit Card"
 @show="resetModalc"
 @hidden="resetModalc"
 @ok="handleOkc"
 >
 <form ref="form" @submit.stop.prevent="handleSubmitc">
   <b-form-group
     label="Card Name"
     label-for="list-input"
     :invalid-feedback='invalidFeedback'
     :state="nameState"
     >
     <b-form-input
       id="nameinput"
       v-model="this.crd.card_title"
       :state="nameState"
       trim>
    </b-form-input>
    </b-form-group>

       <b-form-group
     label="List Title"
     label-for="list-input"
     >
    <b-form-select id="list-input" v-model="listname" :options="listnamesget"> </b-form-select>
    </b-form-group>

    <b-form-group
    label="Card Content"
    label-for="list-input"
    >
    <b-form-input
      id="nameinput"
      v-model="this.crd.card_content"
      trim>
   </b-form-input>
   </b-form-group>
    
   <b-form-group
    label="Card Deadline"
    label-for="list-input"
    >
    <b-form-datepicker  id="card-deadline" v-model="this.crd.deadline_dt" class="mb-2" ></b-form-datepicker>
   </b-form-group>
   
 </form>
</b-modal>

  </div>
</template>

<script>
// import store from '@/store
  export default {
    name: 'MyCard',
    data(){
      return {
        crd:{
          'card_title':'',
          'card_content':'',
          'deadline_dt':''
        },
      }
    },
    props:['card','id','status','listid','cards','lists'],
    mounted(){
      this.listidx = this.listid
      this.listname = this.lname
      this.crd.card_title = this.card.card_title
      this.crd.card_content = this.card.card_content
      this.crd.deadline_dt = this.card.deadline_dt
    },
    computed:{
      cardId(){
        return `cmodal-${this.card.card_id}`
      },
      listnamesget(){
        let l = []
        for (let i in this.lists){
          l.push(this.lists[i].listname)
        }
        return l
      }
      ,
      nameState(){
        function check(cardnameedit,cards){
          for (let i in cards){
            if(cards[i].card_title == cardnameedit){
              return true
            }
          }
          return false
        }
        return (this.crd.card_title.length > 0 && !check(this.crd.card_title,this.cards))
      },
      invalidFeedback(){
        function check(cardnameedit,cards){
          for (let i in cards){
            if(cards[i].card_title == cardnameedit){
              return true
            }
          }
          return false
        }
        if (this.crd.card_title.length == 0){
          return "Name is required"
        }
        else if (check(this.crd.card_title,this.cards)){
          return "Name already exists"
        }
        return "Please enter properly"
      }
    },
    methods:{
      deleteCard:async function(){
        if(confirm("Are you sure you want to delete?")){
          await fetch(`http://localhost:5000/api/deleteCard/${this.id}`, {
            method: 'DELETE',
            headers: {
              "Content-Type": "application/json",
              "Authentication-token":localStorage.getItem("token")
            },
          });
          this.$router.go()
        }
      },
      markcom: async function(){
        const obj = {
            "iscomplete":"1"
        }
        await fetch(`http://localhost:5000/api/markCom/${this.id}`, {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
            "Authentication-token":localStorage.getItem("token")
          },
          body:JSON.stringify(obj)
        });
        this.$router.go()
      },
      markicom: async function(){
        const obj = {
            "iscomplete":"0"
        }
        await fetch(`http://localhost:5000/api/markCom/${this.id}`, {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
            "Authentication-token":localStorage.getItem("token")
          },
          body:JSON.stringify(obj)
        });
        this.$router.go()
      },
      checkFormValidityc() {
        const valid = this.$refs.form.checkValidity()
        this.nameStatex = valid
        return valid
      },
      resetModalc() {
        this.name = ''
        this.nameStatex = null
      },
      handleOkc(bvModalEvent) {
        // Prevent modal from closing
        bvModalEvent.preventDefault()
        // Trigger submit handler
        this.handleSubmitc()
      },
      async handleSubmitc() {
               
        // Exit when the form isn't valid
        if (!this.checkFormValidityc()) {
          return
        }
        // fetch post to add card
        await fetch(`http://localhost:5000/api/updateCard/${this.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authentication-token':localStorage.getItem('token')
          },
          body: JSON.stringify({
            "card_title": this.crd.card_title,
            "card_content": this.crd.card_content,
            "deadline_dt": this.crd.deadline_dt.split(" ")[0]

          })
        });
        
        // Hide the modal manually
        this.$nextTick(() => {
          this.$bvModal.hide()
        })
        this.$router.go()
      }
    }
  }
</script>

<style scoped>
  
</style>

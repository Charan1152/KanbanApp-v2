 <template>
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
     label-for="list-input"
     :invalid-feedback='invalidFeedback'
     :state="nameState"
     >
     <b-form-input
       id="nameinput"
       v-model="listnameedit"
       :state="nameState"
       trim>
     </b-form-input>
   </b-form-group>
   
 </form>
</b-modal>
</template>

<script>
export default{
    name:"EditList",
    data() {
      return {
        minDate: new Date(),
        listnameedit:''
      }
    },
    props:["lst","lists"],
    computed:{
    ListId(){
        return `lmodal-${this.lst.list_id}`
      },
      nameState(){
        function check(listnameedit,lists){
          for (let i in lists){
            if(lists[i].listname == listnameedit){
              return true
            }
          }
          return false
        }
        return (this.listnameedit.length > 0 && !check(this.listnameedit,this.lists))
      },
      invalidFeedback(){
        function check(listnameedit,lists){
          for (let i in lists){
            if(lists[i].listname == listnameedit){
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
    methods:{
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
      async handleSubmitl() {
               
        // Exit when the form isn't valid
        if (!this.checkFormValidityl()) {
          return
        }
        // fetch post to add card
        await fetch(`http://localhost:5000/api/updateList/${this.lst.list_id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authentication-token':localStorage.getItem('token')
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
}
}

</script>
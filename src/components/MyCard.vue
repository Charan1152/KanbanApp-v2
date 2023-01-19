<template>
  <div>
    <b-card
      v-if="status==true"
      style="max-width: 20rem;"
      class="mb-2"
      >
      <b-dropdown  id="dropdown-1" :text=card.card_title class="m-md-2 text-wrap" variant="secondary" >
        <b-dropdown-item>Edit Card</b-dropdown-item>
        <b-dropdown-item>Mark as incomplete</b-dropdown-item>
        <b-dropdown-item @click="deleteCard">Delete Card</b-dropdown-item>
      </b-dropdown>
      <hr class="myhr2">
      <b-card-text>
        {{ card.card_content }}
      </b-card-text>
      <template #footer>
        <b-button-group style="color:green;"><b-icon icon="clock-fill" ></b-icon></b-button-group><b style="color:green;">&nbsp;{{ card.deadline_dt.split(" ")[0] }}</b>
      </template>
      <!-- <b-button href="#" variant="primary">Go somewhere</b-button> -->
    </b-card>
    
    <b-card
      v-else
        style="max-width: 20rem;"
      class="mb-2"
      >
      <b-dropdown  id="dropdown-1" :text=card.card_title class="m-md-2 text-wrap" variant="secondary" >
        <b-dropdown-item>Edit Card</b-dropdown-item>
        <b-dropdown-item @click="markcom">Mark as complete</b-dropdown-item>
        <b-dropdown-item @click="deleteCard">Delete Card</b-dropdown-item>
      </b-dropdown>
      <hr class="myhr">
      <b-card-text>
        {{ card.card_content }}
      </b-card-text>
      <template #footer>
        <b-button-group style="color:red;"><b-icon icon="exclamation-circle-fill" ></b-icon></b-button-group><b style="color:red;">&nbsp;{{ card.deadline_dt.split(" ")[0] }}</b>
      </template>
      <!-- <b-button href="#" variant="primary">Go somewhere</b-button> -->
    </b-card>


    <!-- Edit Card -->

  </div>
</template>

<script>
  export default {
    name: 'MyCard',
    props:['card','id','status'],
    methods:{
      deleteCard: function(){
        if(confirm("Are you sure you want to delete?")){
          fetch(`http://localhost:5000/api/deleteCard/${this.id}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            },
          });
          this.$router.go()
        }
      },
      markcom: function(){
        fetch(`http://localhost:5000/api/updateCard/${this.id}`, {
          method: 'UPDATE',
          headers: {
            'Content-Type': 'application/json'
          },
          body:{"card_title":"Sample Changex",
            "card_content":"Sample Change Content",
            "deadline_dt":"2023-01-26",
            "list_id":this.id
          }
        });
      }
    }
  }
</script>

<style scoped>
  
</style>

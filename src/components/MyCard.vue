<template>
    <div>
<b-card
    v-if="status==true"
    style="max-width: 20rem;border: solid 5px greenyellow;"
    class="mb-2"
  >
  <b-dropdown  id="dropdown-1" :text=card.card_title class="m-md-2 text-wrap" variant="secondary" >
    <b-dropdown-item>Edit Card</b-dropdown-item>
    <b-dropdown-item>Mark as complete</b-dropdown-item>
    <b-dropdown-item @click="deleteCard">Delete Card</b-dropdown-item>
  </b-dropdown>
  <hr class="myhr2">
    <b-card-text>
      {{ card.card_content }}
    </b-card-text>
    <template #footer>
      <b-button-group><b-icon icon="clock-fill" ></b-icon></b-button-group><b>&nbsp;<em>{{ card.deadline_dt.split(" ")[0] }}</em></b>
      </template>
    <!-- <b-button href="#" variant="primary">Go somewhere</b-button> -->
  </b-card>

  <b-card
    v-else
    style="max-width: 20rem;border: solid 5px red;"
    class="mb-2"
  >
  <b-dropdown  id="dropdown-1" :text=card.card_title class="m-md-2 text-wrap" variant="secondary" >
    <b-dropdown-item>Edit Card</b-dropdown-item>
    <b-dropdown-item>Mark as incomplete</b-dropdown-item>
    <b-dropdown-item @click="deleteCard">Delete Card</b-dropdown-item>
  </b-dropdown>
  <hr class="myhr">
    <b-card-text>
      {{ card.card_content }}
    </b-card-text>
    <template #footer>
      <b-button-group><b-icon icon="exclamation-circle-fill" ></b-icon></b-button-group><b>&nbsp;<em>{{ card.deadline_dt.split(" ")[0] }}</em></b>
      </template>
    <!-- <b-button href="#" variant="primary">Go somewhere</b-button> -->
  </b-card>
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
    }
  }
}
</script>

<style scoped>

</style>

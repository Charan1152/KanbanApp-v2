<template>

<div>
  
    <b-card
      img-src="@/assets/card_pic.png"
      img-alt="Image"
      img-top
      tag="article"
      style="max-width: 20rem;min-width: 2rem;"
      class="mb-2"
    ><div>
      <div>
        <!-- <b-button v-b-modal.modal-1>Launch demo modal</b-button> -->
      
      </div>
      <b-dropdown id="dropdown-1" :text=title class="m-md-2" variant="primary">
        <b-dropdown-item v-b-modal="modalId">Add Card</b-dropdown-item>
        <b-dropdown-item>Second Action</b-dropdown-item>
        <b-dropdown-item>Third Action</b-dropdown-item>
        <b-dropdown-divider></b-dropdown-divider>
        <b-dropdown-item active>Active action</b-dropdown-item>
        <b-dropdown-item disabled>Disabled action</b-dropdown-item>
      </b-dropdown>
    </div>
    
      <b-card-text>

      </b-card-text>
  
      <!-- <b-button href="#" variant="primary">{{title}}</b-button> -->
      <hr>
    </b-card>
    <div>
      <!-- <b-button v-b-modal.modal-1>Launch demo modal</b-button> -->
    
      <b-modal :id="modalId" title="BootstrapVue">
        <p class="my-4">Hello from modal!</p>
      </b-modal>
    </div>
  </div>
  <!-- <b-card v-for="(todo, index) in todos" :key="index" class="mb-4 mr-4" style="min-width: 200px"></b-card> -->
</template>

<script>
export default {
  name: 'MyList',
  components: {
  },
  props: {
    todo: Number,
    title: String,
    id: String
  },
  computed:{
    modalId(){
      return `modal-${this.id}`
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
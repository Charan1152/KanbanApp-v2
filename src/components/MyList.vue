<template>
<div>
    <b-card
      title="List title"
      img-src="https://picsum.photos/600/300/?image=25"
      img-alt="Image"
      img-top
      tag="article"
      style="max-width: 20rem;"
      class="mb-2"
    >
      <b-card-text>
        {{todo}}. Some quick example text to build on the card title and make up the bulk of the card's content.
      </b-card-text>
  
      <b-button href="#" variant="primary">Go somewhere</b-button>
    </b-card>
  </div>
  <!-- <b-card v-for="(todo, index) in todos" :key="index" class="mb-4 mr-4" style="min-width: 200px"></b-card> -->
</template>

<script>
export default {
  name: 'MyList',
  components: {
  },
  props: {
    todo: Number
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
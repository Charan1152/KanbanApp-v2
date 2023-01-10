<template>
    <div>
<b-card
    v-if="status==true"
    :title="card.card_title"
    style="max-width: 20rem;border: solid 5px greenyellow;"
    class="mb-2"
  >
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
    :title="card.card_title"
    style="max-width: 20rem;border: solid 5px red;"
    class="mb-2"
  >
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
  props:['card','id','status']
}
</script>

<style scoped>

</style>

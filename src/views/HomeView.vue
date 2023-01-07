<template>
  <div class="home" style="padding:12px;">
    <HelloWorld/>
    <div>
      <b-card-group deck>
      <MyList v-for="i in [1,2,3,4,5]" :key="i" class="mb-4 mr-4"  :todo="i"/>
      </b-card-group>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  }
}
</script>

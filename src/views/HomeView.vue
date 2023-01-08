<template>
  <div class="home" style="padding:30px;">
    <div>
      <b-navbar toggleable="lg" type="dark" variant="primary" style="border-radius:12px;">
        <b-navbar-brand href="#">KanbanApp</b-navbar-brand>
    
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    
        <b-collapse id="nav-collapse" is-nav>
          <!-- <b-navbar-nav>
            <b-nav-item href="#">Link</b-nav-item>
            <b-nav-item href="#" disabled>Disabled</b-nav-item>
          </b-navbar-nav> -->
    
          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <b-nav-form>
              <b-form-input v-model="search" @keyup="getMatch()" @change="getMatch()"  size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
              <!-- <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button> -->
            </b-nav-form>
    
            <!-- <b-nav-item-dropdown text="Lang" right>
              <b-dropdown-item href="#">EN</b-dropdown-item>
              <b-dropdown-item href="#">ES</b-dropdown-item>
              <b-dropdown-item href="#">RU</b-dropdown-item>
              <b-dropdown-item href="#">FA</b-dropdown-item>
            </b-nav-item-dropdown> -->
    
            <b-nav-item-dropdown right>
              <!-- Using 'button-content' slot -->
              <template #button-content>
                <em>User</em>
              </template>
              <b-dropdown-item href="#">Profile</b-dropdown-item>
              <b-dropdown-item href="#">Sign Out</b-dropdown-item>
            </b-nav-item-dropdown>
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
          <NoLists v-if="users.lists.length == 0"></NoLists>
          <MyList v-else v-for="i in users.lists" :key="i" :title="i" :id="i.list_id" ></MyList>  
          </div>
      </b-card-group>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  data: function(){
    return {
      users: {},
      search:''
    }
  },
  async mounted() {
      const response = await fetch('http://localhost:5000/api/lists/1')
      this.users = await response.json()
  },
  methods:{
    getMatch: async function(){
      if (this.search=='') {
        const response = await fetch('http://localhost:5000/api/lists/1')
        this.users = await response.json()
      }
      this.users.lists = this.users.lists.filter(e => e.includes(this.search))
      }
  },
  name: 'HomeView',
  components: {
  }
}
</script>

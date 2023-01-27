<template>
    <div style="padding-top:150px;">
      <h2><u>KanbanApp V2 - SignUp Page</u></h2><br/>
      <h3 class="h3">Username: &emsp;</h3>
      <input class="input" type="text" name="username" v-model="userdata.username" required><br/><br/>
      <h3 class="h3">Email: &emsp;&emsp;&emsp;</h3>
      <input class="input" type="email" name="username" v-model="userdata.email" required><br/><br/>
      <h3 class="h3">Password: &emsp;</h3>
      <input class="input" type="password" name="password" v-model="userdata.password" required><br>
      <br/><input class="btn-grad" id="submitbtn" type="submit" @click="submitForm()" value="Sign Up">&emsp;
      <input class="btn-grad" id="login" type="button" value="Log In Page" @click="routeToLogin()">
    </div>
  </template>
  
  <script>
//   import { mapMutations, mapActions } from 'vuex'
//   import router from 'vue-router'
  export default {
    data() {
      return {
        userdata: {
          username: '',
          email: '',
          password: ''
        }
      }
    },
    methods: {
        async submitForm() {
            const obj = {
                "username" : this.userdata.username,
                "password": this.userdata.password,
                "email":this.userdata.email
            }
            let x = await fetch(`http://localhost:5000/api/signUp`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        });
        x.then((d) => {
          if(status.ok == true){
            alert("Success",d)
          }
        })
    },
    routeToLogin(){
        this.$router.push({name:'login'})
    }
  }
}
  </script>
  
  <style scoped>
  .btn-grad{
      padding: 10px;
      background-color: blue;
      text-align: center;
      border-radius: 12px;
      font-weight: bold;
      color:white;
  }
  .input{
      padding: 8px;
      border-radius: 12px;
      font-weight: bold;
  }
  h3{
      text-align: center;
      display: inline;
      font-weight: bolder;
      font-family: cursive;
  }
  h2{
      text-align: center;
      font-weight: bolder;
      font-family: cursive;
  }
  </style>
  
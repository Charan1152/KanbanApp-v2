<template>
    <div style="padding-top:150px;">
            <h2><u>KanbanApp V2 - Where excellence meets workflow</u></h2><br/>
            <h3 class="h3">Email: &emsp;&emsp;&emsp;</h3><input class="input" type="text" name="username" v-model="userlogdata.email"><br/><br/>
            <h3 class="h3">Password: &emsp;</h3><input class="input" type="password" name="password" v-model="userlogdata.password"><br>
            <br/><input class="btn-grad" id="submitbtn" type="submit" @click="call()" value="Log In">&emsp;
            <input class="btn-grad" id="signup" type="button" value="Sign Up" @click="routeToSignUp">
      </div>

</template>

<script>

import Vuex from 'vuex'
export default{
    data() {
        return{
            userlogdata:{
                email:"",
                password:""
            }
        }
    },
    methods:{
        ...Vuex.mapMutations(['login', 'logout']),
        ...Vuex.mapActions(['loginUser']),
        call: function(){
            this.loginUser(this.userlogdata)
        },
        routeToSignUp(){
            this.$router.push('/signUp')
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


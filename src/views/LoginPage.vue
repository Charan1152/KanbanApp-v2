<template>
    <div style="padding-top:150px;">
            <h2>Username</h2><input class="input" type="text" name="username" v-model="userlogdata.email">
            <h2>Password</h2><input class="input" type="password" name="password" v-model="userlogdata.password"><br>
            <br/><input class="btn-grad" id="submitbtn" type="submit" @click="call()" value="Log In"><br/><br/>
            <input class="btn-grad" id="signup" type="button" value="Sign Up">
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
        }
    }
}
</script>


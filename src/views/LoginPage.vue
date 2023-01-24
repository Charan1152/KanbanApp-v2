<template>
    <div class="card">
        <form method="post" action="/">
            <h2>Username</h2><input class="input" type="text" name="uname" v-model="this.uname" placeholder="Username">
            <h2>Password</h2><input class="input" type="password" name="pword" v-model="this.pword" placeholder="Password">
            <input class="btn-grad" id="submitbtn" type="submit" value="Log In">
        </form>
        Dont have an Account?&emsp;<a href="/signUp" id='one' style="display: inline-block; color: black;">Sign Up Here</a><br>
        Forgot Your Credentials?&emsp;<a href="/forgotCredentials" id='two' style="display: inline-block; color: black;">Click Here</a>
      </div>
</template>

<script>
import Vuex from 'vuex'
export default{
    data() {
        return{
            uname:"",
            pword:""
        }
    },
    methods:{
        ...Vuex.mapMutations(['login', 'logout']),
        ...Vuex.mapActions(['loginUser'])
    }
}
</script>


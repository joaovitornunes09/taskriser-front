
<template>
  <v-container style="height: 46vw; display: flex; justify-content: center;">
    <v-col align-self="center">
      <v-row>
        <h1 class="mx-auto mb-9">Register</h1>
      </v-row>
      <v-row>
        <v-sheet width="300" class="mx-auto">
          <v-form fast-fail @submit.prevent="userRegister">
            <v-text-field
              v-model="formRegister.name"
              label="Name"
              :rules="nameRules"
            ></v-text-field>

            <v-text-field
              v-model="formRegister.email"
              label="Email"
              :rules="emailRules"
            ></v-text-field>
            
            <v-text-field
              v-model="formRegister.login"
              label="Login"
              :rules="loginRules"
            ></v-text-field>

            <v-text-field
              v-model="formRegister.password"
              label="Password"
              :rules="passwordRules"
            ></v-text-field>

            <v-btn type="submit" block color="#F5821F" rounded class="mt-2">Sign up</v-btn>
          </v-form>
          <v-col>
            <v-row class="pt-5" justify="center"><p>Already have account? <router-link to="/">Sign in</router-link></p></v-row>
        </v-col>
        </v-sheet>
      </v-row>
      </v-col>
  </v-container>
</template>
<script>

import api from "@/configs/api"
import Cookies from 'js-cookie'

export default {
  name: 'RegisterView',
  data: () => ({
      loginRules: [
        value => {
          if (value?.length >= 3) return true

          return 'Login must be at least 3 characters.'
        },
      ],
      nameRules: [
        value => {
          if (value?.length > 0) return true

          return 'Name field is required.'
        },
      ],

      emailRules: [
          v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
      ],
      
      
      passwordRules: [
        value => {
          if (value?.length >= 6) return true

          return 'Password must be at least 6 characters.'
        },
      ],
      formRegister: {
        name: '',
        login: '',
        email: '',
        password: '',
      }
    }),

    methods: {
      userRegister(){

        const headers = { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        };


        api.post("/register", this.formRegister, headers)
        .then(response => {

          this.$swal({
            icon: 'success',
            title: "Registration done successfully",
            text: `Welcome ${response.data.data.name}!`,
            timer: 2000,
          }).then(() => {
            const data = {
              login:this.formRegister.login,
              password: this.formRegister.password
            };

            api.post("/login", data, headers).then(response => {
              Cookies.set("access_token", response.data.data.access_token);
              Cookies.set("email", response.data.data.user.email);
              Cookies.set("login", response.data.data.user.login);
              Cookies.set("name", response.data.data.user.name);
              this.$router.push({ name: '/home' });
            })
          })
          
        }).catch(error => {
          console.log(error);
          this.$swal({
            icon: 'error',
            title:  error.response.data.message
          })
        })
      }
    }
  }
</script>

<style scoped>
a{
    text-decoration: none; 
    color: #F5821F;
  }
  a:hover{
    color: #7c4414;
  }
</style>

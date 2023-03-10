<template>

  <v-container style="height: 46vw; display: flex; justify-content: center;">
    <v-col>
      <v-row>
        <h1 class="mx-auto mb-9">Login</h1>
      </v-row>
      <v-row>
        <v-sheet width="300" class="mx-auto">
          <v-form v-model="formLogin" fast-fail @submit.prevent="userLogin">
            <v-text-field
              v-model="login"
              label="Login"
              :rules="loginRules"
            ></v-text-field>

            <v-text-field
              v-model="password"
              label="Password"
              :rules="passwordRules"
            ></v-text-field>

            <v-btn type="submit" block color="#F5821F" rounded class="mt-2">Submit</v-btn>
          </v-form>
        </v-sheet>
      </v-row>
      </v-col>
  </v-container>
</template>

<script>
import api from "@/configs/api"
import Cookies from 'js-cookie'
export default {
  name: 'LoginView',
  data: () => ({
      login: '',
      loginRules: [
        value => {
          if (value?.length >= 3) return true

          return 'Login must be at least 3 characters.'
        },
      ],
      password: '',
      passwordRules: [
        value => {
          if (value?.length >= 6) return true

          return 'Password must be at least 6 characters.'
        },
      ],
      formLogin: ""
    }),

    methods: {
      userLogin(){

        const headers = { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        };

        const data = {
          login: this.login,
          password:this.password
        }

        api.post("/login", data, headers)
        .then(response => {
          this.$swal({
            icon: 'success',
            title: `Bem vindo ${response.data.data.name}`,
            timer: 2000,
          }).then(() => {
            Cookies.set("access_token", response.data.data.access_token);
            Cookies.set("email", response.data.data.email);
            Cookies.set("login", response.data.data.login);
            Cookies.set("name", response.data.data.name);
          })
          
        }).catch(response => {
          console.log(response);
        })
      }
    }
  }

</script>

<style>

</style>

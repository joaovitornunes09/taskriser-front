<template>
  <v-container style="height: 46vw; display: flex; justify-content: center;">
    <v-col align-self="center">
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
              type="password"
            ></v-text-field>

            <v-btn type="submit" block color="#F5821F" rounded class="mt-2"
              >Sign in</v-btn
            >
          </v-form>
          <v-col>
            <v-row class="pt-5" justify="center"
              ><p>
                New here?
                <router-link to="register">Create an account.</router-link>
              </p></v-row
            >
          </v-col>
        </v-sheet>
      </v-row>
    </v-col>
  </v-container>
</template>

<script>
import api from "@/configs/api";
import Cookies from "js-cookie";
export default {
  name: "LoginView",
  data: () => ({
    login: "",
    loginRules: [
      (value) => {
        if (value?.length >= 3) return true;

        return "Login must be at least 3 characters.";
      },
    ],
    password: "",
    passwordRules: [
      (value) => {
        if (value?.length >= 5) return true;

        return "Password must be at least 5 characters.";
      },
    ],
    formLogin: "",
  }),

  methods: {
    userLogin() {
      const headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
      };

      const data = {
        login: this.login,
        password: this.password,
      };

      api
        .post("/login", data, headers)
        .then((response) => {
          this.$swal({
            icon: "success",
            title: `Welcome!`,
            text: response.data.data.user.name,
            timer: 2000,
          }).then(() => {
            console.log(response);
            Cookies.set("access_token", response.data.data.access_token);
            Cookies.set("email", response.data.data.user.email);
            Cookies.set("login", response.data.data.user.login);
            Cookies.set("name", response.data.data.user.name);
            Cookies.set("user_id", response.data.data.user.user_id);
            Cookies.set("user_type", response.data.data.user.user_type);
            this.$router.push({ name: "home" });
          });
        })
        .catch((error) => {
          this.$swal({
            icon: "error",
            title: "Invalid credentials",
            text: error.response.data.data,
          });
        });
    },
  },
};
</script>

<style scoped>
a {
  text-decoration: none;
  color: #f5821f;
}
a:hover {
  color: #7c4414;
}
</style>

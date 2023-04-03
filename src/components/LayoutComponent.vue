<template>
  <div class="mb-8 layout" style="">
    <v-toolbar :elevation="8" >
      <v-toolbar-side-icon>
        <router-link :to="linkImage">
          <v-img style="margin-left: 16px;"  :src="require('@/assets/taskriser.png')" height="30px" width="120px"> </v-img>
        </router-link>
      </v-toolbar-side-icon>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <nav v-for="link in links" :key="link.name" style="display: flex;">
          <router-link :to="link.path" >
            <v-btn :title="link.name" @click="link.name === 'Logout' ? logout() : ''">
              {{ link.icon ? "" : link.name  }}
              <v-icon v-if="link.icon" size="large">{{ link.icon}}</v-icon>
            </v-btn>
          </router-link>
        </nav>
      </v-toolbar-items>
    </v-toolbar>
  </div>

</template>

<script>
import Cookies from "js-cookie";
import api from "@/configs/api";

export default {
name: 'LayoutComponent',
props: {
  links: Array,
  linkImage: String
},
methods: {
  logout(){
    api.get("/logout", {
      headers: {
        "Authorization": `Bearer ${Cookies.get("access_token")}`
      }
    }).then(response => {
      this.$swal.fire({
                        title: "Successfully logged out",
                        text: `See you soon ${Cookies.get("name")}`,
                        icon: "success",
                        timer: "2000"
                    }).then(() => {
                        Cookies.remove("access_token");
                        Cookies.remove("user_type");
                        Cookies.remove("user_id");
                        Cookies.remove("name");
                        Cookies.remove("login");
                        Cookies.remove("email");
                        this.$router.push({ name: "login" });
                    })
    })
  }
}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
a {  
  color: black;
  display: flex;
}

</style>
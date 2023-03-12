import { createStore } from 'vuex'
import api from "@/configs/api";
import Cookies from "js-cookie";
export default createStore({
  state: {
    links: [
      {
        name: "Login",
        path: "/"
      },
      {
        name: "Register",
        path: "register"
      }
    ],
    linkImage: '/',
    users: []
  },
  getters: {
  },
  mutations: {
    changeLinks(state, response){
      if(response !== 'login' || response !== 'register'){
        state.links = [
          {
            name:  "Home",
            path: "home"
          },
          {
            name:  "My tasks",
            path: "home"
          },
          {
            name:  "Logout",
            path: "/"
          }
        ];
        state.linkImage = "/home";
      }
    },

    setUsers(state, response){
      state.users = response;
    }

  },

  actions: {

    changeLinks({commit}, infoLinks) {
      commit("changeLinks", infoLinks);
    },

    getAllUsers({commit}) {
      console.log(commit);
      const headers = {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${Cookies.get("access_token")}`,
        Accept: "application/json",
      };

      api.get("/user/list", {headers: headers})
        .then(response => {
          commit("setUsers",response.data.data);
        })
    }

  },

  modules: {
  }
})

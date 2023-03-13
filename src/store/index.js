import { createStore } from "vuex";
import api from "@/configs/api";
import Cookies from "js-cookie";

export default createStore({
  state: {
    links: [
      {
        name: "Login",
        path: "/",
      },
      {
        name: "Register",
        path: "register",
      },
    ],
    linkImage: "/",
    users: [],
    tasks: [],
    task: [],
  },
  getters: {},
  mutations: {
    changeLinks(state) {
        state.links = [
          {
            name: "Home",
            path: "home",
          },
          {
            name: "Logout",
            path: "/",
          },
        ];
        state.linkImage = "/home";
    },
    resetLinks(state){
      state.links = [
        {
          name: "Login",
          path: "/",
        },
        {
          name: "Register",
          path: "register",
        },
      ];
      state.linkImage =  "/";
    },

    setUsers(state, response) {
      state.users = response;
    },

    setTasks(state, response) {
      state.tasks = response;
    },
    setTask(state, task){
      state.task = task;
    }
  },

  actions: {

    changeLinks({ commit }) {
      commit("changeLinks");
    },
    resetLinks( {commit} ) {
      commit("resetLinks");
    },

    getAllUsers({ commit }) {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("access_token")}`,
        Accept: "application/json",
      };

      api.get("/user/list", { headers: headers }).then((response) => {
        commit("setUsers", response.data.data);
      });
    },

    async getTasks({ commit }) {
      try {
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("access_token")}`,
          Accept: "application/json",
        };

        const response = await api.get("/task/user", { headers: headers });

        commit("setTasks", response.data.data);
        return response;
      } catch (error) {
        throw error;
      }
    },

    setTask({commit}, task){
      commit("setTask", task);
    }
    
  },

  modules: {},
});

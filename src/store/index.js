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
    currentDate: "",
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
    setCurrentDate(state, date){
      state.currentDate = date;
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
      console.log(task);
      const dataSplit = task.complete_until.split("/");
      const data = new Date(dataSplit[2], dataSplit[1]-1, dataSplit[0]);
      let dataFormatada = data.getFullYear() + '-' + (data.getMonth()+1).toString().padStart(2, '0') + '-' + data.getDate().toString().padStart(2, '0');
      task.complete_until = dataFormatada;

      if(!task.visible_to_all){
        task.visibility = {
          type: "Default",
          value: false,
          hint:
            "This will make this task visible only to you and whoever you assigned it.",
        }
      }
      if(task.visible_to_all){
        task.visibility = {
          type: "All",
          value: true,
          hint: "This will make this task visible to all application users. ",
        }
      }
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
    getCurrentDate({commit}) {
      const now = new Date();
      const day = ("0" + now.getDate()).slice(-2);
      const month =  ("0" + (now.getMonth() + 1)).slice(-2);
      const today = now.getFullYear()+"-"+(month)+"-"+(day);
      commit("setCurrentDate",today) ;
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

    async getTask({commit}, taskId){
      try {
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("access_token")}`,
          Accept: "application/json",
        };

        const response = await api.get(`/task/list/${taskId}`, { headers: headers });
        commit("setTask", response.data.data);
        return response;
      } catch (error) {
        throw error;
      }
    }
    
  },

  modules: {},
});

import { createStore } from 'vuex'
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
    linkImage: '/'
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
    }
  },
  actions: {
    changeLinks({commit}, infoLinks) {
      console.log(commit, infoLinks);
      commit("changeLinks", infoLinks);
    }
  },
  modules: {
  }
})

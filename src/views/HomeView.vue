<template>
  <v-container style="height: 46vw; display: flex;">
    <v-col align-self="center">
      <v-row>
        <h1 class="mx-auto mb-9">{{ type_user === '1' ? 'Admin Panel' : 'Tasks'  }}</h1>
      </v-row>
      <v-row>
        <div id="wrapper"></div>
      </v-row>
      <router-link to="/form-task">
        <v-row class="mt-3">
          <v-btn v-if="type_user === '1'" block color="#F5821F" class="btn-create">New task</v-btn>
        </v-row>
      </router-link>
    </v-col>
  </v-container>
</template>

<script>
// import api from "@/configs/api";
import Cookies from "js-cookie";

import { Grid, html } from "gridjs";
import "gridjs/dist/theme/mermaid.css";

export default {
  name: "HomeView",
  data() { 
    return {
       grid: new Grid() ,
       type_user: Cookies.get("user_type")
      } 
    },
  methods: {
    changeLinks(){
      this.$store.dispatch("changeLinks", this.$route.name);
    },
    teste() {
      console.log("teste");
    }
  },
  beforeMount() {
    this.changeLinks();
  },
  mounted() {
    this.grid.updateConfig({
            columns: [
                {
                name: 'Title'
                },
                {
                name: 'Assigned To'  
                },
                {
                name: 'Status' 
                },
                {
                  name: 'Complete Until'
                },
                {
                name: 'Actions',
                formatter: (cell) => html(`
                  <div class="d-grid gap-2 d-md-block">
                    <button title="Finish" @click="teste" class="btn btn-success ${cell.status === "Finished" || (cell.assigned_to !== Cookies.get("name") && this.type_user === '2')  ? "d-none" : ""}" id="${cell.id}"  type="button">Finish</button>
                    <a href="/edit" title="Edit" class="btn btn-warning ${this.type_user === '2' ? 'd-none' : ''}" id="${cell.id}"type="button">Edit</a>
                    <button title="Details" class="btn btn-primary" id="${cell.id}"type="button">Details</button>
                    <button title="Exclude" class="btn btn-danger ${this.type_user === '2' ? 'd-none' : ''}" id="${cell.id}"  type="button">Exclude</button>
                  </div>
                `)
                }
            ],
            
            autoWidth: true,
            pagination:{
              limit: 4
            },
            search: true,
            sort: true,
            server: {
                url: 'http://localhost:8989/api/task/user',
                headers: {
                  'Authorization': `Bearer ${Cookies.get("access_token")}`
                },
                then: data => data.data.map(task => 
                [
                    task.title,
                    task.assigned_to,
                    task.status,
                    task.complete_until,
                    {
                      id: task.id,
                      status: task.status,
                      assigned_to: task.assigned_to
                    }
                ])
                
            },
            style: {
        table: {
          'text-align': 'center',
          'font-size': '0.8rem'
        },
        td: {
            'justify-contet': 'center',
            'word-wrap': 'break-word'
        },
      },
      className: {
        table:'table-responsive'
      }
    }).render(document.getElementById("wrapper"));
  }
};

</script>

<style>
a {
  text-decoration: none;
  color: #f5821f;
}
a:hover {
  color: #7c4414;
}


</style>

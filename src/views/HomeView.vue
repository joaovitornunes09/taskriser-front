<template>
  <v-container style="height: 46vw; display: flex;">
    <v-col align-self="center">
      <v-row>
        <h1 class="mx-auto mb-9">Admin Panel</h1>
      </v-row>
      <v-row>
        <div id="wrapper"></div>
      </v-row>
      <router-link to="/form-task">
        <v-row class="mt-3">
          <v-btn block color="#F5821F" class="btn-create">New task</v-btn>
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
       grid: new Grid() 
      } 
    },
  methods: {
    changeLinks(){
      this.$store.dispatch("changeLinks", this.$route.name);
    }
  },
  mounted() {
    this.changeLinks();
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
                    <button class="btn btn-success ${cell.status === "Finished" ? "d-none" : ""}" id="${cell}"  type="button">Finish</button>
                    <button class="btn btn-warning" id="${cell.id}"type="button">Edit</button>
                    <button class="btn btn-danger" id="${cell.id}"type="button">Exclude</button>
                    <button class="btn btn-primary" id="${cell.id}"type="button">Details</button>
                  </div>
                `)
                }
            ],
            
            autoWidth: true,
            pagination:{
              limit: 4
            },
            search: true,
            resizable: true,
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
                      status: task.status
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

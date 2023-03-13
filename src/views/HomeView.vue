<template>
  <v-container style="height: 46vw; display: flex;">
    <v-col align-self="center">
      <v-row>
        <h1 class="mx-auto mb-9">
          {{ type_user === "1" ? "Admin Panel" : "Tasks" }}
        </h1>
      </v-row>
      <v-row class="w-25 mb-2">
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-row>
      <v-row>
        <v-data-table
          :headers="headers"
          :items="tasks"
          :sort-by="[{ key: 'title', order: 'asc' }]"
          items-per-page="4"
          :search="search"
          class="elevation-2"
        >
          <template v-slot:top> </template>
          <template v-slot:item.actions="{ item }">
            <v-icon
              v-if="
                (item.raw.assigned_to === userName || type_user === '1') &&
                item.raw.status !== 'Finished'
              "
              size="large"
              color="green"
              class="me-2"
              @click="finishTask(item.raw)"
            >
              mdi-check-circle
            </v-icon>

            <v-icon
              v-if="type_user === '1'"
              size="large"
              color="blue"
              class="me-2"
              @click="editTask(item.raw)"
            >
              mdi-pencil
            </v-icon>

            <v-icon size="large" @click="showDetails(item.raw)">
              mdi-information
            </v-icon>

            <v-icon
              v-if="type_user === '1'"
              size="large"
              color="red"
              @click="showDeleteItemModal(item.raw)"
            >
              mdi-delete
            </v-icon>
          </template>
        </v-data-table>
      </v-row>
      <router-link to="/form-task">
        <v-row class="mt-7">
          <v-btn
            v-if="type_user === '1'"
            block
            color="#F5821F"
            class="btn-create"
            style="color: black !important;"
            >New task</v-btn
          >
        </v-row>
      </router-link>
    </v-col>
  </v-container>
</template>

<script>
import Cookies from "js-cookie";
import api from "@/configs/api";
import { VDataTable } from "vuetify/labs/VDataTable";

export default {
  name: "HomeView",
  components: {
    VDataTable,
  },
  data() {
    return {
      userName: Cookies.get("name"),
      type_user: Cookies.get("user_type"),
      headers: [
        {
          title: "Title",
          align: "start",
          key: "title",
        },
        { title: "Assigned To", key: "assigned_to" },
        { title: "Status", key: "status" },
        { title: "Complete Until", key: "complete_until" },
        { title: "Actions", key: "actions", sortable: false },
      ],
      dialogDelete: false,
      dialog: false,
      search: "",
    };
  },
  computed: {
    tasks() {
      return this.$store.state.tasks;
    },
  },
  methods: {
    changeLinks() {
      try {
        this.$store.dispatch("changeLinks");
      } catch (error) {
        console.log(error);
      }
    },
    async getTasks() {
      try {
        await this.$store.dispatch("getTasks");
      } catch (error) {
        console.log(error);
        if (error.response.status === 401) {
          this.$swal
            .fire({
              title: "Session expired!",
              text: "Please login again",
              icon: "error",
              timer: "2000",
            })
            .then(() => {
              Cookies.remove("access_token");
              Cookies.remove("user_type");
              Cookies.remove("user_id");
              Cookies.remove("name");
              Cookies.remove("login");
              Cookies.remove("email");
              this.$router.push({ name: "login" });
            });
        }
      }
    },
    showDeleteItemModal(item) {
      this.$swal({
        icon: "warning",
        title: `Are you sure you want to delete this task?`,
        html: `
                    <form>
                      <div class="mb-3">
                        <label for="title" class="form-label fw-bold">Title</label>
                        <input type="text" disabled  value="${item.title}" class="form-control">
                      </div>
                      <div class="mb-3">
                        <label for="title" class="form-label fw-bold">Assigned To</label>
                        <input type="text" disabled  value="${item.assigned_to}" class="form-control">
                      </div>
                      <div class="mb-3">
                        <label for="title" class="form-label fw-bold">Status</label>
                        <input type="text" disabled  value="${item.status}" class="form-control">
                      </div>
                      <div class="mb-3">
                        <label for="title" class="form-label fw-bold">Description</label>
                        <textarea class="form-control"  disabled style="height: 100px">${item.description}</textarea>
                    </div>
                    </form>`,
        showConfirmButton: true,
        confirmButtonText: "Delete",
        confirmButtonColor: "#F5821F",
        showCancelButton: true,
        cancelButtonText: "Cancel",
        cancelButtonColor: "grey",
      }).then((confirm) => {
        if (confirm.isConfirmed) {
          this.deleteItem(item.id);
        }
      });
    },

    deleteItem(id) {
      api
        .delete(`/task/delete/${id}`, {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${Cookies.get("access_token")}`,
          },
        })
        .then((response) => {
          this.$store.dispatch("getTasks");
          this.$swal({
            icon: "Success",
            title: "Success",
            text: "Successfully deleted task",
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },

    editTask(task) {
      this.$store.dispatch("setTask", task);
      this.$router.push({ name: "edit-task", params: { taskId: task.id } });
    },

    showDetails(task) {
      console.log(task);
      this.$swal({
        title: task.title,
        html: `
                    <form>
                      <div class="container">
                      <div class="col">
                        <div class="row">
                          <div class="mb-3 w-50">
                            <label for="title" class="form-label fw-bold">Created By</label>
                            <input type="text" disabled  value="${task.created_by}" class="form-control">
                          </div>
                          <div class="mb-3 w-50">
                            <label for="title" class="form-label fw-bold">Assigned To</label>
                            <input type="text" disabled  value="${task.assigned_to}" class="form-control">
                          </div>
                        </div>
                        <div class="row">
                          <div class="mb-3 w-50">
                            <label for="title" class="form-label fw-bold">Status</label>
                            <input type="text" disabled  value="${task.status}" class="form-control">
                          </div>
                          <div class="mb-3 w-50">
                            <label for="title" class="form-label fw-bold">Complete until</label>
                            <input type="text" disabled  value="${task.complete_until}" class="form-control">
                          </div>
                        </div>
                        <div class="mb-3">
                          <label for="title" class="form-label fw-bold">Description</label>
                          <textarea class="form-control"  disabled style="height: 100px">${task.description}</textarea>
                        </div>
                      </div>
                      </div>
                    </form>`,
        showConfirmButton: true,
        confirmButtonText: "Ok",
        confirmButtonColor: "#F5821F",
      });
    },
  },
  beforeMount() {
    this.changeLinks();
  },
  mounted() {
    this.getTasks();
  },
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

.swal2-modal {
  max-height: 85vh;
  overflow-y: auto;
}

</style>

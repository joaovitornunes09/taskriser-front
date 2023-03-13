<template>
  <v-container style="height: 46vw; display: flex;">
    <v-col align-self="center">
      <v-row>
        <h1 class="mx-auto mb-9">Task Data</h1>
      </v-row>
      <v-row>
        <v-sheet width="800" class="mx-auto">
          <v-form ref="formTask" fast-fail @submit.prevent @submit="createNewTask()">
            <v-row>
              <v-text-field
                label="Title"
                v-model="formNewTask.title"
                :rules="rules.required"
              ></v-text-field>
            </v-row>
            <v-row class="gap-4 mb-2">
              <v-select
                v-model="formNewTask.user"
                :items="users"
                item-title="name"
                item-value="name"
                label="Assign To"
                class="w-25"
              ></v-select>
              <v-select
                v-model="formNewTask.visibility"
                :items="items"
                item-title="type"
                item-value="value"
                :hint="`${formNewTask.visibility.hint}`"
                label="Visibility"
                persistent-hint
                return-object
              ></v-select>
            </v-row>
            <v-row class="mb-2">
              <v-text-field
                type="date"
                label="Complete until"
                v-model="complete_until"
                hint="Set a deadline for this task."
                persistent-hint
              ></v-text-field>
            </v-row>
            <v-row>
              <v-textarea
                v-model="formNewTask.description"
                label="Description"
                auto-grow
                rows="3"
                row-height="25"
                width="800"
                :rules="rules.required"
              ></v-textarea>
            </v-row>

            <v-btn type="submit" block  color="#F5821F" rounded class="mt-2"
              >Create</v-btn
            >
          </v-form>
          <router-link style="color: black !important;" to="/home">
            <v-btn block rounded class="mt-2 btn-back">Back</v-btn>
          </router-link>
        </v-sheet>
      </v-row>
    </v-col>
  </v-container>
</template>

<script>
import store from "@/store";
import api from "@/configs/api";
import Cookies from "js-cookie";

export default {
  name: "NewTaskView",
  data() {
    return {
      
      items: [
        {
          type: "Default",
          value: false,
          hint:
            "This will make this task visible only to you and whoever you assigned it.",
        },
        {
          type: "All",
          value: true,
          hint: "This will make this task visible to all application users. ",
        },
      ],
      
      rules: {
        required: [
          (value) => {
            if (value?.length > 0) return true;

            return "This field is required.";
          },
        ],
      },
      validateForm: false,
      formNewTask: {
        title: "",
        visibility: {
          type: "Default",
          value: false,
          hint:
          "This will make this task visible only to you and whoever you assigned it.",
        },
        description: "",
        user: "",
        status: 1,
      }
    };
  },
  computed: {
    users(){
      return store.state.users;
    },
    complete_until() {
      return store.state.currentDate;
    }
  },
  methods: {
    changeLinks() {
      this.$store.dispatch("changeLinks", this.$route.name);
    },

    getUsers() {
      this.$store.dispatch("getAllUsers");
    },
    getCurrentDate(){
      this.$store.dispatch("getCurrentDate")
    },

    verifyForm() {
      this.$refs.formTask.validate().then(response => {
        this.validateForm = response.valid;
      })
    },

    createNewTask() {
      const taskData = {
        title: this.formNewTask.title,
        description: this.formNewTask.description,
        visible_to_all: this.formNewTask.visibility.value,
        status: this.formNewTask.status,
        complete_until: this.complete_until,
        assigned_to: this.formNewTask.user,
      };

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("access_token")}`,
        Accept: "application/json",
      };

      this.verifyForm();

      if (this.validateForm) {
        api
          .post("/task/register", taskData, {
            headers: headers,
          })
          .then((response) => {
            if (response.data.data.status) {
              this.$swal({
                icon: "success",
                title: "Task created successfully.",
                text: `Welcome ${response.data.data.name}!`,
                timer: 2000,
              }).then(() => {
                this.$refs.formTask.resetValidation();
              });
            }
          })
          .catch((error) => {
            this.$swal({
            icon: "error",
            title: error.response.data.message,
            text: "Please enter another title or delete the task with the title you want before creating a new one.",
          });
          });
      }
    },
  },
  beforeMount() {
    this.getCurrentDate();
    this.changeLinks();
    this.getUsers();
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
</style>

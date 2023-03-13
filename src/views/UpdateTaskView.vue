<template>
  <v-container style="height: 46vw; display: flex;">
    <v-col align-self="center">
      <v-row>
        <h1 class="mx-auto mb-9">Task Data</h1>
      </v-row>
      <v-row>
        <v-sheet width="800" class="mx-auto">
          <v-form
            ref="formTask"
            fast-fail
            @submit.prevent
            @submit="updateTask()"
          >
            <v-row>
              <v-text-field
                label="Title"
                v-model="task.title"
                :rules="rules.required"
              ></v-text-field>
            </v-row>
            <v-row class="gap-4 mb-2">
              <v-select
                v-model="task.assigned_to"
                :items="users"
                item-title="name"
                item-value="user_id"
                label="Assign To"
                return-object
                class="w-25"
              ></v-select>
              <v-select
                v-model="task.visibility"
                :items="items"
                item-title="type"
                item-value="value"
                :hint="`${visibility.hint}`"
                label="Visibility"
                persistent-hint
                return-object
              ></v-select>
            </v-row>
            <v-row class="mb-2">
              <v-text-field
                type="date"
                label="Complete until"
                v-model="task.complete_until"
                hint="Set a deadline for this task."
                persistent-hint
              ></v-text-field>
            </v-row>
            <v-row>
              <v-textarea
                v-model="task.description"
                label="Description"
                auto-grow
                rows="3"
                row-height="25"
                width="800"
                :rules="rules.required"
              ></v-textarea>
            </v-row>

            <v-btn type="submit" block color="#F5821F" rounded class="mt-2"
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
  name: "UpdateTaskView",
  props: ['taskId'],
  data() {
    return {
      title: "",
      visibility: {
        type: "Default",
        value: false,
        hint:
          "This will make this task visible only to you and whoever you assigned it.",
      },
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

      complete_until: new Date(),
      description: "",
      rules: {
        required: [
          (value) => {
            if (value?.length > 0) return true;

            return "This field is required.";
          },
        ],
      },
      validateForm: false,
    };
  },
  computed: {
    users() {
      return store.state.users;
    },
    task() {
      return store.state.task;
    }
  },
  methods: {
    changeLinks() {
      this.$store.dispatch("changeLinks", this.$route.name);
    },

    getUsers() {
      this.$store.dispatch("getAllUsers");
    },

    verifyForm() {
      this.$refs.formTask.validate().then((response) => {
        this.validateForm = response.valid;
      });
    },
    updateTask(data) {
      this.verifyForm();

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("access_token")}`,
        Accept: "application/json",
      };
      if (this.validateForm) {
        api
          .put(`/task/update/${data.id}`, data, { headers: headers })
          .then((response) => {
            if (response.data.data.status) {
              this.$swal({
                icon: "success",
                title: "Task created successfully.",
                timer: 2000,
              }).then(() => {
                this.$refs.form.resetValidation();
              });
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  },
  beforeMount() {
    this.changeLinks();
    this.getUsers();
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

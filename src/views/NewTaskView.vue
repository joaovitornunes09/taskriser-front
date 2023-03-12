<template>
  <v-container style="height: 46vw; display: flex;">
    <v-col align-self="center">
      <v-row>
        <h1 class="mx-auto mb-9">Task Data</h1>
      </v-row>
      <v-row>
        <v-sheet width="800" class="mx-auto">
          <v-form fast-fail @submit.prevent>
            <v-row class="gap-5">
              <v-text-field
                label="Title"
                ></v-text-field>
            <v-text-field
              label="Visibility"
            ></v-text-field>
            </v-row>
            <v-text-field
              label="Description"
              type="text-area"
            ></v-text-field>
            <v-select
              v-model="select"
              :items="items"
              item-title="state"
              item-value="abbr"
              label="Select"
              ></v-select>
            <v-btn type="submit" block color="#F5821F" rounded class="mt-2">Sign up</v-btn>
          </v-form>
        </v-sheet>
      </v-row>
    </v-col>
  </v-container>
</template>

<script>

export default {
  name: "NewTaskView",
  data(){
    return {
      select: { state: 'Florida', abbr: 'FL' },
        items: [
          { state: 'Florida', abbr: 'FL' },
          { state: 'Georgia', abbr: 'GA' },
          { state: 'Nebraska', abbr: 'NE' },
          { state: 'California', abbr: 'CA' },
          { state: 'New York', abbr: 'NY' },
        ],
    }
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

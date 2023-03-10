<template>
    <div>
      <v-toolbar :elevation="8">
        <v-toolbar-side-icon>
          <router-link to="login">
            <v-img style="margin-left: 16px;"  :src="require('@/assets/logo_fabricainfo.png')" height="30px" width="120"> </v-img>
          </router-link>
        </v-toolbar-side-icon>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <nav v-for="link in links" :key="link" style="display: flex;">
            <router-link :to=link.path>
              <v-btn>{{ link.name }}</v-btn>
            </router-link>
          </nav>
        </v-toolbar-items>
      </v-toolbar>
    </div>

</template>

<script>
export default {
  name: 'LayoutComponent',
  props: {
    links: Array
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

<template>
  <div>
   <LayoutComponent :links= "links" :linkImage="linkImage"></LayoutComponent>
       <router-view/>
       <footer>
        <v-container>
          <v-col align-self="end">
            <v-row class="mt-2">
           <p>Created by João Vitor Raulino Nunes. © 2023</p>
            </v-row>
          </v-col>
        </v-container>
       </footer>
  </div>

</template>
<script>
import LayoutComponent from '@/components/LayoutComponent.vue'

export default {
 name: 'app',

 components: {
   LayoutComponent
 },  

 computed: {
   links(){
     return this.$store.state.links
   },
   linkImage(){
     return this.$store.state.linkImage
   }
 }

}
</script>
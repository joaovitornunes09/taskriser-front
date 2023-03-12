<template>
  <div>
   <LayoutComponent :links= "links" :linkImage="linkImage"></LayoutComponent>
       <router-view/>
       <footer>
         <div class="pl-5">
           <p>Created by João Vitor Raulino Nunes. © 2023</p>
         </div>
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
     return "/"
   }
 }

}
</script>
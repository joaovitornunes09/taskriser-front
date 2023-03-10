<template>
   <div>
    <LayoutComponent :links= "links"></LayoutComponent>
        <router-view/>
   </div>
</template>
<script>
import LayoutComponent from '@/components/LayoutComponent.vue'
export default {
  name: 'app',

  components: {
    LayoutComponent
  },  

  data() {
    return {
      links: [
      {
        name: "Login",
        path: "login"
      },
      {
        name: "Register",
        path: "register"
      }
    ]
    }
  },
}
</script>
<style>
 a { 
  text-decoration: none; 
  color: black;
  display: flex;
  }
  
</style>

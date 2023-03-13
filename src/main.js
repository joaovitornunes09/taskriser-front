import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'



import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap'
import '@/assets/css/style.css';

import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    set: {
      mdi,
    }
  }
})

createApp(App).use(store).use(router).use(vuetify).use(VueSweetalert2).mount('#app')

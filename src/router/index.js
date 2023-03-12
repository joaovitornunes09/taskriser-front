import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import HomeView from '../views/HomeView.vue'
import NewTaskView from '../views/NewTaskView.vue'
import EditTaskView from '../views/EditView.vue'

const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginView
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView
  },
  {
    path: '/form-task',
    name: 'form-task',
    component: NewTaskView
  },
  {
    path: '/edit',
    name: 'edit-task',
    component: EditTaskView
  }

]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
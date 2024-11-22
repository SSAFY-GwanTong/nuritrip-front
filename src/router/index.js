import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Home/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/signin',
      name: 'SignIn',
      component: () => import('../views/Account/Signin.vue'),
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: () => import('../views/Account/Signup.vue'),
    },
  ],
})

export default router

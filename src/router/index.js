import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Home/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'HomeView',
      component: HomeView,
    },
    {
      path: '/home',
      name: 'HomeAfterLogin',
      component: () => import('../views/Home/HomeAfterLogin.vue'),
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
    {
      path: '/explore',
      name: 'Explore',
      component: () => import('../views/Explore/Explore.vue'),
    },
    {
      path: '/fitness',
      name: 'Fitness',
      component: () => import('../views/Fitness/Fitness.vue'),
    },
    {
      path: '/plan',
      name: 'Plan',
      component: () => import('../views/Plan/Plan.vue'),
    },
    {
      path: '/storage',
      namee: 'Storage',
      component: () => import('../views/Storage/Storage.vue'),
    },
    {
      path: '/detail-plan/:plan_id',
      name: 'DetailPlan',
      component: () => import('../views/UserPlanDetail/UserPlanDetail.vue')
    }
  ],
})

export default router

import { createRouter, createWebHistory } from 'vue-router'
import HomePageView from '@/views/HomePageView.vue'
import LoginPageView from '@/views/LoginPageView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'loginPage',
      component: LoginPageView
    },
    {
      path: '/home',
      name: 'home',
      component: HomePageView
    }
  ]
})

export default router

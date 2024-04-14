import { createRouter, createWebHistory } from 'vue-router'
import LoginPageView from '@/views/LoginPageView.vue'
import HomePageView from '@/views/HomePageView.vue'

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

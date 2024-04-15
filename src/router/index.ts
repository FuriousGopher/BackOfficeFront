import { createRouter, createWebHistory } from 'vue-router'
import LoginPageView from '@/views/LoginPageView.vue'
import HomePageView from '@/views/HomePageView.vue'
import CompanyPageView from '@/views/CompanyPageView.vue'

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
    },
    {
      path: '/company',
      name: 'company',
      component: CompanyPageView
    }
  ]
})

export default router

import { createRouter, createWebHistory } from 'vue-router'
import LoginPageView from '@/views/LoginPageView.vue'
import HomePageView from '@/views/HomePageView.vue'
import CompanyPageView from '@/views/CompanyPageView.vue'
import ClientPageView from '@/views/ClientPageView.vue'
import ClientLoginView from '@/views/ClientLoginView.vue'
import ClientCompanyPageView from '@/views/ClientCompanyPageView.vue'

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
    },
    {
      path: '/client',
      name: 'client',
      component: ClientLoginView
    },
    {
      path: '/client-page',
      name: 'client-page',
      component: ClientPageView
    },
    {
      path: '/client-company-page',
      name: 'client-company-page',
      component: ClientCompanyPageView
    }
  ]
})

export default router

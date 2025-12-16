import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '../components/LandingPage.vue'
import LandingPage2 from '../components/LandingPage2.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: LandingPage
  },
  {
    path: '/v2',
    name: 'Page2',
    component: LandingPage2
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

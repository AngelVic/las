import { createRouter, createWebHistory } from 'vue-router'
import FirstPage from '../pages/FirstPage'

const routes = [
  {
    path: '/',
    name: '首页',
    component: FirstPage
  },
  {
    path: '/main',
    name: '管理',
    component: () => import('../pages/MainPage')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

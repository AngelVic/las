import { createRouter, createWebHistory } from 'vue-router'
import FirstPage from '../pages/FirstPage'
import MainPage from '../pages/MainPage'
import GradeScore from '../pages/MainPage/views/GradeScore'
import ClassScore from '../pages/MainPage/views/ClassScore'
import FileManage from '../pages/MainPage/views/FileManage'
import StudentInfo from '../pages/MainPage/views/StudentInfo'
import AccountManage from '../pages/MainPage/views/AccountManage'
import AdminInfo from '../pages/MainPage/views/AdminInfo'
import GradeCompare from '../pages/MainPage/views/GradeCompare'
import StudentWarning from '../pages/MainPage/views/StudentWarning'

const routes = [
  {
    path: '/',
    name: '首页',
    component: FirstPage
  },
  {
    path: '/main',
    name: '管理',
    component: MainPage,
    children: [
      {
        path: 'index',
        component: StudentWarning
      },
      {
        path: 'GradeScore',
        component: GradeScore
      },
      {
        path: 'ClassScore',
        component: ClassScore
      },
      {
        path: 'FileManage',
        component: FileManage
      },
      {
        path: 'StudentInfo',
        component: StudentInfo
      },
      {
        path: 'AccountManage',
        component: AccountManage
      },
      {
        path: 'AdminInfo',
        component: AdminInfo
      },
      {
        path: 'GradeCompare',
        component: GradeCompare
      },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

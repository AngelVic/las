// 入口文件
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import './assets/styles/default.scss'
import './assets/styles/base.scss'

// import echarts from "echarts";

createApp(App).use(store).use(router).use(ElementPlus).mount('#app')
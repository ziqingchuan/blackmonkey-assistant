import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import ElementPlus from 'element-plus'
import { router } from './router';
import axios from 'axios'
//设置后端地址（本地或服务器），会将请求转发到后端端口
axios.defaults.baseURL = ('');
axios.defaults.timeout = 120000;

createApp(App).use(ElementPlus).use(router).mount('#app')
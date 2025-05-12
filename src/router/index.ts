import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: '/',
        redirect: '/rag-user'
    },
    {
        path: '/account',
        name: 'account',
        component: () => import('../views/Account.vue'),
        meta: { title: '登录与注册' }
    },
    {
        path: '/rag-user',
        name: 'rag-user',
        component: () => import('../views/RAG_User.vue'),
        meta: { title: '用户端' }
    },
    {
        path: '/rag-admin',
        name: 'rag-admin',
        component: () => import('../views/RAG_Admin.vue'),
        meta: { title: '管理员端' }
    },
];

export const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior() {
        return { top: 0 }; // 默认滚动到顶部
    },
});
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: '/',
        redirect: '/index'
    },
    {
        path: '/index',
        name: 'index',
        component: () => import('../views/Index.vue'),
        meta: { title: '首页' }
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
        component: () => import('../views/UserModule/RagUser.vue'),
        meta: { title: '用户端' }
    },
    {
        path: '/rag-admin',
        name: 'rag-admin',
        component: () => import('../views/AdminModule/RagAdmin.vue'),
        meta: { title: '管理员端' }
    },
    {
        path: '/achievement',
        name: 'achievement',
        component: () => import('../views/UserModule/Achievement.vue'),
        meta: { title: '成就页面' }
    },
    {
        path: '/play-methods',
        name: 'play-methods',
        component: () => import('../views/UserModule/PlayMethods.vue'),
        meta: { title: '打法推荐' }
    },
    {
        path: '/boss-tips',
        name: 'boss-tips',
        component: () => import('../views/UserModule/BossTips.vue'),
        meta: { title: 'Boss攻略' }
    },
];

export const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior() {
        return { top: 0 }; // 默认滚动到顶部
    },
});
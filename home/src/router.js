import Vue from 'vue';
import Router from 'vue-router';

import Home from '@v/Home';
import List from '@v/List';
import Detail from '@v/Detail'

Vue.use(Router);

const routes = [
    { path: '*', component: Home },
    // 使用异步加载组件，浏览警告
    // [Vue warn]: The client-side rendered virtual DOM tree is not matching server-rendered content.
    // { path: '/list/:page', component: () => import('@v/List') },
    // { path: '/detail/:id', component: () => import('@v/Detail') },
    { path: '/list/:page', component: List },
    { path: '/detail/:id', component: Detail },
]

export default new Router({
    mode: 'history',
    routes
})

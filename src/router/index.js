import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/dashboard'
        },
        {
            path: '/',
            component: () => import(/* webpackChunkName: "home" */ '../components/common/Home.vue'),
            meta: { title: '自述文件' },
            children: [
                {
                    path: '/dashboard',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/Dashboard.vue'),
                    meta: { title: '系统首页' }
                },              
                {
                    path: '/articleList',
                    component: () => import(/* webpackChunkName: "table" */ '../components/page/ArticleList.vue'),
                    meta: { title: '文章列表' }
                },
				{
				    path: '/articleEdit',
				    component: () => import(/* webpackChunkName: "table" */ '../components/page/ArticleEdit.vue'),
				    meta: { title: '文章编辑' }
				},
				{
				    path: '/articleAdd',
				    component: () => import(/* webpackChunkName: "table" */ '../components/page/ArticleAdd.vue'),
				    meta: { title: '新增文章' }
				},
                {
                    path: '/404',
                    component: () => import(/* webpackChunkName: "404" */ '../components/page/404.vue'),
                    meta: { title: '404' }
                },
                {
                    path: '/403',
                    component: () => import(/* webpackChunkName: "403" */ '../components/page/403.vue'),
                    meta: { title: '403' }
                }
            ]
        },
        {
            path: '/login',
            component: () => import(/* webpackChunkName: "login" */ '../components/page/Login.vue')
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
});

import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/index'
        },
		
		{
		    path: '/',
		    component: () => import('../components/blog/Home.vue'),
		    meta: { title: 'tobeyond' },
		    children: [
		        {
		            path: '/index',
		            component: () => import('../components/blog/Index.vue'),
		            meta: { title: '首页' }
		        },              
		        {
		            path: '/articleListFrontend',
		            component: () => import('../components/blog/ArticleListFrontend.vue'),
		            meta: { title: '文章列表' }
		        },
		    ]
		},
		
		{
		    path: '/admin',
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
				    path: '/tagList',
				    component: () => import(/* webpackChunkName: "table" */ '../components/page/TagList.vue'),
				    meta: { title: 'tagList' }
				},
				{
				    path: '/tagAdd',
				    component: () => import('../components/page/TagAdd.vue'),
				    meta: { title: 'add Tag' }
				},
				{
				    path: '/tagEdit',
				    component: () => import('../components/page/TagEdit.vue'),
				    meta: { title: 'edit Tag' }
				},
				{
				    path: '/maximList',
				    component: () => import('../components/page/MaximList.vue'),
				    meta: { title: 'maximList' }
				},
				{
				    path: '/maximEdit',
				    component: () => import('../components/page/MaximEdit.vue'),
				    meta: { title: 'edit maxim' }
				},
				{
				    path: '/maximAdd',
				    component: () => import('../components/page/MaximAdd.vue'),
				    meta: { title: 'add maxim' }
				},
				
				{
				    path: '/taskList',
				    component: () => import('../components/page/TaskList.vue'),
				    meta: { title: 'taskList' }
				},
				
                // {
                //     path: '/404',
                //     component: () => import(/* webpackChunkName: "404" */ '../components/page/404.vue'),
                //     meta: { title: '404' }
                // },
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
        },
		{
		    path: '/404',
		    component: () => import(/* webpackChunkName: "404" */ '../components/page/404.vue'),
		    meta: { title: '404' }
		},
    ]
});

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
		    component: () => import('@/components/blog/Home.vue'),
		    meta: { title: 'tobeyond' },
		    children: [
		        {
		            path: '/index',
					// component: () => import('../components/blog/Index.vue'),
		            // component: () => import(/* webpackChunkName: "Index" */ '../components/blog/Index.vue'),
					component: resolve => require(['@/components/blog/Index.vue'],resolve),
		            meta: { title: '首页' }
		        },              
		        {
		            path: '/articleListFrontend',
					// component: () => import('../components/blog/ArticleListFrontend.vue'),
		            // component: () => import(/* webpackChunkName: "ArticleListFrontend" */'../components/blog/ArticleListFrontend.vue'),
					component: resolve => require(['@/components/blog/ArticleListFrontend.vue'],resolve),
		            meta: { title: '文章列表' }
		        },
				{
				    path: '/articleDetailFrontend',
					// component: () => import('../components/blog/ArticleDetailFrontend.vue'),
				    // component: () => import(/* webpackChunkName: "ArticleDetailFrontend" */'../components/blog/ArticleDetailFrontend.vue'),
				    component: resolve => require(['../components/blog/ArticleDetailFrontend.vue'],resolve),
					meta: { title: '详情' }
				},
				{
				    path: '/about',
					// component: () => import('../components/blog/About.vue'),
				    // component: () => import(/* webpackChunkName: "About" */'../components/blog/About.vue'),
					component: resolve => require(['../components/blog/About.vue'],resolve),
				    meta: { title: '关于' }
				},
		    ]
		},
		
		{
		    path: '/admin',
		    redirect: '/dashboard'
		},
        {
            path: '/',
            component: () => import('../components/common/Home.vue'),
            meta: { title: '自述文件' },
            children: [
                {
                    path: '/dashboard',
					// component: () => import('../components/page/Dashboard.vue'),
                    // component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/Dashboard.vue'),
					component: resolve => require(['../components/page/Dashboard.vue'],resolve),
                    meta: { title: '系统首页' }
                },              
                {
                    path: '/articleList',
					// component: () => import('../components/page/ArticleList.vue'),
                    // component: () => import(/* webpackChunkName: "adminArticleList" */ '../components/page/ArticleList.vue'),
					component: resolve => require(['../components/page/ArticleList.vue'],resolve),
                    meta: { title: '文章列表' }
                },
				{
				    path: '/articleEdit',
					// component: () => import('../components/page/ArticleEdit.vue'),
				    // component: () => import(/* webpackChunkName: "adminArticleEdit" */ '../components/page/ArticleEdit.vue'),
					component: resolve => require(['../components/page/ArticleEdit.vue'],resolve),
				    meta: { title: '文章编辑' }
				},
				{
				    path: '/articleAdd',
					// component: () => import('../components/page/ArticleAdd.vue'),
				    // component: () => import(/* webpackChunkName: "adminArticleAdd" */ '../components/page/ArticleAdd.vue'),
					component: resolve => require(['../components/page/ArticleAdd.vue'],resolve),
				    meta: { title: '新增文章' }
				},
				{
				    path: '/tagList',
					// component: () => import('../components/page/TagList.vue'),
				    // component: () => import(/* webpackChunkName: "adminTagList" */ '../components/page/TagList.vue'),
					component: resolve => require(['../components/page/TagList.vue'],resolve),
				    meta: { title: 'tagList' }
				},
				{
				    path: '/tagAdd',
					// component: () => import('../components/page/TagAdd.vue'),
				    // component: () => import(/* webpackChunkName: "adminTagAdd" */ '../components/page/TagAdd.vue'),
					component: resolve => require(['../components/page/TagAdd.vue'],resolve),
				    meta: { title: 'add Tag' }
				},
				{
				    path: '/tagEdit',
					// component: () => import('../components/page/TagEdit.vue'),
				    // component: () => import(/* webpackChunkName: "adminTagEdit" */'../components/page/TagEdit.vue'),
					component: resolve => require(['../components/page/TagEdit.vue'],resolve),
				    meta: { title: 'edit Tag' }
				},
				{
				    path: '/maximList',
					// component: () => import('../components/page/MaximList.vue'),
				    // component: () => import(/* webpackChunkName: "adminMaximList" */'../components/page/MaximList.vue'),
					component: resolve => require(['../components/page/MaximList.vue'],resolve),
				    meta: { title: 'maximList' }
				},
				{
				    path: '/maximEdit',
					// component: () => import('../components/page/MaximEdit.vue'),
				    // component: () => import(/* webpackChunkName: "adminMaximEdit" */'../components/page/MaximEdit.vue'),
					component: resolve => require(['../components/page/MaximEdit.vue'],resolve),
				    meta: { title: 'edit maxim' }
				},
				{
				    path: '/maximAdd',
					// component: () => import('../components/page/MaximAdd.vue'),
				    // component: () => import(/* webpackChunkName: "adminMaximAdd" */'../components/page/MaximAdd.vue'),
					component: resolve => require(['../components/page/MaximAdd.vue'],resolve),
				    meta: { title: 'add maxim' }
				},
				
				{
				    path: '/taskList',
					// component: () => import('../components/page/TaskList.vue'),
				    // component: () => import(/* webpackChunkName: "adminTaskList" */'../components/page/TaskList.vue'),
					component: resolve => require(['../components/page/TaskList.vue'],resolve),
				    meta: { title: 'taskList' }
				},
				{
				    path: '/rabbitMqSocket',
					component: resolve => require(['../components/page/RabbitMqSocket.vue'],resolve),
				    meta: { title: 'rabbitMqSocket' }
				},
				
                {
                    path: '/404',
                    // component: () => import(/* webpackChunkName: "404" */ '../components/page/404.vue'),
					component: resolve => require(['../components/page/404.vue'],resolve),
                    meta: { title: '404' }
                },
                {
                    path: '/403',
					// component: () => import('../components/page/403.vue'),
                    // component: () => import(/* webpackChunkName: "403" */ '../components/page/403.vue'),
					component: resolve => require(['../components/page/403.vue'],resolve),
                    meta: { title: '403' }
                },
            ]
        },
        {
            path: '/login',
			// component: () => import('../components/page/Login.vue')
            // component: () => import(/* webpackChunkName: "adminLogin" */'../components/page/Login.vue')
			component: resolve => require(['../components/page/Login.vue'],resolve),
        },
        {
            path: '*',
            redirect: '/404'
        },
		{
		    path: '/404',
			// component: () => import('../components/page/404.vue'),
		    // component: () => import(/* webpackChunkName: "404" */ '../components/page/404.vue'),
			component: resolve => require(['../components/page/404.vue'],resolve),
		    meta: { title: '404' }
		},
    ]
});

import Layout from '@/views/layout/Layout'

export default [
    { path: '/login', name: 'login', component: () => import('@/views/login/Login') },
    { path: '/404', name: '404', component: () => import('@/views/404') },
    {
        path: '/',
        name: 'index',
        redirect: '/home',
        component: Layout,
        // hideInMenu: true,       // 不显示在左侧菜单栏
        // alwaysShow: true,   // 只有一个子组件时是否显示根组件
        // noCache: true,  // 表示不会被缓存,需要写在 meta 里面
        // this.$route 不会显示自定义的属性，只有meta里的自定义才会显示
        // this.$router 都会显示
        meta: { title: '首页', icon: 'tickets' },
        children: [
            {
                path: 'home',
                name: 'home',
                homePage: true,         // 用于定义首页
                // homePath: '/home',  // 用于定义首页
                meta: {
                    title: '首页', icon: 'printer',
                    // noCache: true
                },
                component: () => import('@/views/home/Home')
            }
        ]
    },
    {
        path: '/table',
        name: 'table',
        component: Layout,
        redirect: '/table/table1',
        meta: { title: '表格', icon: 'menu' },
        children: [
            {
                path: 'table1',
                name: 'table1',
                meta: { title: '表格1', icon: 'picture', noCache: true },
                component: () => import('@/views/table/Table1'),
            },
            {
                path: 'table2',
                name: 'table2',
                meta: { title: '表格2', icon: 'setting' },
                component: () => import('@/views/table/Table2'),
            },
        ]
    }, {
        path: '/form',
        name: 'form',
        component: Layout,
        redirect: '/form/form1',
        meta: { title: '表单', icon: 'date' },
        children: [
            {
                path: 'form1',
                name: 'form1',
                meta: { title: '表单1', icon: 'delete' },
                component: () => import('@/views/form/Form1'),
            },
            {
                path: 'form2',
                name: 'form2',
                meta: { title: '表单2', icon: 'setting' },
                component: () => import('@/views/form/Form2'),
            },
        ]
    }, {
        path: '/app',
        name: 'app',
        component: Layout,
        redirect: '/app/parent',
        meta: { title: '测试', icon: 'sold-out' },
        children: [
            {
                path: 'parent',
                name: 'parent',
                meta: { title: '父级', icon: 'sort' },
                redirect: '/app/parent/headPage',
                component: () => import('@/views/multilevel/Parent'),
                children: [
                    {
                        path: 'headPage',
                        name: 'headPage',
                        meta: { title: '父级1', icon: 'setting' },
                        component: () => import('@/views/multilevel/HeadPage'),
                    },
                    {
                        path: 'mainPage',
                        name: 'mainPage',
                        redirect: '/app/parent/mainPage/left',// 有children就加一个redirect
                        meta: { title: '父级2', icon: 'delete' },
                        component: () => import('@/views/multilevel/MainPage'),
                        children: [
                            {
                                path: 'left',
                                name: 'left',
                                meta: { title: '左边表单', icon: 'setting' },
                                component: () => import('@/views/multilevel/Left'),
                            }, {
                                path: 'right',
                                name: 'right',
                                meta: { title: '右边表单', icon: 'sort' },
                                component: () => import('@/views/multilevel/Right'),
                            }
                        ]

                    }
                ]
            },
            {
                path: 'test',
                name: 'test',
                meta: { title: '哈哈', icon: 'setting' },
                component: () => import('@/views/test/Test'),
            },
        ]
    },
    { path: '*', redirect: '/404' }


]
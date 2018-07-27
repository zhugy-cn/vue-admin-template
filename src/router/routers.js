import Layout from '@/views/layout/Layout'

export default [
    { path: '/login', name: 'login', component: () => import('@/views/login/Login') },
    { path: '/404', name: '404', component: () => import('@/views/404') },
    {
        path: '/',
        name: 'index',
        redirect: '/home',
        component: Layout,
        children: [
            {
                path: '/home',
                name: 'home',
                component: () => import('@/views/home/Home')
            }
        ]
    }, {
        path: '/table',
        name: 'table',
        component: Layout,
        redirect: '/table/table1',
        children: [
            {
                path: 'table1',
                name: 'table1',
                component: () => import('@/views/table/Table1'),
            },
            {
                path: 'table2',
                name: 'table2',
                component: () => import('@/views/table/Table2'),
            },
        ]
    }, {
        path: '/form',
        name: 'form',
        component: Layout,
        redirect: '/form/form1',
        children: [
            {
                path: 'form1',
                name: 'form1',
                component: () => import('@/views/form/Form1'),
            },
            {
                path: 'form2',
                name: 'form2',
                component: () => import('@/views/form/Form2'),
            },
        ]
    }, {
        path: '/app',
        name: 'app',
        component: Layout,
        redirect: '/app/parent',
        children: [
            {
                path: 'parent',
                name: 'parent',
                component: () => import('@/views/multilevel/Parent'),
                children: [
                    {
                        path: 'headPage',
                        name: 'headPage',
                        component: () => import('@/views/multilevel/HeadPage'),
                    },
                    {
                        path: 'mainPage',
                        name: 'mainPage',
                        component: () => import('@/views/multilevel/MainPage'),
                        children: [
                            {
                                path: 'left',
                                name: 'left',
                                component: () => import('@/views/multilevel/Left'),
                            }, {
                                path: 'right',
                                name: 'right',
                                component: () => import('@/views/multilevel/Right'),
                            }
                        ]

                    }
                ]
            },
            {
                path: 'form2',
                name: 'form2',
                component: () => import('@/views/form/Form2'),
            },
        ]
    },
    { path: '*', redirect: '/404' }


]
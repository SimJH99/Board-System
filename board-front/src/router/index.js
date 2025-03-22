import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        //login
        {
            path: '/',
            name: 'index',
            alias: ['/', 'login'],
            component: () => import('./components/Home.vue'),
        },
        //router Sample Form
        {
            path: '/sample',
            name: 'sample',
            redirect: '/sample',
            meta: {},
            children: [
                {
                    path: 'mainSample',
                    name: 'main',
                    meta: {},
                    component: () => import('./components/Main.vue'),
                },
                {
                    path: 'childrenSample',
                    name: 'childrenSample',
                    meta: {},
                    component: () => import('./components/childrenSample.vue'),
                }
            ],

        },
    ]
})
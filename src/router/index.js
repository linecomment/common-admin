import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    { path:'/',redirect:'/home' },
    {
        path:'/',
        name:'Main',
        component:() => import('@/views/Main'),
        children:[
            { path:'home',component:() => import('@/views/Home') },
            { path:'user',component:() => import('@/views/User') },
            { path:'mall',component:() => import('@/views/Mall') },
            { path:'page1',component:() => import('@/views/PageOne') },
            { path:'page2',component:() => import('@/views/PageTwo') }
        ]
    },   
]

const router = new VueRouter({
    routes
})

export default router
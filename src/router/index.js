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
            { path:'home',name:'home',component:() => import('@/views/Home') },
            { path:'user',name:'user',component:() => import('@/views/User') },
            { path:'mall',name:'mall',component:() => import('@/views/Mall') },
            { path:'page1',name:'page1',component:() => import('@/views/PageOne') },
            { path:'page2',name:'page2',component:() => import('@/views/PageTwo') }
        ]
    },   
]

const router = new VueRouter({
    routes
})

export default router
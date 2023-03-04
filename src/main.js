import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from './store'
import './api/mock';
import Cookie from 'js-cookie'

Vue.use(ElementUI)
Vue.config.productionTip = false

// 全局前置导航守卫
router.beforeEach((to,from,next) => {
  const token = Cookie.get('token')
  if( !token && to.name !== 'login'){
    next({ name:'login' })
  }else if(token && to.name === 'login') {
    next({ name:'home'})
  }else{
    next()
  }
})


new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')

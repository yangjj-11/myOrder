import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '../pages/Home/home.vue'
import search from '../pages/Search/search.vue'
import order from '../pages/Order/order.vue'
import profile from '../pages/Profile/profile.vue'
import login from '../pages/Login/login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect:'/home'
  },
  {
    path: '/home',
    name: 'home',
    component: home,
    meta:{
      showFooter:true
    }
  },
  {
    path: '/search',
    name: 'search',
    component: search,
    meta:{
      showFooter:true
    }
  },
  {
    path: '/order',
    name: 'order',
    component: order,
    meta:{
      showFooter:true
    }
  },
  {
    path: '/profile',
    name: 'profile',
    component: profile,
    meta:{
      showFooter:true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: login
  }
]

const router = new VueRouter({
  routes
})

export default router

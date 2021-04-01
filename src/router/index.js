import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '../pages/Home/home.vue'
import search from '../pages/Search/search.vue'
import order from '../pages/Order/order.vue'
import profile from '../pages/Profile/profile.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect:'/home'
  },
  {
    path: '/home',
    name: 'home',
    component: home
  },
  {
    path: '/search',
    name: 'search',
    component: search
  },
    {
    path: '/order',
    name: 'order',
    component: order
  },
    {
    path: '/profile',
    name: 'profile',
    component: profile
  }
]

const router = new VueRouter({
  routes
})

export default router

import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '@/views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/LoginPage.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  const isAuth = localStorage.getItem('token');

  if (to.name !== 'login' && !isAuth) next({name: 'login'})
  else next()

  if(to.name === 'login' && isAuth) next({name: 'home'})
  else next()
})

export default router

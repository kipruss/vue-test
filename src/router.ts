import { createWebHistory, createRouter, RouteRecordRaw } from 'vue-router'
import { List, Search, Details } from './pages'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    alias: '/list',
    name: 'list',
    component: List,
  },
  {
    path: '/details/:id',
    name: 'details',
    component: Details,
  },
  {
    path: '/search',
    name: 'search',
    component: Search,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router

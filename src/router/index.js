import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/encomendas',
      name: 'encomendas',
      component: () => import('../views/OrdersView.vue')
    },
    {
      path: '/catalogo',
      name: 'catalogo',
      component: () => import('../views/CatalogView.vue')
    },
    {
      path: '/servicos',
      name: 'servicos',
      component: () => import('../views/RepairsView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    }
  ]
})

export default router

import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
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
      // 1. Página Principal de Serviços
      path: '/servicos',
      name: 'servicos',
      component: () => import('../views/ServicosView.vue')
    },
    {
      // 2. Página para Pedir uma nova Reparação
      path: "/pedir_reparacao",
      name: "pedir_reparacao",
      component: () => import("../views/PedirReparacaoView.vue")
    },
    {
      // 3. Página para listar as Reparações do utilizador
      path: "/minhas_reparacoes",
      name: "minhas_reparacoes",
      component: () => import("../views/MinhasReparacoesView.vue")
    },
    {
      path: '/produto/:id',
      name: 'detalhe_produto',
      component: () => import('../views/ProductDetailView.vue')
    },
    {
      path: '/carrinho',
      name: 'carrinho',
      component: () => import('../views/CartView.vue')
    }
  ]
});

export default router;
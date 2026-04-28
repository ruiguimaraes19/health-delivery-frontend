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
      // A tua versão do Catálogo
      path: '/catalogo',
      name: 'catalogo',
      component: () => import('../views/CatalogView.vue')
    },
    {
      // A tua versão dos Serviços (que já inclui o Pedido de Reparação)
      path: '/servicos',
      name: 'servicos',
      component: () => import('../views/RepairsView.vue')
    },
    // ==========================================
    // Rotas criadas pelo teu colega (Gonçalo)
    // ==========================================
    {
      path: "/pedir_reparacao",
      name: "pedir_reparacao",
      component: () => import("../views/PedirReparacaoView.vue")
    },
    {
      path: "/minhas_reparacoes",
      name: "minhas_reparacoes",
      component: () => import("../views/MinhasReparacoesView.vue")
    }
  ]
});

export default router;
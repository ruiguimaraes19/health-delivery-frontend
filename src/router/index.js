import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/servicos",
      name: "servicos",
      component: () => import("../views/ServicosView.vue"),
    },
    {
      path: "/pedir_reparacao",
      name: "pedir_reparacao",
      component: () => import("../views/PedirReparacaoView.vue"),
    },
    {
      path: "/minhas_reparacoes",
      name: "minhas_reparacoes",
      component: () => import("../views/MinhasReparacoesView.vue"),
    },
    {
      path: "/catalogo",
      name: "catalogo",
      component: () => import("../views/CatalogoView.vue"),
    },
  ],
});

export default router;
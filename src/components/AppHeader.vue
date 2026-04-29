<script setup>
import { ref } from 'vue'
import { loja } from '@/store.js'
import imgLogo from '@/assets/logotipo-branco.png' 
import { useRouter } from 'vue-router'

const router = useRouter()

// NOVA VARIÁVEL: Controla se o menu está aberto ou fechado
const menuAberto = ref(false)

function terminarSessao() {
  loja.logout()
  menuAberto.value = false // Fecha o menu ao sair
  router.push('/')
}

// Função para fechar o menu quando se clica numa das opções
function fecharMenu() {
  menuAberto.value = false
}
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-dark shadow-sm sticky-top" style="background-color: #006D4A;">
    <div class="container">
      <router-link class="navbar-brand d-flex align-items-center" to="/">
        <img :src="imgLogo" alt="Logótipo Health Delivery" height="40" class="me-2" style="object-fit: contain;">
        <span class="fw-bold fs-4 text-white">Health Delivery</span>
      </router-link>

      <button class="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
        <ul class="navbar-nav align-items-center gap-3">
          <li class="nav-item">
            <router-link class="nav-link text-white fw-semibold" to="/catalogo">Catálogo</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link text-white fw-semibold" to="/servicos">Serviços</router-link>
          </li>
          
          <li class="nav-item d-flex align-items-center mx-lg-2">
            <router-link to="/carrinho" class="nav-link position-relative text-white" title="Carrinho">
              <i class="bi bi-cart3 fs-5"></i>
              <span v-if="loja.totalItens > 0" 
                    class="position-absolute top-0 start-100 translate-middle badge rounded-circle bg-danger" 
                    style="font-size: 0.65rem;">
                {{ loja.totalItens }}
              </span>
            </router-link>
          </li>

          <li class="nav-item ms-lg-2" v-if="!loja.usuarioLogado">
            <router-link to="/login" class="btn btn-light rounded-pill px-4 fw-bold custom-btn">
              <i class="bi bi-person-circle me-1"></i> Iniciar Sessão
            </router-link>
          </li>

          <li class="nav-item position-relative ms-lg-2" v-else>
            
            <button 
              class="btn btn-light rounded-pill px-4 fw-bold custom-btn d-flex align-items-center shadow-sm"
              @click="menuAberto = !menuAberto"
            >
              <i class="bi bi-person-circle me-2 fs-5"></i> 
              Olá, {{ loja.usuarioLogado.nome }}
              <i class="bi" :class="menuAberto ? 'bi-chevron-up' : 'bi-chevron-down'" style="margin-left: 8px; font-size: 0.8rem;"></i>
            </button>

            <div 
              v-if="menuAberto" 
              class="position-fixed top-0 start-0 w-100 h-100" 
              style="z-index: 1040;" 
              @click="menuAberto = false"
            ></div>

            <ul 
              class="dropdown-menu dropdown-menu-end shadow-lg border-0 rounded-4 mt-2" 
              :class="{ 'show': menuAberto }"
              style="position: absolute; right: 0; min-width: 240px; z-index: 1050;"
            >
              
              
              
              <li>
                <router-link @click="fecharMenu" class="dropdown-item py-2 fw-semibold" to="/encomendas">
                  <i class="bi bi-box-seam me-2 text-muted"></i>As minhas Encomendas
                </router-link>
              </li>
              <li>
                <router-link @click="fecharMenu" class="dropdown-item py-2 fw-semibold" to="/minhas_reparacoes">
                  <i class="bi bi-tools me-2 text-muted"></i>As minhas Reparações
                </router-link>
              </li>
              <li><hr class="dropdown-divider"></li>
              
              <li>
                <button class="dropdown-item py-2 fw-bold text-danger" @click="terminarSessao">
                  <i class="bi bi-box-arrow-right me-2"></i>Terminar Sessão
                </button>
              </li>
            </ul>
          </li>

        </ul>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.nav-link:hover { opacity: 0.8; }

/* Força a cor do texto do botão a ser sempre verde, mesmo quando se passa o rato */
.custom-btn {
  color: #006D4A !important;
  background-color: #ffffff;
  border: 2px solid transparent;
  transition: all 0.2s ease;
}

.custom-btn:hover {
  background-color: #f1f8f5; /* Um fundo levemente esverdeado no hover */
  transform: translateY(-1px);
}

.dropdown-item {
  transition: background-color 0.2s ease;
}

.dropdown-item:hover { 
  background-color: #f1f8f5; 
  color: #006D4A; 
}
</style>
<script setup>
import { loja } from '@/store.js'
// IMPORTANTE: Aqui mudamos o nome do ficheiro para o novo logótipo branco
import imgLogo from '@/assets/logotipo-branco.png' 
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-dark" style="background-color: #006D4A;">
    <div class="container">
      <router-link class="navbar-brand d-flex align-items-center" to="/">
        <img :src="imgLogo" alt="Logótipo Health Delivery" height="40" class="me-2" style="object-fit: contain;">
        <span class="fw-bold fs-4 text-white">Health Delivery</span>
      </router-link>

      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
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
          <li class="nav-item">
            <router-link class="nav-link text-white fw-semibold" to="/encomendas">Encomendas</router-link>
          </li>
          
          <li class="nav-item d-flex align-items-center mx-lg-2">
            <router-link to="/carrinho" class="nav-link position-relative text-white" title="Carrinho">
              <i class="bi bi-cart3 fs-5"></i>
              <span v-if="loja.totalItens > 0" 
                    class="position-absolute top-10 start-100 translate-middle badge rounded-circle bg-danger" 
                    style="font-size: 0.65rem;">
                {{ loja.totalItens }}
              </span>
            </router-link>
          </li>

          <li class="nav-item ms-lg-2">
            <router-link to="/login" class="btn btn-light rounded-pill px-4 fw-bold text-success">
              <i class="bi bi-person-circle me-1"></i> Iniciar Sessão
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.nav-link:hover {
  opacity: 0.8;
}
.text-success { color: #006D4A !important; }
</style>
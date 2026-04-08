<template>
  <nav class="navbar navbar-expand-lg navbar-dark" style="background-color: #006D4A;">
    <div class="container">
      <router-link class="navbar-brand d-flex align-items-center" to="/">
        <i class="bi bi-heart-pulse-fill fs-2 me-2"></i> 
        <span class="fw-bold fs-4">Health Delivery</span>
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
          
          <li class="nav-item ms-lg-3">
            <router-link to="/perfil" class="btn bg-white fw-bold px-4 rounded-pill" style="color: #006D4A;">
              <i class="bi bi-person-circle me-1"></i> Emanuel
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
</style>
<template>
  <div class="card h-100 border-0 shadow-sm rounded-4 position-relative p-3 product-card">
    
    <span v-if="bestSeller" class="badge rounded-pill position-absolute top-0 start-0 m-3 z-1 px-3 py-2" style="background-color: #006D4A;">
      Best Seller
    </span>
    
    <i class="bi bi-heart position-absolute top-0 end-0 m-3 z-1 text-muted fs-5 cursor-pointer"></i>

    <div class="bg-light rounded-4 d-flex align-items-center justify-content-center p-3 mb-3 mt-4" style="height: 180px;">
      <img v-if="image" :src="image" :alt="title" class="img-fluid h-100" style="object-fit: contain;">
      <i v-else class="bi bi-box text-secondary" style="font-size: 3rem;"></i> 
    </div>

    <div class="card-body text-center p-0 d-flex flex-column">
      <p class="text-success fw-bold small mb-1" style="color: #006D4A !important;">{{ brand }}</p>
      <h6 class="fw-bold mb-3 flex-grow-1">{{ title }}</h6>
      
      <div class="mb-3 text-warning small">
        <i class="bi bi-star-fill me-1" v-for="n in Math.floor(rating)" :key="n"></i>
        <i class="bi bi-star-half me-1" v-if="rating % 1 !== 0"></i>
        <span class="text-muted ms-1">({{ reviews }})</span>
      </div>

      <div class="mb-3">
        <span class="fs-4 fw-bold me-2">{{ currentPrice }}€</span>
        <span class="text-muted text-decoration-line-through small" v-if="oldPrice">{{ oldPrice }}€</span>
      </div>

      <button class="btn w-100 rounded-pill text-white fw-bold mt-auto" style="background-color: #006D4A;">Adicionar</button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  brand: String,
  currentPrice: String,
  oldPrice: String,
  rating: Number,
  reviews: Number,
  bestSeller: Boolean,
  image: String
})
</script>

<style scoped>
.cursor-pointer { cursor: pointer; }

/* Efeitos de Hover fundidos */
.product-card { 
  transition: transform 0.2s ease, box-shadow 0.2s ease; 
}
.product-card:hover { 
  transform: translateY(-5px); 
  box-shadow: 0 .5rem 1rem rgba(0,0,0,.15) !important; 
}

/* Cores e Botões */
.text-brand { color: #006D4A; }
.btn-success { background-color: #006D4A; border-color: #006D4A; }
.btn-success:hover { background-color: #00553a; border-color: #00553a; }

/* Corta o texto se for muito longo (para manter os cartões alinhados) */
.text-truncate-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
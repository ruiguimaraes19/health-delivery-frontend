<template>
  <div class="card h-100 border-0 shadow-sm rounded-4 product-card position-relative">
    <span v-if="bestSeller" class="badge bg-success position-absolute top-0 start-0 m-3 rounded-pill px-3 py-2" style="z-index: 2;">
      Best Seller
    </span>
    
    <button class="btn btn-link text-muted position-absolute top-0 end-0 m-2 p-1" style="z-index: 2;">
      <i class="bi bi-heart fs-5"></i>
    </button>

    <div class="card-body p-4 d-flex flex-column text-center">
      <div class="mb-4 bg-light rounded-4 d-flex align-items-center justify-content-center overflow-hidden" style="height: 180px;">
        <i class="bi bi-box-seam fs-1 text-secondary"></i>
      </div>

      <p class="text-brand small fw-bold mb-1">{{ brand }}</p>
      <h6 class="card-title fw-bold mb-3 text-truncate-2" style="min-height: 40px;">
        {{ title }}
      </h6>
      
      <div class="d-flex justify-content-center align-items-center gap-1 text-warning mb-3 small">
        <i class="bi bi-star-fill" v-for="n in Math.floor(rating)" :key="`full-${n}`"></i>
        <i class="bi bi-star-half" v-if="rating % 1 !== 0"></i>
        <span class="text-muted ms-1">({{ reviews }})</span>
      </div>

      <div class="mt-auto">
        <div class="d-flex justify-content-center align-items-end gap-2 mb-3">
          <h4 class="fw-bold mb-0 text-dark">{{ currentPrice }}€</h4>
          <span v-if="oldPrice" class="text-muted text-decoration-line-through small">{{ oldPrice }}€</span>
        </div>
        <button class="btn btn-success w-100 rounded-pill fw-bold">Adicionar</button>
      </div>
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
  bestSeller: Boolean
})
</script>

<style scoped>
.text-brand { color: #006D4A; }
.btn-success { background-color: #006D4A; border-color: #006D4A; }
.btn-success:hover { background-color: #00553a; border-color: #00553a; }
.product-card { transition: transform 0.2s ease, box-shadow 0.2s ease; }
.product-card:hover { transform: translateY(-5px); box-shadow: 0 .5rem 1rem rgba(0,0,0,.15)!important; }
.text-truncate-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
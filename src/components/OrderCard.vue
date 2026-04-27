<template>
  <div class="card mb-4 shadow-sm border-0 rounded-4">
    <div class="card-body p-4">
      <div class="d-flex justify-content-between align-items-start mb-3">
        <div>
          <h5 class="fw-bold mb-0">{{ orderId }}</h5>
          <span :class="priorityClass" class="badge rounded-pill mt-2 px-3 py-2">
            {{ priorityLabel }}
          </span>
        </div>
        <h4 class="fw-bold text-success">{{ price }} €</h4>
      </div>

      <div class="mb-4 text-muted small">
        <div class="d-flex align-items-center gap-2 mb-1">
          <i class="bi bi-box-seam"></i>
          <span>{{ products }}</span>
        </div>
        <div class="d-flex align-items-center gap-2 mb-1">
          <i class="bi bi-geo-alt"></i>
          <span>{{ location }}</span>
        </div>
        <div class="d-flex align-items-center gap-2">
          <i class="bi bi-clock"></i>
          <span>{{ dateTime }}</span>
        </div>
      </div>

      <div class="position-relative mb-5 mt-4 px-2">
        <div class="progress" style="height: 6px;">
          <div class="progress-bar bg-success" :style="{ width: progressWidth + '%' }"></div>
        </div>
        <div class="d-flex justify-content-between position-absolute w-100 start-0" style="top: -8px;">
          <div v-for="step in 4" :key="step" 
               class="rounded-circle border border-2" 
               :class="step <= currentStep ? 'bg-success border-success' : 'bg-white border-secondary'"
               style="width: 20px; height: 20px;">
          </div>
        </div>
        <div class="d-flex justify-content-between mt-2 small text-muted fw-semibold">
          <span>Pedido aceite</span>
          <span>Em recolha</span>
          <span>A caminho</span>
          <span>Entregue</span>
        </div>
      </div>

      <div class="d-flex justify-content-between align-items-center pt-3 border-top">
        <div class="d-flex align-items-center gap-3">
          <div class="bg-light rounded-circle d-flex align-items-center justify-content-center" style="width: 45px; height: 45px;">
            <i class="bi bi-person-fill text-secondary fs-4"></i>
          </div>
          <div>
            <p class="mb-0 fw-bold small">{{ courierName }}</p>
            <div class="text-warning small">
              <i class="bi bi-star-fill me-1"></i>{{ courierRating }}
            </div>
          </div>
        </div>
        <div class="d-flex gap-2">
          <button v-if="status !== 'Entregue'" class="btn btn-outline-secondary btn-sm rounded-pill px-3">
            Ver no mapa
          </button>
          <button class="btn btn-success btn-sm rounded-pill px-3">
            Detalhes <i class="bi bi-chevron-right ms-1"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  orderId: String,
  priorityLabel: String,
  priorityClass: String,
  price: String,
  products: String,
  location: String,
  dateTime: String,
  currentStep: Number,
  progressWidth: Number,
  courierName: String,
  courierRating: String,
  status: String
})
</script>
<template>
  <main class="container py-5">
    <h1 class="fw-bold text-brand mb-1">As minhas Encomendas</h1>
    <p class="text-muted mb-5">Acompanhe as suas encomendas em curso e o seu histórico completo.</p>

    <div class="row g-4 mb-5">
      <div class="col-6 col-md-3" v-for="stat in stats" :key="stat.label">
        <div class="card border-0 shadow-sm rounded-4 text-center p-3 h-100">
          <div class="fs-1 text-success mb-2"><i :class="stat.icon"></i></div>
          <h3 class="fw-bold mb-0">{{ stat.value }}</h3>
          <p class="text-muted small mb-0">{{ stat.label }}</p>
        </div>
      </div>
    </div>

    <h4 class="fw-bold mb-4">Em curso (2)</h4>
    <OrderCard 
      order-id="GE-2026-0847"
      priority-label="Urgente (30 min)"
      priority-class="bg-danger text-white"
      price="25,97"
      products="Máquina de Ventilação Portátil"
      location="Hospital de Braga"
      date-time="04/03/2026 - 14:32"
      :current-step="3"
      :progress-width="66"
      courier-name="Ricardo Santos"
      courier-rating="4.9"
    />

    <h4 class="fw-bold mb-4 mt-5">Histórico (1)</h4>
    <OrderCard 
      order-id="GE-2026-0712"
      priority-label="Normal"
      priority-class="bg-light text-dark"
      price="140,00"
      products="Cadeira de Rodas Articulada"
      location="Domicílio - Porto"
      date-time="28/02/2026 - 10:15"
      :current-step="4"
      :progress-width="100"
      courier-name="Ana Costa"
      courier-rating="4.7"
      status="Entregue"
    />
  </main>
</template>

<script setup>
import OrderCard from '@/components/OrderCard.vue'

const stats = [
  { label: 'Em curso', value: '2', icon: 'bi-truck' },
  { label: 'Concluído', value: '1', icon: 'bi-check-circle' },
  { label: 'Urgente', value: '1', icon: 'bi-bell' },
  { label: 'Avaliação', value: '4,7', icon: 'bi-star' }
]
</script>

<style scoped>
.text-brand { color: #006D4A; }
</style>
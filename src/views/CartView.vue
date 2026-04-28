<script setup>
import { loja } from '@/store.js'
import { computed } from 'vue'

// Cálculos automáticos
const subtotal = computed(() => {
  return loja.carrinho.reduce((soma, item) => {
    const preco = parseFloat(item.price.replace(',', '.'))
    return soma + (preco * item.quantidade)
  }, 0)
})

const taxaEntrega = computed(() => (subtotal.value > 35 || subtotal.value === 0 ? 0 : 4.95))
const total = computed(() => subtotal.value + taxaEntrega.value)

function remover(id) {
  const index = loja.carrinho.findIndex(item => item.id === id)
  if (index !== -1) loja.carrinho.splice(index, 1)
}

function finalizarPagamento() {
  alert('A redirecionar para a plataforma de pagamento segura... 💳')
}
</script>

<template>
  <main class="container py-5">
    <h2 class="fw-bold text-brand mb-4">O meu Carrinho</h2>

    <div class="row g-5">
      <div class="col-lg-8">
        <div v-if="loja.carrinho.length === 0" class="text-center py-5 bg-light rounded-4">
          <i class="bi bi-cart-x display-1 text-muted mb-3"></i>
          <h4>O seu carrinho está vazio</h4>
          <router-link to="/catalogo" class="btn btn-brand rounded-pill px-4 mt-3">Ir para o Catálogo</router-link>
        </div>

        <div v-else>
          <div v-for="item in loja.carrinho" :key="item.id" class="card border-0 shadow-sm rounded-4 mb-3 p-2">
            <div class="card-body d-flex align-items-center gap-3">
              <div class="bg-light rounded-3 p-2" style="width: 80px; height: 80px;">
                <img :src="item.imagem" class="img-fluid h-100 w-100" style="object-fit: contain;">
              </div>
              
              <div class="flex-grow-1">
                <h6 class="fw-bold mb-1">{{ item.title }}</h6>
                <p class="text-muted small mb-0">{{ item.brand }}</p>
              </div>

              <div class="text-center" style="width: 100px;">
                <div class="input-group input-group-sm border rounded-pill">
                  <button class="btn border-0" @click="item.quantidade > 1 ? item.quantidade-- : null"><i class="bi bi-dash"></i></button>
                  <span class="form-control border-0 bg-transparent text-center px-0 fw-bold">{{ item.quantidade }}</span>
                  <button class="btn border-0" @click="item.quantidade++"><i class="bi bi-plus"></i></button>
                </div>
              </div>

              <div class="text-end" style="width: 100px;">
                <h6 class="fw-bold mb-0">{{ item.price }}€</h6>
                <button class="btn btn-link text-danger p-0 small" @click="remover(item.id)">Remover</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-lg-4">
        <div class="card border-0 shadow-sm rounded-4 p-4 bg-light sticky-top" style="top: 2rem;">
          <h5 class="fw-bold mb-4">Resumo do Pedido</h5>
          
          <div class="d-flex justify-content-between mb-2">
            <span class="text-muted">Subtotal</span>
            <span class="fw-bold">{{ subtotal.toFixed(2).replace('.', ',') }}€</span>
          </div>
          
          <div class="d-flex justify-content-between mb-3">
            <span class="text-muted">Taxa de Entrega</span>
            <span class="text-success fw-bold" v-if="taxaEntrega === 0">Grátis</span>
            <span class="fw-bold" v-else>{{ taxaEntrega.toFixed(2).replace('.', ',') }}€</span>
          </div>

          <hr>

          <div class="d-flex justify-content-between mb-4">
            <h4 class="fw-bold">Total</h4>
            <h4 class="fw-bold text-brand">{{ total.toFixed(2).replace('.', ',') }}€</h4>
          </div>

          <button class="btn btn-brand w-100 rounded-pill py-3 fw-bold shadow-sm" 
                  :disabled="loja.carrinho.length === 0"
                  @click="finalizarPagamento">
            PROCEDER AO PAGAMENTO
          </button>

          <div class="mt-4 small text-muted text-center">
            <i class="bi bi-shield-check me-1"></i> Pagamento 100% Seguro
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.text-brand { color: #006D4A; }
.btn-brand { background-color: #006D4A; color: white; }
.btn-brand:hover { background-color: #004d34; color: white; }
.btn-brand:disabled { background-color: #ccc; border-color: #ccc; }
</style>
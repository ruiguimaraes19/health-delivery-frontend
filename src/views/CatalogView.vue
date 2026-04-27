<template>
  <main class="container py-5">
    <div class="row">
      <aside class="col-lg-3 mb-4 mb-lg-0">
        <div class="card border-0 shadow-sm rounded-4 p-4 sticky-top" style="top: 2rem; background-color: #E1F2D1;">
          <h5 class="fw-bold mb-4 text-uppercase fs-6">Filtros</h5>
          
          <div class="mb-4">
            <h6 class="fw-bold text-muted small mb-3">Categorias</h6>
            <div class="form-check mb-2" v-for="cat in categorias" :key="cat">
              <input class="form-check-input" type="checkbox" :id="cat">
              <label class="form-check-label text-secondary small" :for="cat">{{ cat }}</label>
            </div>
          </div>

          <div class="mb-4">
            <h6 class="fw-bold text-muted small mb-3">Intervalo de Preço</h6>
            <div class="d-flex align-items-center gap-2">
              <input type="number" class="form-control form-control-sm text-center" placeholder="Min" value="0">
              <span class="text-muted">-</span>
              <input type="number" class="form-control form-control-sm text-center" placeholder="Max" value="500">
            </div>
          </div>

          <div>
            <h6 class="fw-bold text-muted small mb-3">Marcas</h6>
            <div class="form-check mb-2" v-for="marca in marcas" :key="marca">
              <input class="form-check-input" type="checkbox" :id="marca">
              <label class="form-check-label text-secondary small" :for="marca">{{ marca }}</label>
            </div>
          </div>
        </div>
      </aside>

      <div class="col-lg-9">
        <div class="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4 gap-3">
          <div class="position-relative w-100" style="max-width: 500px;">
            <i class="bi bi-search position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"></i>
            <input type="text" class="form-control rounded-pill ps-5 bg-light border-0" placeholder="Pesquisar marcas, produtos, etc...">
          </div>
          <select class="form-select rounded-pill w-auto border-0 bg-light">
            <option>Relevância</option>
            <option>Preço: Mais baixo</option>
            <option>Preço: Mais alto</option>
          </select>
        </div>

        <div class="row g-4">
          <div class="col-md-6 col-xl-4" v-for="p in produtos" :key="p.id">
            <ProductCard 
              :title="p.title"
              :brand="p.brand"
              :current-price="p.price"
              :old-price="p.oldPrice"
              :rating="p.rating"
              :reviews="p.reviews"
              :best-seller="p.bestSeller"
            />
          </div>
        </div>

        <nav class="mt-5 d-flex justify-content-center">
          <ul class="pagination pagination-sm gap-2">
            <li class="page-item disabled"><a class="page-link rounded border-0 bg-light text-dark" href="#"><i class="bi bi-chevron-left"></i></a></li>
            <li class="page-item active"><a class="page-link rounded border-0 bg-success text-white" href="#">1</a></li>
            <li class="page-item"><a class="page-link rounded border-0 bg-light text-dark" href="#">2</a></li>
            <li class="page-item"><a class="page-link rounded border-0 bg-light text-dark" href="#">3</a></li>
            <li class="page-item"><a class="page-link rounded border-0 bg-light text-dark" href="#"><i class="bi bi-chevron-right"></i></a></li>
          </ul>
        </nav>
      </div>
    </div>
  </main>
</template>

<script setup>
import ProductCard from '@/components/ProductCard.vue'

const categorias = ['Facilidade de Mobilidade', 'Cuidados de Saúde', 'Suplementos Alimentares', 'Higiene e Bem-estar']
const marcas = ['La Roche-Posay', 'Cerave', 'Omron', 'Invacare']

// Dados simulados para o catálogo
const produtos = [
  { id: 1, title: 'Cadeira de Rodas Manual', brand: 'Invacare', price: '250,00', oldPrice: '299,00', rating: 4.5, reviews: 128, bestSeller: true },
  { id: 2, title: 'Máquina de Ventilação Portátil', brand: 'ResMed', price: '450,00', rating: 5, reviews: 34, bestSeller: false },
  { id: 3, title: 'Monitor de Tensão Arterial', brand: 'Omron', price: '45,99', oldPrice: '55,00', rating: 4, reviews: 210, bestSeller: true },
  { id: 4, title: 'Cama Articulada Elétrica', brand: 'Invacare', price: '890,00', rating: 4.5, reviews: 12, bestSeller: false },
  { id: 5, title: 'Muletas Axilares', brand: 'Genérico', price: '25,00', rating: 3.5, reviews: 8, bestSeller: false },
  { id: 6, title: 'Aparelho de Aerossóis', brand: 'Omron', price: '59,90', oldPrice: '70,00', rating: 4, reviews: 89, bestSeller: true }
]
</script>

<style scoped>
.page-link { width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; }
.form-check-input:checked { background-color: #006D4A; border-color: #006D4A; }
</style>
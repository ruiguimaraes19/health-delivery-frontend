<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { loja } from '@/store.js' // O nosso cérebro!

// Importar as mesmas imagens do catálogo para ele encontrar a certa
import imgBengala from '@/assets/catalogo/bengala.png'
import imgBraco from '@/assets/catalogo/Braco_articulado.png'
import imgCadeira from '@/assets/catalogo/cadeira.png'
import imgCama from '@/assets/catalogo/cama.png'
import imgElevador from '@/assets/catalogo/elevador_transferencia.png'
import imgRx from '@/assets/catalogo/Equipamento_RX_portatil.png'
import imgGel from '@/assets/catalogo/Gel_higienizante.png'
import imgKit from '@/assets/catalogo/Kit_cuidados_pele.png'

const route = useRoute()

// Base de dados simulada (igual ao catálogo)
const produtosBD = [
  { id: 1, title: 'Cadeira de Rodas Pro', brand: 'Invacare', price: '245,00', oldPrice: '299,00', rating: 4.5, reviews: 128, imagem: imgCadeira },
  { id: 2, title: 'Cama Articulada Elétrica', brand: 'Health Delivery Pro', price: '560,00', rating: 5, reviews: 34, imagem: imgCama },
  { id: 3, title: 'Bengala Ergonómica', brand: 'Genérico', price: '25,00', oldPrice: '35,00', rating: 4, reviews: 210, imagem: imgBengala },
  { id: 4, title: 'Braço Articulado', brand: 'Health Delivery Pro', price: '120,00', rating: 4.5, reviews: 12, imagem: imgBraco },
  { id: 5, title: 'Elevador de Transferência', brand: 'Invacare', price: '830,00', rating: 5, reviews: 8, imagem: imgElevador },
  { id: 6, title: 'Equipamento RX Portátil', brand: 'Health Delivery Pro', price: '2500,00', rating: 4.5, reviews: 3, imagem: imgRx },
  { id: 7, title: 'Gel Higienizante 500ml', brand: 'Genérico', price: '8,50', oldPrice: '12,00', rating: 4, reviews: 89, imagem: imgGel },
  { id: 8, title: 'Kit Cuidados de Pele', brand: 'Genérico', price: '34,90', rating: 4.5, reviews: 45, imagem: imgKit }
]

// Descobre o produto atual pelo ID que está na barra de endereço
const produtoAtual = computed(() => {
  return produtosBD.find(p => p.id == route.params.id) || produtosBD[0]
})

// Lógica da página
const quantidade = ref(1)
const separadorAtivo = ref('descricao')

function adicionar() {
  loja.adicionarAoCarrinho(produtoAtual.value, quantidade.value)
}
</script>

<template>
  <main class="container py-4">
    <nav aria-label="breadcrumb" class="mb-4 small">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><router-link to="/" class="text-success text-decoration-none">Home</router-link></li>
        <li class="breadcrumb-item"><router-link to="/catalogo" class="text-success text-decoration-none">Catálogo</router-link></li>
        <li class="breadcrumb-item active">{{ produtoAtual.title }}</li>
      </ol>
    </nav>

    <div class="row g-5">
      <div class="col-lg-5">
        <div class="d-flex align-items-center justify-content-between mb-2">
          <p class="text-success fw-bold mb-0">{{ produtoAtual.brand }}</p>
          <i class="bi bi-heart fs-4 text-muted cursor-pointer"></i>
        </div>
        
        <h2 class="fw-bold mb-3">{{ produtoAtual.title }}</h2>
        
        <div class="d-flex align-items-center mb-4 text-warning small">
          <i class="bi bi-star-fill me-1" v-for="n in 4" :key="n"></i>
          <i class="bi bi-star-half me-1"></i>
          <span class="text-muted ms-2">{{ produtoAtual.rating }} ({{ produtoAtual.reviews }})</span>
        </div>

        <div class="d-flex align-items-end mb-3">
          <h1 class="fw-bold mb-0 me-3">{{ produtoAtual.price }}€</h1>
          <h5 class="text-muted text-decoration-line-through mb-1" v-if="produtoAtual.oldPrice">{{ produtoAtual.oldPrice }}€</h5>
        </div>
        
        <p class="text-success fw-bold mb-4"><i class="bi bi-check-circle-fill me-1"></i> Disponível</p>

        <div class="d-flex gap-3 mb-4">
          <div class="input-group w-auto border rounded-pill p-1">
            <button class="btn btn-sm border-0 rounded-circle" @click="quantidade > 1 ? quantidade-- : null"><i class="bi bi-dash"></i></button>
            <input type="text" class="form-control border-0 text-center fw-bold px-0 bg-transparent" v-model="quantidade" style="width: 40px;" readonly>
            <button class="btn btn-sm border-0 rounded-circle" @click="quantidade++"><i class="bi bi-plus"></i></button>
          </div>
          <button class="btn btn-brand rounded-pill flex-grow-1 fw-bold" @click="adicionar">
            Adicionar <span v-if="quantidade > 1">({{ quantidade }})</span>
          </button>
        </div>

        <div class="mb-4 small text-muted fw-semibold">
          <p class="mb-2"><i class="bi bi-truck me-2 text-dark fs-5"></i> Entrega Grátis acima de 35€</p>
          <p class="mb-0"><i class="bi bi-clock me-2 text-dark fs-5"></i> Recebe amanhã, 21 de março</p>
        </div>

        <div class="d-flex gap-3 align-items-center border-top pt-4 mb-4">
          <i class="bi bi-credit-card-2-front fs-1 text-primary"></i>
          <i class="bi bi-paypal fs-2 text-info"></i>
          <span class="fs-4 fw-bold text-dark border px-2 rounded">MB</span>
        </div>
      </div>

      <div class="col-lg-7">
        <div class="bg-light rounded-4 d-flex justify-content-center align-items-center p-5 mb-3" style="height: 450px;">
          <img :src="produtoAtual.imagem" :alt="produtoAtual.title" class="img-fluid h-100" style="object-fit: contain;">
        </div>
        
        <div class="d-flex gap-3 justify-content-center">
          <div class="bg-light rounded-3 p-2 border border-success" style="width: 80px; height: 80px;">
            <img :src="produtoAtual.imagem" class="img-fluid h-100 w-100" style="object-fit: contain;">
          </div>
          <div class="bg-light rounded-3 p-2 opacity-50" style="width: 80px; height: 80px;">
            <img :src="produtoAtual.imagem" class="img-fluid h-100 w-100" style="object-fit: contain;">
          </div>
        </div>
      </div>
    </div>

    <div class="row mt-5">
      <div class="col-12">
        <ul class="nav nav-tabs border-bottom border-success border-2">
          <li class="nav-item">
            <button class="nav-link border-0 fw-bold px-4" :class="separadorAtivo === 'descricao' ? 'active text-success border-bottom border-success border-3' : 'text-muted'" @click="separadorAtivo = 'descricao'">Descrição</button>
          </li>
          <li class="nav-item">
            <button class="nav-link border-0 fw-bold px-4" :class="separadorAtivo === 'como_usar' ? 'active text-success border-bottom border-success border-3' : 'text-muted'" @click="separadorAtivo = 'como_usar'">Como usar</button>
          </li>
          <li class="nav-item">
            <button class="nav-link border-0 fw-bold px-4" :class="separadorAtivo === 'ingredientes' ? 'active text-success border-bottom border-success border-3' : 'text-muted'" @click="separadorAtivo = 'ingredientes'">Ingredientes</button>
          </li>
        </ul>

        <div class="py-4 text-muted">
          <div v-if="separadorAtivo === 'descricao'">
            <p>O <strong>{{ produtoAtual.title }}</strong> é um equipamento multifuncional que garante conforto e segurança. É adequado para todas as faixas etárias e foi testado clinicamente.</p>
            <p>É também enriquecido com materiais de alta qualidade - resistente a bactérias, calmante, e agentes anti-alérgicos.</p>
          </div>
          <div v-if="separadorAtivo === 'como_usar'">
            <p>Utilizar de acordo com as instruções do manual técnico incluído. Não são necessárias precauções de utilização específicas para este produto em condições normais.</p>
          </div>
          <div v-if="separadorAtivo === 'ingredientes'">
            <p class="small text-uppercase">Material Principal / Liga de Alumínio / Polipropileno / Componentes Eletrónicos Certificados (F.I.L.L. N7001474/1).</p>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.btn-brand { background-color: #006D4A; color: white; }
.btn-brand:hover { background-color: #004d34; color: white; }
.text-success { color: #006D4A !important; }
.border-success { border-color: #006D4A !important; }
.nav-tabs .nav-link { background: transparent; border-radius: 0; }
</style>
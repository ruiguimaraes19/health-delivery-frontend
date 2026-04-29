<template>
  <main class="container py-5">
    <div class="row">
      <aside class="col-lg-3 mb-4 mb-lg-0">
        <div class="card border-0 shadow-sm rounded-4 p-4 sticky-top caixa-filtros" style="background-color: #E1F2D1;">
          <h5 class="fw-bold mb-4 text-uppercase fs-6">Filtros</h5>
          
          <div class="mb-4">
            <h6 class="fw-bold text-muted small mb-3">Categorias</h6>
            <div class="form-check mb-2" v-for="cat in categorias" :key="cat">
              <input class="form-check-input" type="checkbox" :id="cat" :value="cat" v-model="catSelecionadas">
              <label class="form-check-label text-secondary small" :for="cat">{{ cat }}</label>
            </div>
          </div>

          <div class="mb-4">
            <h6 class="fw-bold text-muted small mb-3">Intervalo de Preço</h6>
            <div class="d-flex align-items-center gap-2">
              <input type="number" class="form-control form-control-sm text-center" v-model="precoMin">
              <span class="text-muted">-</span>
              <input type="number" class="form-control form-control-sm text-center" v-model="precoMax">
            </div>
          </div>

          <div>
            <h6 class="fw-bold text-muted small mb-3">Marcas</h6>
            <div class="form-check mb-2" v-for="marca in marcas" :key="marca">
              <input class="form-check-input" type="checkbox" :id="marca" :value="marca" v-model="marcasSelecionadas">
              <label class="form-check-label text-secondary small" :for="marca">{{ marca }}</label>
            </div>
          </div>
        </div>
      </aside>

      <div class="col-lg-9">
        <div class="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4 gap-3">
          <div class="position-relative w-100" style="max-width: 500px;">
            <i class="bi bi-search position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"></i>
            <input type="text" class="form-control rounded-pill ps-5 bg-light border-0" placeholder="Pesquisar..." v-model="pesquisa">
          </div>
          <span class="text-muted small">A mostrar {{ produtosFiltrados.length }} produtos</span>
        </div>

        <div class="row g-4">
          <div class="col-md-6 col-xl-4" v-for="p in produtosFiltrados" :key="p.id">
            
            <router-link :to="'/produto/' + p.id" class="text-decoration-none text-dark">
              <ProductCard 
                :title="p.title"
                :brand="p.brand"
                :current-price="p.price"
                :old-price="p.oldPrice"
                :rating="p.rating"
                :reviews="p.reviews"
                :best-seller="p.bestSeller"
                :image="p.imagem" 
              />
            </router-link>

          </div>

          <div v-if="produtosFiltrados.length === 0" class="col-12 text-center py-5">
            <h4 class="text-muted">Nenhum produto encontrado com estes filtros.</h4>
            <button class="btn btn-outline-success mt-3" @click="limparFiltros">Limpar Filtros</button>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, computed } from 'vue';
import ProductCard from '@/components/ProductCard.vue';

// Imagens
import imgBengala from '@/assets/catalogo/bengala.png';
import imgBraco from '@/assets/catalogo/Braco_articulado.png';
import imgCadeira from '@/assets/catalogo/cadeira.png';
import imgCama from '@/assets/catalogo/cama.png';
import imgElevador from '@/assets/catalogo/elevador_transferencia.png';
import imgRx from '@/assets/catalogo/Equipamento_RX_portatil.png';
import imgGel from '@/assets/catalogo/Gel_higienizante.png';
import imgKit from '@/assets/catalogo/Kit_cuidados_pele.png';

const categorias = ['Mobilidade', 'Higiene e Bem-estar', 'Equipamento']
const marcas = ['Health Delivery Pro', 'Invacare', 'Genérico']

// Lista de produtos base (adicionei a propriedade "categoria" a cada um)
const produtos = [
  { id: 1, title: 'Cadeira de Rodas Pro', brand: 'Invacare', categoria: 'Mobilidade', price: '245,00', oldPrice: '299,00', rating: 4.5, reviews: 128, bestSeller: true, imagem: imgCadeira },
  { id: 2, title: 'Cama Articulada Elétrica', brand: 'Health Delivery Pro', categoria: 'Equipamento', price: '560,00', rating: 5, reviews: 34, bestSeller: true, imagem: imgCama },
  { id: 3, title: 'Bengala Ergonómica', brand: 'Genérico', categoria: 'Mobilidade', price: '25,00', oldPrice: '35,00', rating: 4, reviews: 210, bestSeller: false, imagem: imgBengala },
  { id: 4, title: 'Braço Articulado', brand: 'Health Delivery Pro', categoria: 'Equipamento', price: '120,00', rating: 4.5, reviews: 12, bestSeller: false, imagem: imgBraco },
  { id: 5, title: 'Elevador de Transferência', brand: 'Invacare', categoria: 'Equipamento', price: '830,00', rating: 5, reviews: 8, bestSeller: false, imagem: imgElevador },
  { id: 6, title: 'Equipamento RX Portátil', brand: 'Health Delivery Pro', categoria: 'Equipamento', price: '2500,00', rating: 4.5, reviews: 3, bestSeller: false, imagem: imgRx },
  { id: 7, title: 'Gel Higienizante 500ml', brand: 'Genérico', categoria: 'Higiene e Bem-estar', price: '8,50', oldPrice: '12,00', rating: 4, reviews: 89, bestSeller: true, imagem: imgGel },
  { id: 8, title: 'Kit Cuidados de Pele', brand: 'Genérico', categoria: 'Higiene e Bem-estar', price: '34,90', rating: 4.5, reviews: 45, bestSeller: false, imagem: imgKit }
]

// VARIÁVEIS DOS FILTROS
const pesquisa = ref('')
const catSelecionadas = ref([])
const marcasSelecionadas = ref([])
const precoMin = ref(0)
const precoMax = ref(3000)

// A MAGIA ACONTECE AQUI: O Vue calcula automaticamente o que mostrar!
const produtosFiltrados = computed(() => {
  return produtos.filter(p => {
    // 1. Filtro de Pesquisa (Texto)
    const matchPesquisa = p.title.toLowerCase().includes(pesquisa.value.toLowerCase())
    
    // 2. Filtro de Categorias (Se o array estiver vazio, mostra tudo)
    const matchCat = catSelecionadas.value.length === 0 || catSelecionadas.value.includes(p.categoria)
    
    // 3. Filtro de Marcas
    const matchMarca = marcasSelecionadas.value.length === 0 || marcasSelecionadas.value.includes(p.brand)
    
    // 4. Filtro de Preço (Temos de converter "245,00" para número 245.00)
    const precoNumero = parseFloat(p.price.replace(',', '.'))
    const matchPreco = precoNumero >= precoMin.value && precoNumero <= precoMax.value

    // Só mostra o produto se passar em TODOS os testes
    return matchPesquisa && matchCat && matchMarca && matchPreco
  })
})

function limparFiltros() {
  pesquisa.value = ''
  catSelecionadas.value = []
  marcasSelecionadas.value = []
  precoMin.value = 0
  precoMax.value = 3000
}
</script>

<style scoped>
.form-check-input:checked { background-color: #006D4A; border-color: #006D4A; }

/* Correção para os filtros não baterem no cabeçalho */
.caixa-filtros {
  top: 90px !important; /* Dá o desconto da altura do teu cabeçalho */
  z-index: 1000; /* Garante que fica na camada por baixo da barra de navegação */
  max-height: calc(100vh - 110px); /* Cria scroll interno se o ecrã for muito pequeno */
  overflow-y: auto; /* Esconde a barra de scroll até ser necessária */
}

/* Oculta a barra de scroll nativa (opcional, para ficar mais elegante) */
.caixa-filtros::-webkit-scrollbar { width: 6px; }
.caixa-filtros::-webkit-scrollbar-track { background: transparent; }
.caixa-filtros::-webkit-scrollbar-thumb { background: #cce2d8; border-radius: 10px; }
</style>
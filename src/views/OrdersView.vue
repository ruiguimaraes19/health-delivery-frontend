<script setup>
import { ref } from 'vue';

// Dados da encomenda em curso (para o Modal)
const encomendaSelecionada = ref({
  id: 'GE-2026-0847',
  tipo: 'Urgente (30 min)',
  preco: '25,97 €',
  itens: 'Vitamina C 1000mg, Paracetamol 500mg',
  local: 'Farmácia Braga Centro',
  data: '04/03/2026 - 14:32',
  tempoEstimado: '12 min',
  distancia: '3,2km',
  estado: 'A caminho',
  estafeta: {
    nome: 'Ricardo Santos',
    iniciais: 'RS',
    avaliacao: '4.9',
    entregas: '325 entregas'
  }
});
</script>

<template>
  <main class="container py-5">
    <h1 class="fw-bold text-brand mb-2">As minhas Encomendas</h1>
    <p class="text-muted mb-5">Acompanhe as suas encomendas em curso e o seu histórico completo.</p>

    <div class="row mb-5 g-4">
      <div class="col-md-4">
        <div class="card border-0 shadow-sm rounded-4 h-100" style="background-color: #f1f8f5;">
          <div class="card-body text-center py-4">
            <h2 class="fw-bold text-brand mb-1"><i class="bi bi-truck me-2"></i>1</h2>
            <p class="text-muted fw-bold mb-0">Em curso</p>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card border-0 shadow-sm rounded-4 h-100 bg-light">
          <div class="card-body text-center py-4">
            <h2 class="fw-bold text-success mb-1"><i class="bi bi-check-circle me-2"></i>1</h2>
            <p class="text-muted fw-bold mb-0">Concluído</p>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card border-0 shadow-sm rounded-4 h-100 bg-light">
          <div class="card-body text-center py-4">
            <h2 class="fw-bold text-danger mb-1"><i class="bi bi-bell me-2"></i>0</h2>
            <p class="text-muted fw-bold mb-0">Alertas</p>
          </div>
        </div>
      </div>
    </div>

    <h4 class="fw-bold text-brand mb-3">Em curso </h4>
    <div class="card border-brand-subtle shadow-sm rounded-4 mb-5">
      <div class="card-body p-4 d-flex justify-content-between align-items-center flex-wrap gap-3">
        <div>
          <div class="d-flex align-items-center gap-3 mb-2">
            <h5 class="fw-bold mb-0">{{ encomendaSelecionada.id }}</h5>
            <span class="badge bg-danger-subtle text-danger rounded-pill px-3 py-2">{{ encomendaSelecionada.tipo }}</span>
          </div>
          <p class="text-muted mb-0"><i class="bi bi-box-seam me-2"></i>{{ encomendaSelecionada.itens }}</p>
          <p class="text-muted small mt-1 mb-0"><i class="bi bi-geo-alt me-2"></i>{{ encomendaSelecionada.local }}</p>
        </div>
        <div class="text-end">
          <h4 class="fw-bold mb-2">{{ encomendaSelecionada.preco }}</h4>
          <p class="text-brand fw-bold mb-3">Estimativa: {{ encomendaSelecionada.tempoEstimado }}</p>
          
          <div class="d-flex gap-2 justify-content-end">
            <button class="btn btn-outline-secondary rounded-pill px-4 fw-bold" data-bs-toggle="modal" data-bs-target="#mapaModal">
              <i class="bi bi-geo-alt"></i> Mapa
            </button>
            <button class="btn btn-brand rounded-pill px-4 fw-bold" data-bs-toggle="modal" data-bs-target="#detalhesModal">
              Detalhes >
            </button>
          </div>
        </div>
      </div>
    </div>

    <h4 class="fw-bold text-muted mb-3">Histórico</h4>
    <div class="card border-0 shadow-sm rounded-4 mb-4 bg-light opacity-75">
      <div class="card-body p-4 d-flex justify-content-between align-items-center flex-wrap gap-3">
        <div>
          <div class="d-flex align-items-center gap-3 mb-2">
            <h5 class="fw-bold text-muted mb-0">GE-2026-0112</h5>
            <span class="badge bg-secondary rounded-pill px-3 py-2">Normal</span>
          </div>
          <p class="text-muted mb-0"><i class="bi bi-box-seam me-2"></i>Ligaduras, Betadine 200ml</p>
          <p class="text-muted small mt-1 mb-0"><i class="bi bi-calendar-check me-2"></i>Entregue a 01/03/2026</p>
        </div>
        <div class="text-end">
          <h4 class="fw-bold text-muted mb-2">12,50 €</h4>
          <span class="text-success fw-bold"><i class="bi bi-check2-all me-1"></i> Entregue</span>
        </div>
      </div>
    </div>

    <div class="modal fade" id="detalhesModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content rounded-4 border-0 shadow-lg">
          <div class="modal-header border-bottom pb-3">
            <div>
              <h4 class="fw-bold mb-0">Encomenda {{ encomendaSelecionada.id }}</h4>
              <p class="text-muted small mb-0 mt-1">Detalhes completos da encomenda</p>
            </div>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body p-4">
            
            <div class="d-flex justify-content-between align-items-center mb-4">
              <span class="badge bg-danger-subtle text-danger rounded-pill px-3 py-2">{{ encomendaSelecionada.tipo }}</span>
              <h4 class="fw-bold mb-0">{{ encomendaSelecionada.preco }}</h4>
            </div>

            <h6 class="fw-bold mb-3">Progresso</h6>
            <div class="d-flex justify-content-between mb-2 text-center" style="font-size: 0.75rem; font-weight: bold; color: #006D4A;">
              <div class="flex-fill border-bottom border-3 border-success pb-1">Pedido aceite</div>
              <div class="flex-fill border-bottom border-3 border-success pb-1 mx-1">Em recolha</div>
              <div class="flex-fill border-bottom border-3 border-success pb-1 mx-1">A caminho</div>
              <div class="flex-fill border-bottom border-3 border-secondary text-muted pb-1">Entregue</div>
            </div>

            <div class="card border border-2 rounded-4 mt-4 mb-3">
              <div class="card-body">
                <h6 class="fw-bold mb-3">Informações do pedido</h6>
                <p class="mb-2 text-muted"><i class="bi bi-box me-2"></i>{{ encomendaSelecionada.itens }}</p>
                <p class="mb-2 text-muted"><i class="bi bi-geo-alt me-2"></i>{{ encomendaSelecionada.local }}</p>
                <p class="mb-3 text-muted"><i class="bi bi-clock me-2"></i>{{ encomendaSelecionada.data }}</p>
                <p class="text-brand fw-bold mb-0">Tempo estimado: {{ encomendaSelecionada.tempoEstimado }}</p>
              </div>
            </div>

            <div class="card border border-2 rounded-4">
              <div class="card-body">
                <h6 class="fw-bold mb-3">Estafeta</h6>
                <div class="d-flex align-items-center mb-3">
                  <div class="bg-secondary text-white rounded-circle d-flex justify-content-center align-items-center me-3" style="width: 45px; height: 45px; font-weight: bold;">
                    {{ encomendaSelecionada.estafeta.iniciais }}
                  </div>
                  <div>
                    <h6 class="fw-bold mb-0">{{ encomendaSelecionada.estafeta.nome }}</h6>
                    <p class="text-muted small mb-0"><i class="bi bi-star-fill text-warning"></i> {{ encomendaSelecionada.estafeta.avaliacao }} · {{ encomendaSelecionada.estafeta.entregas }}</p>
                  </div>
                </div>
                <button class="btn btn-outline-success w-100 rounded-pill fw-bold"><i class="bi bi-telephone me-2"></i> Contactar</button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>

    <div class="modal fade" id="mapaModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content rounded-4 border-0 shadow-lg overflow-hidden">
          
          <div class="modal-header border-bottom bg-white z-3 position-relative pb-3">
            <div>
              <h5 class="fw-bold mb-0">Rastreio {{ encomendaSelecionada.id }}</h5>
              <p class="text-muted small mb-0 mt-1">Acompanhe a entrega em tempo real</p>
            </div>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          
          <div class="modal-body p-0 position-relative bg-light">
            <div class="map-wrapper">
              <iframe 
                src="https://www.openstreetmap.org/export/embed.html?bbox=-8.48%2C41.40%2C-8.35%2C41.48&amp;layer=mapnik&amp;marker=41.44%2C-8.42" 
                style="border: none;">
              </iframe>
            </div>

            <div class="position-absolute bottom-0 start-50 translate-middle-x mb-4 w-75 z-3">
              <div class="card border-0 shadow-lg rounded-pill">
                <div class="card-body p-2 px-4 d-flex justify-content-between align-items-center">
                  <span class="fw-bold text-dark"><i class="bi bi-clock me-1 text-muted"></i> {{ encomendaSelecionada.tempoEstimado }}</span>
                  <span class="fw-bold text-dark"><i class="bi bi-cursor me-1 text-muted"></i> {{ encomendaSelecionada.distancia }}</span>
                  <span class="badge bg-success-subtle text-brand rounded-pill px-3 py-2 fw-bold">{{ encomendaSelecionada.estado }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </main>
</template>

<style scoped>
.text-brand { color: #006D4A; }
.bg-brand { background-color: #006D4A; }
.btn-brand {
  background-color: #006D4A;
  color: white;
  transition: all 0.3s ease;
}
.btn-brand:hover {
  background-color: #004d34;
  color: white;
}
.border-brand-subtle { border: 1px solid #cce2d8; }

/* TRUQUE DO MAPA: Corta as bordas do iframe onde está o "lixo" do OpenStreetMap */
.map-wrapper {
  width: 100%;
  height: 450px; /* Altura visível */
  overflow: hidden; /* Esconde o que sair fora */
  position: relative;
}

.map-wrapper iframe {
  width: 100%;
  height: 550px; /* Maior que a caixa pai */
  margin-top: -50px; /* Puxa o iframe para cima para esconder os links do topo */
  margin-bottom: -50px; /* Esconde os links de baixo */
}
</style>
<script setup>
import { ref } from 'vue';

// Dados da encomenda em curso
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

// Novo estado para controlar o mapa limpo
const showMap = ref(false);

function openMap() {
  showMap.value = true;
}

function closeMap() {
  showMap.value = false;
}
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

    <h4 class="fw-bold text-brand mb-3">Em curso</h4>
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
            <button class="btn btn-outline-secondary rounded-pill px-4 fw-bold" type="button" @click="openMap">
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

    <div v-if="showMap" class="overlay overlay-center" @click.self="closeMap">
      <div class="map-modal map-modal-osm">
        <div class="map-header">
          <div>
            <h3 class="map-title">Rastreio encomenda {{ encomendaSelecionada.id }}</h3>
            <p class="map-subtitle">Acompanhe a entrega em tempo real</p>
          </div>
          <button class="close-btn" @click="closeMap"><i class="bi bi-x-lg"></i></button>
        </div>

        <div class="map-body">
          <div class="map-wrapper">
            <iframe
              src="https://www.openstreetmap.org/export/embed.html?bbox=-8.48%2C41.40%2C-8.35%2C41.48&layer=mapnik&marker=41.44%2C-8.42"
              title="Mapa"
              style="border:none;"
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          <div class="map-floating">
            <div class="map-floating-card">
              <span class="map-chip">
                <i class="bi bi-clock me-1 text-muted"></i>
                {{ encomendaSelecionada.tempoEstimado }}
              </span>

              <span class="map-chip">
                <i class="bi bi-cursor me-1 text-muted"></i>
                {{ encomendaSelecionada.distancia }}
              </span>

              <span class="map-status">
                {{ encomendaSelecionada.estado }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

  </main>
</template>

<style scoped>
/* Estilos Originais */
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

/* =========================================================
   ESTILOS DO NOVO MAPA (Copiados das Reparações)
   ========================================================= */
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.35);
  z-index: 9999; /* Aumentado para garantir que fica por cima da navbar */
  display: flex;
}

.overlay-center {
  justify-content: center;
  align-items: center;
  padding: 12px;
}

.map-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
}

.map-title {
  font-size: 1.8rem;
  font-weight: 900;
  color: #111827;
  margin: 0;
}

.map-subtitle {
  margin: 6px 0 0 0;
  color: rgba(0, 0, 0, 0.55);
  font-weight: 600;
}

.close-btn {
  border: none;
  background: rgba(0, 0, 0, 0.06);
  width: 38px;
  height: 38px;
  border-radius: 10px;
  cursor: pointer;
}

.close-btn:hover {
  background: rgba(0, 0, 0, 0.1);
}

.map-modal-osm {
  width: 520px;
  max-width: calc(100% - 24px);
  background: #fff;
  border-radius: 18px;
  padding: 18px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.22);
}

.map-body {
  position: relative;
  margin-top: 14px;
  border-radius: 18px;
  overflow: hidden;
  background: #f3f4f6;
}

.map-wrapper {
  width: 100%;
  height: 520px;
  overflow: hidden;
  position: relative;
}

.map-wrapper iframe {
  width: 100%;
  height: 620px;
  margin-top: -50px;
  margin-bottom: -50px;
}

.map-floating {
  position: absolute;
  left: 50%;
  bottom: 18px;
  transform: translateX(-50%);
  width: min(90%, 460px);
  z-index: 5;
}

.map-floating-card {
  background: #fff;
  border-radius: 999px;
  box-shadow: 0 18px 30px rgba(0, 0, 0, 0.18);
  padding: 10px 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
}

.map-chip {
  font-weight: 900;
  color: #111827;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  white-space: nowrap;
}

.map-status {
  font-weight: 900;
  color: #0b6b4a; /* Teu verde brand */
  background: rgba(0, 109, 74, 0.1); /* Fundo claro do brand */
  border: 1px solid rgba(0, 109, 74, 0.22);
  padding: 6px 10px;
  border-radius: 999px;
  white-space: nowrap;
}

@media (max-width: 768px) {
  .map-modal-osm { width: calc(100% - 20px); }
  .map-floating-card { flex-direction: column; border-radius: 16px; text-align: center; }
}
</style>
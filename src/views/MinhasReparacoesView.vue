<template>
  <main class="page">
    <div class="container py-4">
      <!-- Título -->
      <h1 class="title mb-1">As minhas Reparações</h1>
      <p class="subtitle mb-4">
        Acompanhe as suas reparações em curso e o seu histórico completo.
      </p>

      <!-- Stats -->
      <div class="stats">
        <div class="stat-card">
          <div class="stat-ico"><i class="bi bi-truck"></i></div>
          <div class="stat-num">{{ inProgress.length }}</div>
          <div class="stat-label">Em curso</div>
        </div>

        <div class="stat-card">
          <div class="stat-ico ok"><i class="bi bi-check2-circle"></i></div>
          <div class="stat-num">{{ completed.length }}</div>
          <div class="stat-label">Concluído</div>
        </div>

        <div class="stat-card">
          <div class="stat-ico urgent"><i class="bi bi-bell"></i></div>
          <div class="stat-num">{{ urgentCount }}</div>
          <div class="stat-label">Urgente</div>
        </div>

        <div class="stat-card">
          <div class="stat-ico star"><i class="bi bi-star-fill"></i></div>
          <div class="stat-num">{{ avgRating.toFixed(1) }}</div>
          <div class="stat-label">Avaliação</div>
        </div>
      </div>

      <!-- EM CURSO -->
      <div class="section-row">
        <h2 class="section-title">Em curso ({{ inProgress.length }})</h2>
        <div class="section-line red"></div>
      </div>

      <div v-if="inProgress.length === 0" class="empty">
        Ainda não tens reparações em curso.
      </div>

      <div v-else class="list mt-3">
        <article
          v-for="r in inProgress"
          :key="r.id"
          class="repair-card"
          :class="cardBorderClass(r)"
        >
          <!-- topo -->
          <div class="repair-top">
            <div class="code-pill">
              <div class="code">{{ r.code }}</div>
              <span class="pill" :class="pillClass(r)">{{ pillText(r) }}</span>
            </div>
            <div class="price">{{ formatPrice(r.price) }}</div>
          </div>

          <!-- infos -->
          <div class="repair-info">
            <div class="info-row">
              <i class="bi bi-tools"></i>
              <span>{{ r.equipamento }}</span>
            </div>
            <div class="info-row">
              <i class="bi bi-geo-alt"></i>
              <span>{{ r.local }}</span>
            </div>
            <div class="info-row">
              <i class="bi bi-clock"></i>
              <span>{{ formatDate(r.createdAt) }}</span>
            </div>
          </div>

          <!-- progresso -->
          <div class="progress-row">
            <div class="track">
              <span class="step" :class="{ on: r.statusStep >= 1 }">Pedido aceite</span>
              <span class="sep">•</span>
              <span class="step" :class="{ on: r.statusStep >= 2 }">Em recolha</span>
              <span class="sep">•</span>
              <span class="step" :class="{ on: r.statusStep >= 3 }">A caminho</span>
              <span class="sep">•</span>
              <span class="step" :class="{ on: r.statusStep >= 4 }">Em reparação</span>
              <span class="sep">•</span>
              <span class="step" :class="{ on: r.statusStep >= 5 }">Concluída</span>
            </div>

            <div class="eta">Estimativa: <strong>{{ r.eta }}</strong></div>
          </div>

          <!-- técnico + ações -->
          <div class="repair-bottom">
            <div class="tech">
              <div class="avatar">{{ initials(r.techName) }}</div>
              <div class="tech-txt">
                <div class="tech-name">{{ r.techName }}</div>
                <div class="tech-meta">
                  <i class="bi bi-star-fill"></i> {{ r.techRating }} · {{ r.techJobs }} reparações
                </div>
              </div>
            </div>

            <div class="actions">
              <button class="btn btn-outline" type="button" @click="contact(r)">
                <i class="bi bi-chat-dots"></i> Contactar
              </button>

              <button class="btn btn-light" type="button" @click="openMapModal(r)">
                <i class="bi bi-geo"></i> Ver no mapa
              </button>

              <button class="btn btn-light" type="button" @click="openDetails(r)">
                Detalhes <i class="bi bi-chevron-right"></i>
              </button>

              <button class="btn btn-success-custom" type="button" @click="markAsCompleted(r)">
                <i class="bi bi-check2-circle"></i> Marcar como concluída
              </button>
            </div>
          </div>
        </article>
      </div>

      <!-- HISTÓRICO -->
      <div class="section-row mt-5">
        <h2 class="section-title hist">Histórico ({{ completed.length }})</h2>
        <div class="section-line gray"></div>
      </div>

      <div v-if="completed.length === 0" class="empty">
        Ainda não tens reparações concluídas.
      </div>

      <div v-else class="list mt-3">
        <article v-for="r in completed" :key="r.id" class="repair-card history">
          <div class="repair-top">
            <div class="code-pill">
              <div class="code">{{ r.code }}</div>
              <span class="pill normal">Concluída</span>
            </div>
            <div class="price">{{ formatPrice(r.price) }}</div>
          </div>

          <div class="repair-info">
            <div class="info-row">
              <i class="bi bi-tools"></i>
              <span>{{ r.equipamento }}</span>
            </div>
            <div class="info-row">
              <i class="bi bi-geo-alt"></i>
              <span>{{ r.local }}</span>
            </div>
            <div class="info-row">
              <i class="bi bi-check2-circle"></i>
              <span>Concluída em {{ formatDate(r.completedAt || r.createdAt) }}</span>
            </div>
          </div>

          <div class="history-bottom">
            <div class="tech">
              <div class="avatar">{{ initials(r.techName) }}</div>
              <div class="tech-txt">
                <div class="tech-name">{{ r.techName }}</div>
                <div class="tech-meta">
                  <i class="bi bi-star-fill"></i> {{ r.techRating }} · {{ r.techJobs }} reparações
                </div>
              </div>
            </div>

            <div class="history-right">
              <div class="stars">
                <i v-for="n in 5" :key="n" class="bi" :class="n <= (r.rating || 0) ? 'bi-star-fill' : 'bi-star'"></i>
              </div>

              <div class="actions">
                <button class="btn btn-outline" type="button" @click="repeatRepair(r)">
                  Repetir pedido
                </button>
                <button class="btn btn-light" type="button" @click="openDetails(r)">
                  Detalhes <i class="bi bi-chevron-right"></i>
                </button>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>

    <!-- DRAWER DETALHES (direita) -->
    <div v-if="showDetails" class="overlay overlay-right" @click.self="closeDetails">
      <aside class="details-drawer">
        <div class="drawer-header">
          <div>
            <h3 class="drawer-title">Reparação {{ selectedRepair?.code }}</h3>
            <p class="drawer-subtitle">Detalhes completos da reparação</p>
          </div>
          <button class="close-btn" @click="closeDetails"><i class="bi bi-x-lg"></i></button>
        </div>

        <div v-if="selectedRepair" class="drawer-body">
          <div class="drawer-top-row">
            <span class="pill" :class="pillClass(selectedRepair)">{{ pillText(selectedRepair) }}</span>
            <div class="drawer-price">{{ formatPrice(selectedRepair.price) }}</div>
          </div>

          <div class="drawer-section">
            <h4 class="drawer-section-title">Progresso</h4>
            <div class="progress-bars">
              <div class="progress-step">
                <div class="bar" :class="{ active: selectedRepair.statusStep >= 1 }"></div>
                <span>Pedido aceite</span>
              </div>
              <div class="progress-step">
                <div class="bar" :class="{ active: selectedRepair.statusStep >= 2 }"></div>
                <span>Em recolha</span>
              </div>
              <div class="progress-step">
                <div class="bar" :class="{ active: selectedRepair.statusStep >= 3 }"></div>
                <span>A caminho</span>
              </div>
              <div class="progress-step">
                <div class="bar" :class="{ active: selectedRepair.statusStep >= 4 }"></div>
                <span>Em reparação</span>
              </div>
              <div class="progress-step">
                <div class="bar" :class="{ active: selectedRepair.statusStep >= 5 }"></div>
                <span>Concluída</span>
              </div>
            </div>
          </div>

          <div class="drawer-card">
            <h4 class="drawer-card-title">Informações da reparação</h4>
            <div class="drawer-info-row"><i class="bi bi-tools"></i><span>{{ selectedRepair.equipamento }}</span></div>
            <div class="drawer-info-row"><i class="bi bi-geo-alt"></i><span>{{ selectedRepair.local }}</span></div>
            <div class="drawer-info-row"><i class="bi bi-clock"></i><span>{{ formatDate(selectedRepair.createdAt) }}</span></div>
            <div class="drawer-eta">Tempo estimado: {{ selectedRepair.eta }}</div>
          </div>

          <div class="drawer-card">
            <h4 class="drawer-card-title">Técnico responsável</h4>
            <div class="tech tech-large">
              <div class="avatar">{{ initials(selectedRepair.techName) }}</div>
              <div class="tech-txt">
                <div class="tech-name">{{ selectedRepair.techName }}</div>
                <div class="tech-meta">
                  <i class="bi bi-star-fill"></i> {{ selectedRepair.techRating }} · {{ selectedRepair.techJobs }} reparações
                </div>
              </div>
            </div>

            <button class="btn btn-outline btn-full mt-3" @click="contact(selectedRepair)">
              <i class="bi bi-telephone"></i> Contactar
            </button>
          </div>

          <button
            v-if="selectedRepair.status !== 'concluido'"
            class="btn btn-success-custom btn-full mt-3"
            @click="markAsCompleted(selectedRepair)"
          >
            <i class="bi bi-check2-circle"></i> Marcar reparação como concluída
          </button>
        </div>
      </aside>
    </div>

    <!-- MODAL MAPA (igual ao mockup do Orders) -->
    <div v-if="showMap" class="overlay overlay-center" @click.self="closeMap">
      <div class="map-modal map-modal-osm">
        <div class="map-header">
          <div>
            <h3 class="map-title">Rastreio reparação {{ selectedRepair?.code }}</h3>
            <p class="map-subtitle">Acompanhe a reparação em tempo real</p>
          </div>
          <button class="close-btn" @click="closeMap"><i class="bi bi-x-lg"></i></button>
        </div>

        <div class="map-body">
          <div class="map-wrapper">
            <iframe
              :src="osmSrc(selectedRepair)"
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
                {{ selectedRepair?.eta || "12 min" }}
              </span>

              <span class="map-chip">
                <i class="bi bi-cursor me-1 text-muted"></i>
                {{ selectedRepair?.distancia || "3,2km" }}
              </span>

              <span class="map-status">
                {{ statusLabel(selectedRepair) }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <footer class="footer-bar">
      <div class="container footer-inner">
        <p class="footer-note">© 2026 Health Delivery</p>
      </div>
    </footer>
  </main>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";

const STORAGE_KEY = "hd_repairs";
const repairs = ref([]);

const showDetails = ref(false);
const showMap = ref(false);
const selectedRepair = ref(null);

function seedData() {
  const now = new Date();

  const mk = (i, overrides = {}) => ({
    id: crypto.randomUUID(),
    code: `GE-2026-0${846 + i}`,
    equipamento:
      i === 1
        ? "Monitor cardíaco, diagnóstico e substituição de sensor"
        : i === 2
        ? "Bomba de infusão, verificação e reparação técnica"
        : "Ventilador médico, manutenção preventiva",
    local:
      i === 1 ? "Hospital de Braga"
      : i === 2 ? "Clínica de São Vítor"
      : "Hospital de Guimarães",
    createdAt: new Date(now.getTime() - i * 1000 * 60 * 80).toISOString(),
    price: i === 1 ? 259 : i === 2 ? 140.9 : 100,
    prioridade: i === 1 ? 5 : i === 2 ? 4 : 2,
    status: i === 3 ? "concluido" : "em_curso",
    statusStep: i === 1 ? 3 : i === 2 ? 2 : 5,
    eta: i === 1 ? "12 min" : i === 2 ? "38 min" : "—",
    distancia: i === 1 ? "3,2km" : i === 2 ? "6,8km" : "—",
    techName: i === 1 ? "Ricardo Santos" : i === 2 ? "Ana Costa" : "André Pereira",
    techRating: i === 1 ? 4.9 : i === 2 ? 4.7 : 4.8,
    techJobs: i === 1 ? 325 : i === 2 ? 198 : 431,
    rating: i === 3 ? 5 : null,
    completedAt: i === 3 ? new Date(now.getTime() - 1000 * 60 * 60 * 24).toISOString() : null,
    ...overrides,
  });

  return [mk(1), mk(2), mk(3)];
}

function saveRepairs() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(repairs.value));
}

function load() {
  const raw = localStorage.getItem(STORAGE_KEY);

  if (!raw) {
    const seed = seedData();
    repairs.value = seed;
    saveRepairs();
    return;
  }

  try {
    repairs.value = JSON.parse(raw);
  } catch {
    repairs.value = [];
  }
}

onMounted(load);

const inProgress = computed(() => repairs.value.filter((r) => r.status !== "concluido"));
const completed = computed(() => repairs.value.filter((r) => r.status === "concluido"));
const urgentCount = computed(() => repairs.value.filter((r) => r.prioridade >= 5 && r.status !== "concluido").length);

const avgRating = computed(() => {
  const rated = repairs.value.filter((r) => typeof r.rating === "number");
  if (!rated.length) return 4.7;
  return rated.reduce((a, r) => a + r.rating, 0) / rated.length;
});

function formatDate(iso) {
  const d = new Date(iso);
  return d.toLocaleString("pt-PT", {
    day: "2-digit", month: "2-digit", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });
}

function formatPrice(p) {
  return new Intl.NumberFormat("pt-PT", { style: "currency", currency: "EUR" }).format(p);
}

function initials(name) {
  return name.split(" ").slice(0, 2).map((x) => x[0]?.toUpperCase()).join("");
}

function pillText(r) {
  if (r.status === "concluido") return "Concluída";
  if (r.prioridade >= 5) return "Urgente (30 min)";
  if (r.prioridade === 4) return "Prioritária (1h)";
  return "Normal (2h)";
}

function pillClass(r) {
  if (r.status === "concluido") return "normal";
  if (r.prioridade >= 5) return "urgent";
  if (r.prioridade === 4) return "prio";
  return "normal";
}

function cardBorderClass(r) {
  if (r.prioridade >= 5) return "border-urgent";
  if (r.prioridade === 4) return "border-prio";
  return "border-normal";
}

function openDetails(repair) {
  selectedRepair.value = repair;
  showDetails.value = true;
}
function closeDetails() {
  showDetails.value = false;
}

function openMapModal(repair) {
  selectedRepair.value = repair;
  showMap.value = true;
}
function closeMap() {
  showMap.value = false;
}

function markAsCompleted(repair) {
  const idx = repairs.value.findIndex((r) => r.id === repair.id);
  if (idx === -1) return;

  repairs.value[idx] = {
    ...repairs.value[idx],
    status: "concluido",
    statusStep: 5,
    eta: "0 min",
    completedAt: new Date().toISOString(),
    rating: repairs.value[idx].rating ?? 5,
  };

  saveRepairs();

  // atualiza selecionado se estiver aberto
  if (selectedRepair.value?.id === repair.id) selectedRepair.value = repairs.value[idx];

  showMap.value = false;
  showDetails.value = false;
}

function repeatRepair(r) {
  alert(`Repetir pedido baseado em ${r.code}`);
}

function contact(r) {
  alert(`Contactar técnico: ${r.techName}`);
}

/* ===== MAPA (igual ao mockup do Orders) ===== */
function statusLabel(r) {
  if (!r) return "";
  if (r.status === "concluido") return "Concluída";
  if (r.statusStep >= 4) return "Em reparação";
  if (r.statusStep >= 3) return "A caminho";
  if (r.statusStep >= 2) return "Em recolha";
  return "Pedido aceite";
}

/* OpenStreetMap embed (podes trocar bbox/marker depois) */
function osmSrc() {
  return "https://www.openstreetmap.org/export/embed.html?bbox=-8.48%2C41.40%2C-8.35%2C41.48&layer=mapnik&marker=41.44%2C-8.42";
}
</script>

<style scoped>
.page {
  background: #fff;
  min-height: 100vh;
}

.title {
  color: #0b6b4a;
  font-weight: 900;
  font-size: 2.3rem;
}

.subtitle {
  color: rgba(0, 0, 0, 0.55);
  font-size: 1rem;
}

.stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 22px;
}

@media (max-width: 900px) {
  .stats {
    grid-template-columns: repeat(2, 1fr);
  }
}

.stat-card {
  background: #fff;
  border-radius: 14px;
  border: 1px solid rgba(0, 0, 0, 0.08);
  padding: 18px 14px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.07);
}

.stat-ico {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  display: grid;
  place-items: center;
  background: rgba(0, 109, 74, 0.1);
  color: #006d4a;
  font-size: 18px;
}

.stat-ico.ok {
  background: rgba(34, 197, 94, 0.12);
  color: #16a34a;
}

.stat-ico.urgent {
  background: rgba(239, 68, 68, 0.12);
  color: #dc2626;
}

.stat-ico.star {
  background: rgba(245, 158, 11, 0.14);
  color: #d97706;
}

.stat-num {
  font-weight: 900;
  font-size: 1.4rem;
}

.stat-label {
  color: rgba(0, 0, 0, 0.6);
  font-weight: 700;
}

.section-row {
  display: flex;
  align-items: center;
  gap: 12px;
}

.section-title {
  color: #71a35e;
  font-size: 1.8rem;
  font-weight: 900;
  margin: 0;
}

.section-title.hist {
  color: rgba(0, 0, 0, 0.5);
}

.section-line {
  flex: 1;
  height: 2px;
  border-radius: 999px;
}

.section-line.red {
  background: #dc2626;
}

.section-line.gray {
  background: rgba(0, 0, 0, 0.16);
}

.empty {
  margin-top: 10px;
  padding: 16px;
  border-radius: 14px;
  border: 1px dashed rgba(0, 0, 0, 0.18);
  color: rgba(0, 0, 0, 0.6);
}

.list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.repair-card {
  background: #fff;
  border-radius: 16px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  padding: 18px;
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.04);
}

.border-urgent {
  border-top: 3px solid #ef4444;
}

.border-prio {
  border-top: 3px solid #f59e0b;
}

.border-normal {
  border-top: 3px solid rgba(0, 0, 0, 0.2);
}

.repair-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}

.code-pill {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.code {
  font-weight: 900;
  font-size: 1.2rem;
  color: #111827;
}

.price {
  font-weight: 900;
  font-size: 1.2rem;
}

.pill {
  font-size: 12px;
  font-weight: 900;
  padding: 6px 12px;
  border-radius: 999px;
  border: 1px solid rgba(0, 0, 0, 0.08);
}

.pill.urgent {
  background: rgba(239, 68, 68, 0.14);
  color: #b91c1c;
}

.pill.prio {
  background: rgba(245, 158, 11, 0.16);
  color: #92400e;
}

.pill.normal {
  background: rgba(0, 109, 74, 0.1);
  color: #0b6b4a;
}

.repair-info {
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.info-row {
  display: flex;
  align-items: center;
  gap: 10px;
  color: rgba(0, 0, 0, 0.68);
  font-weight: 700;
}

.progress-row {
  margin-top: 14px;
  display: flex;
  justify-content: space-between;
  gap: 10px;
  flex-wrap: wrap;
}

.track {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
}

.step {
  font-size: 12px;
  font-weight: 900;
  color: rgba(0, 0, 0, 0.35);
}

.step.on {
  color: #0b6b4a;
}

.sep {
  color: rgba(0, 0, 0, 0.28);
}

.eta {
  color: #0b6b4a;
  font-weight: 900;
}

.repair-bottom,
.history-bottom {
  margin-top: 16px;
  padding-top: 14px;
  border-top: 1px solid rgba(0, 0, 0, 0.08);
  display: flex;
  justify-content: space-between;
  gap: 14px;
  flex-wrap: wrap;
}

.tech {
  display: flex;
  align-items: center;
  gap: 10px;
}

.tech-large {
  align-items: center;
}

.avatar {
  width: 38px;
  height: 38px;
  border-radius: 999px;
  display: grid;
  place-items: center;
  background: rgba(0, 109, 74, 0.1);
  color: #0b6b4a;
  font-weight: 900;
}

.tech-name {
  font-weight: 900;
  color: #111827;
}

.tech-meta {
  font-size: 12px;
  color: rgba(0, 0, 0, 0.58);
  font-weight: 800;
}

.tech-meta i {
  color: #f59e0b;
}

.actions {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.history-right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 12px;
}

.stars {
  color: #f59e0b;
  display: flex;
  gap: 4px;
}

.btn {
  border-radius: 12px;
  font-weight: 900;
  padding: 9px 12px;
  border: 1px solid rgba(0, 0, 0, 0.12);
  background: #fff;
  cursor: pointer;
  transition: 0.2s ease;
}

.btn:hover {
  transform: translateY(-1px);
}

.btn-light {
  background: rgba(0, 0, 0, 0.03);
}

.btn-outline {
  border-color: rgba(0, 109, 74, 0.25);
  background: rgba(0, 109, 74, 0.08);
  color: #0b6b4a;
}

.btn-success-custom {
  border-color: #0b6b4a;
  background: #0b6b4a;
  color: #fff;
}

.btn-full {
  width: 100%;
}

/* ===== Overlay base + variantes ===== */
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.35);
  z-index: 999;
  display: flex;
}

.overlay-right {
  justify-content: flex-end;
  align-items: stretch;
}

.overlay-center {
  justify-content: center;
  align-items: center;
  padding: 12px;
}

/* ===== Drawer detalhes ===== */
.details-drawer {
  width: 430px;
  max-width: 100%;
  height: 100vh;
  background: #fff;
  box-shadow: -8px 0 30px rgba(0, 0, 0, 0.18);
  padding: 20px;
  overflow-y: auto;
}

.drawer-header,
.map-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
}

.drawer-title,
.map-title {
  font-size: 1.8rem;
  font-weight: 900;
  color: #111827;
  margin: 0;
}

.drawer-subtitle,
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

.drawer-body {
  margin-top: 20px;
}

.drawer-top-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}

.drawer-price {
  font-size: 1.7rem;
  font-weight: 900;
  color: #111827;
}

.drawer-section {
  margin-top: 24px;
}

.drawer-section-title,
.drawer-card-title {
  font-weight: 900;
  color: #111827;
  margin-bottom: 12px;
}

.progress-bars {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 8px;
}

.progress-step {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.progress-step .bar {
  height: 8px;
  border-radius: 999px;
  background: #d1d5db;
}

.progress-step .bar.active {
  background: #0b6b4a;
}

.progress-step span {
  font-size: 11px;
  font-weight: 800;
  color: rgba(0, 0, 0, 0.55);
}

.drawer-card {
  margin-top: 20px;
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 16px;
  padding: 16px;
}

.drawer-info-row {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
  color: rgba(0, 0, 0, 0.72);
  font-weight: 700;
}

.drawer-eta {
  margin-top: 8px;
  color: #0b6b4a;
  font-weight: 900;
}

/* ===== MAPA (OpenStreetMap) igual ao mockup ===== */
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

/* “corta” as barras do OpenStreetMap */
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

/* pílula flutuante */
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
  color: #0b6b4a;
  background: rgba(0, 109, 74, 0.1);
  border: 1px solid rgba(0, 109, 74, 0.22);
  padding: 6px 10px;
  border-radius: 999px;
  white-space: nowrap;
}

/* footer */
.footer-bar {
  background: #006d4a;
  padding: 18px 0;
  margin-top: 40px;
}

.footer-inner {
  display: flex;
  justify-content: center;
}

.footer-note {
  margin: 0;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 800;
  font-size: 12px;
}

@media (max-width: 768px) {
  .title { font-size: 1.8rem; }
  .progress-bars { grid-template-columns: 1fr; }
  .details-drawer { width: 100%; }
  .map-modal-osm { width: calc(100% - 20px); }
}
</style>
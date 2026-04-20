<template>
  <main class="page">
    <div class="container py-4">
      <!-- Título -->
      <h1 class="title mb-0">As minhas Reparações</h1>
      <p class="subtitle mb-4">Acompanhe as suas reparações em curso e o seu histórico completo.</p>

      <!-- Stats -->
      <div class="stats">
        <div class="stat-card">
          <div class="stat-icon"><i class="bi bi-truck"></i></div>
          <div class="stat-num">{{ inProgress.length }}</div>
          <div class="stat-label">Em curso</div>
        </div>

        <div class="stat-card">
          <div class="stat-icon"><i class="bi bi-check2-circle"></i></div>
          <div class="stat-num">{{ completed.length }}</div>
          <div class="stat-label">Concluído</div>
        </div>

        <div class="stat-card">
          <div class="stat-icon urgent"><i class="bi bi-bell"></i></div>
          <div class="stat-num">{{ urgentCount }}</div>
          <div class="stat-label">Urgente</div>
        </div>

        <div class="stat-card">
          <div class="stat-icon star"><i class="bi bi-star-fill"></i></div>
          <div class="stat-num">{{ avgRating.toFixed(1) }}</div>
          <div class="stat-label">Avaliação</div>
        </div>
      </div>

      <!-- EM CURSO -->
      <div class="section-head">
        <h2 class="section-title">Em curso ({{ inProgress.length }})</h2>
        <div class="section-line red"></div>
      </div>

      <div v-if="inProgress.length === 0" class="empty">
        Ainda não tens reparações em curso.
      </div>

      <div v-else class="list">
        <article v-for="r in inProgress" :key="r.id" class="repair-card">
          <div class="repair-top">
            <div class="left">
              <div class="code">{{ r.code }}</div>
              <span class="pill" :class="pillClass(r)">
                {{ pillText(r) }}
              </span>
            </div>

            <div class="price">{{ formatPrice(r.price) }}</div>
          </div>

          <div class="repair-info">
            <div class="info-row">
              <i class="bi bi-capsule"></i>
              <span class="muted">{{ r.equipamento }}</span>
            </div>

            <div class="info-row">
              <i class="bi bi-geo-alt"></i>
              <span class="muted">{{ r.local }}</span>
            </div>

            <div class="info-row">
              <i class="bi bi-clock"></i>
              <span class="muted">{{ formatDate(r.createdAt) }}</span>
            </div>
          </div>

          <div class="progress">
            <div class="bar">
              <span :class="{ on: true }">Pedido</span>
              <span :class="{ on: true }">Em análise</span>
              <span :class="{ on: r.statusStep >= 3 }">Recolha</span>
              <span :class="{ on: r.statusStep >= 4 }">Reparação</span>
              <span :class="{ on: r.statusStep >= 5 }">Entregue</span>
            </div>
            <div class="eta">Estimativa: <strong>{{ r.eta }}</strong></div>
          </div>

          <div class="repair-bottom">
            <div class="tech">
              <div class="avatar">{{ initials(r.techName) }}</div>
              <div>
                <div class="tech-name">{{ r.techName }}</div>
                <div class="tech-meta">
                  <i class="bi bi-star-fill"></i> {{ r.techRating }} · {{ r.techJobs }} entregas
                </div>
              </div>
            </div>

            <div class="actions">
              <button class="btn btn-outline" type="button" @click="contact(r)">
                <i class="bi bi-chat-dots"></i> Contactar
              </button>
              <button class="btn btn-light" type="button" @click="openMap(r)">
                <i class="bi bi-geo"></i> Ver no mapa
              </button>
              <button class="btn btn-light" type="button" @click="details(r)">
                Detalhes <i class="bi bi-chevron-right"></i>
              </button>
            </div>
          </div>
        </article>
      </div>

      <!-- HISTÓRICO -->
      <div class="section-head mt-5">
        <h2 class="section-title">Histórico ({{ completed.length }})</h2>
        <div class="section-line gray"></div>
      </div>

      <div v-if="completed.length === 0" class="empty">
        Ainda não tens reparações concluídas.
      </div>

      <div v-else class="list">
        <article v-for="r in completed" :key="r.id" class="repair-card">
          <div class="repair-top">
            <div class="left">
              <div class="code">{{ r.code }}</div>
              <span class="pill normal">Concluído</span>
            </div>
            <div class="price">{{ formatPrice(r.price) }}</div>
          </div>

          <div class="repair-info">
            <div class="info-row">
              <i class="bi bi-capsule"></i>
              <span class="muted">{{ r.equipamento }}</span>
            </div>

            <div class="info-row">
              <i class="bi bi-geo-alt"></i>
              <span class="muted">{{ r.local }}</span>
            </div>

            <div class="info-row">
              <i class="bi bi-check2-circle"></i>
              <span class="muted">Entregue em {{ formatDate(r.completedAt || r.createdAt) }}</span>
            </div>

            <div class="stars">
              <i v-for="n in 5" :key="n" class="bi" :class="n <= (r.rating || 0) ? 'bi-star-fill' : 'bi-star'"></i>
            </div>
          </div>

          <div class="repair-bottom">
            <div></div>
            <div class="actions">
              <button class="btn btn-outline" type="button" @click="repeat(r)">
                Repetir encomenda
              </button>
              <button class="btn btn-light" type="button" @click="details(r)">
                Detalhes <i class="bi bi-chevron-right"></i>
              </button>
            </div>
          </div>
        </article>
      </div>
    </div>

    <!-- Barra final verde -->
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

/** seed (para aparecer logo bonito se não houver pedidos) */
function seedData() {
  const now = new Date();
  const mk = (i, overrides = {}) => ({
    id: crypto.randomUUID(),
    code: `GE-2026-0${840 + i}`,
    equipamento: i === 1 ? "Ventilador Respiratório VS100" : i === 2 ? "Monitor de Sinais Vitais MSV-20" : "Cama Hospitalar Elétrica CH-2",
    local: i === 1 ? "Farmácia Braga Centro" : i === 2 ? "Farmácia São Vítor" : "Farmácia Central",
    createdAt: new Date(now.getTime() - i * 1000 * 60 * 80).toISOString(),
    price: i === 1 ? 259 : i === 2 ? 140.9 : 100,
    prioridade: i === 1 ? 5 : i === 2 ? 4 : 2,
    status: i === 3 ? "concluido" : "em_curso",
    statusStep: i === 1 ? 2 : i === 2 ? 3 : 5,
    eta: i === 1 ? "12 min" : i === 2 ? "38 min" : "—",
    techName: i === 1 ? "Ricardo Santos" : i === 2 ? "Ana Costa" : "André Pereira",
    techRating: i === 1 ? 4.9 : i === 2 ? 4.7 : 4.8,
    techJobs: i === 1 ? 325 : i === 2 ? 198 : 431,
    rating: i === 3 ? 5 : null,
    completedAt: i === 3 ? new Date(now.getTime() - 1000 * 60 * 60 * 24).toISOString() : null,
    ...overrides,
  });

  return [mk(1), mk(2), mk(3)];
}

function load() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    const seed = seedData();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seed));
    repairs.value = seed;
    return;
  }
  try {
    repairs.value = JSON.parse(raw);
  } catch {
    repairs.value = [];
  }
}

onMounted(load);

const inProgress = computed(() => repairs.value.filter(r => r.status !== "concluido"));
const completed = computed(() => repairs.value.filter(r => r.status === "concluido"));

const urgentCount = computed(() => repairs.value.filter(r => r.prioridade >= 5 && r.status !== "concluido").length);

const avgRating = computed(() => {
  const rated = repairs.value.filter(r => typeof r.rating === "number");
  if (!rated.length) return 4.7;
  const sum = rated.reduce((a, r) => a + r.rating, 0);
  return sum / rated.length;
});

function formatDate(iso) {
  const d = new Date(iso);
  return d.toLocaleString("pt-PT", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" });
}

function formatPrice(p) {
  return new Intl.NumberFormat("pt-PT", { style: "currency", currency: "EUR" }).format(p);
}

function initials(name) {
  return name.split(" ").slice(0, 2).map(x => x[0]?.toUpperCase()).join("");
}

function pillText(r) {
  if (r.prioridade >= 5) return "Urgente (30 min)";
  if (r.prioridade === 4) return "Prioritário (1h)";
  return "Normal (2h)";
}

function pillClass(r) {
  if (r.prioridade >= 5) return "urgent";
  if (r.prioridade === 4) return "prio";
  return "normal";
}

/** ações (mock) */
function contact(r) { alert(`Contactar técnico: ${r.techName}`); }
function openMap(r) { alert(`Abrir mapa para: ${r.local}`); }
function details(r) { alert(`Detalhes do pedido ${r.code}`); }
function repeat(r) { alert(`Repetir pedido baseado em ${r.code}`); }
</script>

<style scoped>
.page{ background:#E1F2D1; min-height:100vh; }
.title{ color:#0b6b4a; font-weight:900; letter-spacing:-0.5px; }
.subtitle{ color:rgba(0,0,0,.55); }

.stats{
  display:grid;
  grid-template-columns: repeat(4, 1fr);
  gap:14px;
  margin-bottom: 18px;
}
@media (max-width: 900px){
  .stats{ grid-template-columns: repeat(2, 1fr); }
}

.stat-card{
  background:#fff;
  border-radius:14px;
  border:1px solid rgba(0,0,0,.06);
  padding:14px 14px;
  display:grid;
  grid-template-columns: 40px 1fr;
  grid-template-rows: auto auto;
  column-gap:10px;
  align-items:center;
}
.stat-icon{
  width:40px; height:40px;
  border-radius:12px;
  display:grid; place-items:center;
  background: rgba(0,109,74,.10);
  color:#006d4a;
  grid-row: 1 / span 2;
  font-size:18px;
}
.stat-icon.urgent{ background: rgba(255,59,59,.12); color:#d93025; }
.stat-icon.star{ background: rgba(255,193,7,.18); color:#b78100; }

.stat-num{ font-weight:900; font-size:18px; line-height:1; }
.stat-label{ color:rgba(0,0,0,.55); font-weight:700; font-size:12px; }

.section-head{ margin-top: 10px; }
.section-title{ color:#0b6b4a; font-weight:900; font-size:16px; margin: 8px 0 6px; }
.section-line{ height:2px; border-radius:999px; width:100%; background:#ddd; }
.section-line.red{ background:#e11d48; }
.section-line.gray{ background:rgba(0,0,0,.12); }

.empty{
  margin-top: 10px;
  padding: 18px;
  background: rgba(255,255,255,.65);
  border: 1px dashed rgba(0,0,0,.15);
  border-radius: 14px;
  color: rgba(0,0,0,.60);
  font-weight: 700;
}

.list{ display:flex; flex-direction:column; gap:14px; margin-top: 10px; }

.repair-card{
  background:#fff;
  border-radius: 16px;
  border: 1px solid rgba(0,0,0,.06);
  padding: 14px;
}

.repair-top{
  display:flex;
  justify-content: space-between;
  align-items:center;
  gap:12px;
}

.left{ display:flex; align-items:center; gap:12px; flex-wrap:wrap; }
.code{ font-weight: 900; color:#1f2937; }

.price{ font-weight:900; color:#111827; }

.pill{
  font-size:12px;
  font-weight:900;
  padding:6px 10px;
  border-radius:999px;
  border:1px solid rgba(0,0,0,.08);
  background:#f3f4f6;
}
.pill.urgent{ background: rgba(239,68,68,.12); border-color: rgba(239,68,68,.25); color:#b91c1c; }
.pill.prio{ background: rgba(245,158,11,.14); border-color: rgba(245,158,11,.30); color:#92400e; }
.pill.normal{ background: rgba(0,109,74,.10); border-color: rgba(0,109,74,.18); color:#0b6b4a; }

.repair-info{
  margin-top: 10px;
  display:flex;
  flex-direction: column;
  gap: 6px;
}

.info-row{
  display:flex;
  align-items:center;
  gap:10px;
}
.info-row i{ color: rgba(0,0,0,.45); }
.muted{ color: rgba(0,0,0,.62); font-weight: 700; }

.progress{
  margin-top: 12px;
  display:flex;
  justify-content: space-between;
  align-items:center;
  gap: 10px;
  flex-wrap: wrap;
}
.bar{
  display:flex;
  gap: 6px;
  flex-wrap: wrap;
}
.bar span{
  padding: 6px 10px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 900;
  background: rgba(0,0,0,.06);
  color: rgba(0,0,0,.45);
}
.bar span.on{
  background: rgba(0,109,74,.12);
  color: #0b6b4a;
}

.eta{ color: rgba(0,0,0,.55); font-weight: 800; }

.repair-bottom{
  margin-top: 12px;
  display:flex;
  justify-content: space-between;
  align-items:center;
  gap: 12px;
  flex-wrap: wrap;
  border-top: 1px solid rgba(0,0,0,.06);
  padding-top: 12px;
}

.tech{ display:flex; align-items:center; gap:10px; }
.avatar{
  width:34px; height:34px;
  border-radius:999px;
  display:grid; place-items:center;
  background: rgba(0,109,74,.12);
  color:#0b6b4a;
  font-weight:900;
}
.tech-name{ font-weight:900; color:#111827; line-height:1.1; }
.tech-meta{ color: rgba(0,0,0,.55); font-weight: 800; font-size: 12px; }
.tech-meta i{ color:#f59e0b; }

.actions{ display:flex; gap:10px; flex-wrap: wrap; }
.btn{
  border-radius: 12px;
  font-weight: 900;
  padding: 8px 10px;
  border: 1px solid rgba(0,0,0,.10);
  background: #fff;
}
.btn-light{ background: rgba(0,0,0,.03); }
.btn-outline{
  border-color: rgba(0,109,74,.30);
  color:#0b6b4a;
  background: rgba(0,109,74,.08);
}
.btn i{ margin-right: 6px; }

/* stars histórico */
.stars{ margin-top: 8px; color:#f59e0b; display:flex; gap:4px; }

/* barra final */
.footer-bar{
  background:#006d4a;
  padding: 16px 0;
}
.footer-inner{ display:flex; justify-content:center; }
.footer-note{ margin:0; color:rgba(255,255,255,.75); font-weight:800; font-size:12px; }
</style>


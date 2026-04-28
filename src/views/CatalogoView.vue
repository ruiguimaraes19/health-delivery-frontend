<script setup>
import { computed, onMounted, ref } from "vue";

const FAV_KEY = "hd_favs";
const CART_KEY = "hd_cart";

/* --- dados mock (depois ligas a Strapi) --- */
const allProducts = ref([
  { id: 1, nome: "Cadeira de rodas", categoria: "Mobilidade", preco: 59.99, rating: 4.5, reviews: 139, badge: "Best Seller", img: "https://via.placeholder.com/280x200?text=Cadeira" },
  { id: 2, nome: "Guincho de transferência", categoria: "Mobilidade", preco: 39.99, rating: 4.2, reviews: 88, badge: "", img: "https://via.placeholder.com/280x200?text=Guincho" },
  { id: 3, nome: "Bengala", categoria: "Mobilidade", preco: 20.49, rating: 4.1, reviews: 41, badge: "", img: "https://via.placeholder.com/280x200?text=Bengala" },
  { id: 4, nome: "Cama hospitalar", categoria: "Hospitalar", preco: 219.0, rating: 4.6, reviews: 92, badge: "", img: "https://via.placeholder.com/280x200?text=Cama" },

  { id: 5, nome: "Equipamento RX portátil", categoria: "Diagnóstico", preco: 149.0, rating: 4.7, reviews: 51, badge: "Best Seller", img: "https://via.placeholder.com/280x200?text=RX" },
  { id: 6, nome: "Braço articulado", categoria: "Hospitalar", preco: 79.0, rating: 4.3, reviews: 74, badge: "", img: "https://via.placeholder.com/280x200?text=Bra%C3%A7o" },
  { id: 7, nome: "Gel higienizante", categoria: "Consumíveis", preco: 16.0, rating: 4.2, reviews: 60, badge: "", img: "https://via.placeholder.com/280x200?text=Gel" },
  { id: 8, nome: "Kit cuidados pele", categoria: "Consumíveis", preco: 24.0, rating: 4.4, reviews: 33, badge: "", img: "https://via.placeholder.com/280x200?text=Kit" },

  { id: 9, nome: "Compressas", categoria: "Consumíveis", preco: 14.2, rating: 4.0, reviews: 21, badge: "", img: "https://via.placeholder.com/280x200?text=Compressas" },
  { id: 10, nome: "Protetor pele", categoria: "Consumíveis", preco: 14.9, rating: 4.1, reviews: 19, badge: "Promo", img: "https://via.placeholder.com/280x200?text=Protetor" },
  { id: 11, nome: "Shampoo clínico", categoria: "Consumíveis", preco: 16.7, rating: 4.3, reviews: 45, badge: "", img: "https://via.placeholder.com/280x200?text=Shampoo" },
  { id: 12, nome: "Kit hidratação", categoria: "Consumíveis", preco: 24.0, rating: 4.6, reviews: 80, badge: "", img: "https://via.placeholder.com/280x200?text=Hidratacao" },
]);

/* --- estados --- */
const q = ref("");
const sort = ref("Relevância");
const selectedCats = ref(new Set());
const minPrice = ref("");
const maxPrice = ref("");
const onlyAvailable = ref(false);

const favs = ref(new Set());
const cart = ref([]);

/* paginação */
const page = ref(1);
const perPage = 8;

/* categorias */
const categories = computed(() => {
  const set = new Set(allProducts.value.map(p => p.categoria));
  return Array.from(set).sort();
});

/* load storage */
onMounted(() => {
  try {
    const f = JSON.parse(localStorage.getItem(FAV_KEY) || "[]");
    favs.value = new Set(f);
  } catch {}
  try {
    cart.value = JSON.parse(localStorage.getItem(CART_KEY) || "[]");
  } catch {}
});

/* helpers */
function saveFavs() {
  localStorage.setItem(FAV_KEY, JSON.stringify(Array.from(favs.value)));
}
function saveCart() {
  localStorage.setItem(CART_KEY, JSON.stringify(cart.value));
}

function toggleCat(cat) {
  const s = new Set(selectedCats.value);
  if (s.has(cat)) s.delete(cat);
  else s.add(cat);
  selectedCats.value = s;
  page.value = 1;
}

function toggleFav(id) {
  const s = new Set(favs.value);
  if (s.has(id)) s.delete(id);
  else s.add(id);
  favs.value = s;
  saveFavs();
}

function addToCart(prod) {
  cart.value.push({ id: prod.id, nome: prod.nome, preco: prod.preco, qty: 1 });
  saveCart();
  alert("Adicionado ✅");
}

/* filtros + sort */
const filtered = computed(() => {
  const min = minPrice.value !== "" ? Number(minPrice.value) : null;
  const max = maxPrice.value !== "" ? Number(maxPrice.value) : null;

  let list = allProducts.value.filter(p => {
    const matchesQ = (p.nome + " " + p.categoria).toLowerCase().includes(q.value.toLowerCase());
    const matchesCat = selectedCats.value.size ? selectedCats.value.has(p.categoria) : true;
    const matchesMin = min === null ? true : p.preco >= min;
    const matchesMax = max === null ? true : p.preco <= max;
    const matchesAvail = onlyAvailable.value ? true : true; // placeholder p/ disponibilidade
    return matchesQ && matchesCat && matchesMin && matchesMax && matchesAvail;
  });

  if (sort.value === "Preço (asc)") list.sort((a,b) => a.preco - b.preco);
  if (sort.value === "Preço (desc)") list.sort((a,b) => b.preco - a.preco);
  if (sort.value === "Melhor rating") list.sort((a,b) => b.rating - a.rating);

  return list;
});

/* paginação */
const totalPages = computed(() => Math.max(1, Math.ceil(filtered.value.length / perPage)));

const paged = computed(() => {
  const start = (page.value - 1) * perPage;
  return filtered.value.slice(start, start + perPage);
});

function go(n) {
  page.value = Math.min(Math.max(1, n), totalPages.value);
}

function clearFilters() {
  q.value = "";
  sort.value = "Relevância";
  selectedCats.value = new Set();
  minPrice.value = "";
  maxPrice.value = "";
  onlyAvailable.value = false;
  page.value = 1;
}
</script>

<template>
  <main class="catalog">
    <div class="catalog-layout">
      <!-- SIDEBAR -->
      <aside class="sidebar">
        <div class="side-title">FILTROS</div>

        <div class="filter-block">
          <div class="filter-label">Categoria</div>
          <div class="check-list">
            <label v-for="cat in categories" :key="cat" class="check">
              <input type="checkbox" :checked="selectedCats.has(cat)" @change="toggleCat(cat)" />
              <span>{{ cat }}</span>
            </label>
          </div>
        </div>

        <div class="filter-block">
          <div class="filter-label">Intervalo de Preço</div>
          <div class="price-row">
            <input v-model="minPrice" class="price" type="number" placeholder="min" />
            <input v-model="maxPrice" class="price" type="number" placeholder="max" />
          </div>
        </div>

        <div class="filter-block">
          <div class="filter-label">Outros</div>
          <label class="check">
            <input type="checkbox" v-model="onlyAvailable" />
            <span>Disponível</span>
          </label>
        </div>

        <button class="btn-clear" @click="clearFilters">Limpar filtros</button>
      </aside>

      <!-- MAIN -->
      <section class="main">
        <!-- top bar -->
        <div class="topbar">
          <div class="search">
            <i class="bi bi-search"></i>
            <input v-model="q" type="text" placeholder="Pesquisar nome, produto, etc..." @input="page = 1" />
          </div>

          <div class="sort">
            <select v-model="sort">
              <option>Relevância</option>
              <option>Preço (asc)</option>
              <option>Preço (desc)</option>
              <option>Melhor rating</option>
            </select>
          </div>
        </div>

        <!-- grid -->
        <div class="grid">
          <article v-for="p in paged" :key="p.id" class="card">
            <div class="img-wrap">
              <span v-if="p.badge" class="badge">{{ p.badge }}</span>
              <button class="fav" @click="toggleFav(p.id)" :aria-label="'favorito '+p.nome">
                <i class="bi" :class="favs.has(p.id) ? 'bi-heart-fill' : 'bi-heart'"></i>
              </button>

              <img :src="p.img" :alt="p.nome" />
            </div>

            <div class="card-body">
              <div class="brand">Best Seller</div>
              <div class="name">{{ p.nome }}</div>

              <div class="rating">
                <div class="stars">
                  <i v-for="n in 5" :key="n" class="bi"
                    :class="n <= Math.round(p.rating) ? 'bi-star-fill' : 'bi-star'"></i>
                </div>
                <span class="score">{{ p.rating.toFixed(1) }} ({{ p.reviews }})</span>
              </div>

              <div class="price-line">
                <span class="price">{{ p.preco.toFixed(2) }}€</span>
              </div>

              <button class="btn-add" @click="addToCart(p)">Adicionar</button>
            </div>
          </article>
        </div>

        <!-- pagination -->
        <div class="pagination">
          <button class="page-btn" @click="go(page-1)" :disabled="page===1">‹</button>
          <button
            v-for="n in totalPages"
            :key="n"
            class="page-btn"
            :class="{ active: page===n }"
            @click="go(n)"
          >
            {{ n }}
          </button>
          <button class="page-btn" @click="go(page+1)" :disabled="page===totalPages">›</button>
        </div>
      </section>
    </div>

    <!-- barra final -->
    <footer class="footer-bar">
      <div class="footer-inner">
        <p class="footer-note">© 2026 Health Delivery</p>
      </div>
    </footer>
  </main>
</template>

<style scoped>
.catalog{ background:#fff; min-height:100vh; }

/* layout geral */
.catalog-layout{
  display:grid;
  grid-template-columns: 280px 1fr;
  gap: 0;
  min-height: calc(100vh - 60px);
}

/* sidebar */
.sidebar{
  background:#E1F2D1;
  padding: 18px 14px;
  border-right: 1px solid rgba(0,0,0,0.06);
}

.side-title{
  font-weight: 900;
  color:#0b6b4a;
  letter-spacing: .06em;
  font-size: 12px;
  margin-bottom: 14px;
}

.filter-block{ margin-bottom: 16px; }
.filter-label{
  font-weight: 900;
  color:#0b6b4a;
  font-size: 12px;
  margin-bottom: 10px;
}

.check-list{ display:flex; flex-direction:column; gap: 8px; }

.check{
  display:flex;
  gap: 10px;
  align-items:center;
  font-weight: 800;
  color: rgba(0,0,0,0.65);
  font-size: 13px;
}

.price-row{ display:flex; gap: 8px; }
.price{
  width: 100%;
  border: 1px solid rgba(0,0,0,0.12);
  border-radius: 10px;
  padding: 8px 10px;
  outline: none;
}

.btn-clear{
  width: 100%;
  border-radius: 12px;
  border: 1px solid rgba(0,109,74,0.25);
  background: rgba(0,109,74,0.10);
  color:#0b6b4a;
  font-weight: 900;
  padding: 10px 12px;
}

/* main */
.main{ padding: 18px 18px 30px; }

/* topbar */
.topbar{
  display:flex;
  justify-content: space-between;
  gap: 12px;
  align-items:center;
  margin-bottom: 14px;
}
.search{
  flex: 1;
  max-width: 640px;
  background:#fff;
  border: 1px solid rgba(0,0,0,0.12);
  border-radius: 999px;
  padding: 10px 14px;
  display:flex;
  align-items:center;
  gap: 10px;
}
.search input{
  border:none;
  outline:none;
  width:100%;
  font-weight: 700;
}

.sort select{
  border: 1px solid rgba(0,0,0,0.12);
  border-radius: 10px;
  padding: 9px 10px;
  font-weight: 800;
}

/* grid */
.grid{
  display:grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 14px;
}

.card{
  border: 1px solid rgba(0,0,0,0.08);
  border-radius: 14px;
  overflow:hidden;
  background:#fff;
  box-shadow: 0 10px 18px rgba(0,0,0,0.04);
}

.img-wrap{
  position:relative;
  height: 170px;
  display:flex;
  align-items:center;
  justify-content:center;
  background:#fff;
}
.img-wrap img{ width: 100%; height: 100%; object-fit: contain; }

.badge{
  position:absolute;
  left: 10px;
  top: 10px;
  background: rgba(0,109,74,0.12);
  color:#0b6b4a;
  font-weight: 900;
  font-size: 11px;
  padding: 6px 10px;
  border-radius: 999px;
  border: 1px solid rgba(0,109,74,0.18);
}

.fav{
  position:absolute;
  right: 10px;
  top: 10px;
  width: 34px;
  height: 34px;
  border-radius: 999px;
  border: 1px solid rgba(0,0,0,0.10);
  background:#fff;
  display:grid;
  place-items:center;
}
.fav i{ color:#006d4a; }

.card-body{ padding: 12px; }

.brand{
  font-size: 11px;
  color:#0b6b4a;
  font-weight: 900;
  margin-bottom: 2px;
}

.name{
  font-weight: 900;
  color:#111827;
  margin-bottom: 8px;
  min-height: 40px;
}

.rating{
  display:flex;
  align-items:center;
  gap: 8px;
  margin-bottom: 10px;
}
.stars{ color:#f59e0b; display:flex; gap: 2px; font-size: 12px; }
.score{ color: rgba(0,0,0,0.55); font-weight: 800; font-size: 12px; }

.price-line{ display:flex; align-items:center; justify-content: space-between; margin-bottom: 10px; }
.price{
  font-weight: 900;
  color:#006d4a;
  font-size: 16px;
}

.btn-add{
  width:100%;
  border:none;
  background:#006d4a;
  color:#fff;
  font-weight: 900;
  padding: 10px 12px;
  border-radius: 999px;
}
.btn-add:hover{ background:#00593d; }

/* pagination */
.pagination{
  display:flex;
  justify-content:center;
  gap: 6px;
  margin-top: 16px;
}
.page-btn{
  width: 34px;
  height: 34px;
  border-radius: 10px;
  border: 1px solid rgba(0,0,0,0.12);
  background:#fff;
  font-weight: 900;
}
.page-btn.active{
  background: rgba(0,109,74,0.12);
  border-color: rgba(0,109,74,0.25);
  color:#0b6b4a;
}

/* footer */
.footer-bar{ background:#006d4a; padding: 16px 0; }
.footer-inner{ display:flex; justify-content:center; }
.footer-note{ margin:0; color:rgba(255,255,255,0.75); font-weight:800; font-size:12px; }

/* responsive */
@media (max-width: 1200px){
  .grid{ grid-template-columns: repeat(3, minmax(0, 1fr)); }
}
@media (max-width: 900px){
  .catalog-layout{ grid-template-columns: 1fr; }
  .sidebar{ border-right: none; border-bottom: 1px solid rgba(0,0,0,0.06); }
  .grid{ grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
@media (max-width: 520px){
  .grid{ grid-template-columns: 1fr; }
}
</style>
<script setup>
import heroImg from "@/assets/home/foto.png"; // Garante que a imagem do colega está nesta pasta
</script>

<template>
  <main class="home">
    <section class="hero">
      <div class="container hero-wrap">
        
        <div class="hero-image">
          <img :src="heroImg" alt="Health Delivery" />
        </div>

        <div class="hero-metrics">
          <div class="metric-card">
            <div class="metric-value">98%</div>
            <div class="metric-label">Análises<br />Positivas</div>
          </div>

          <div class="metric-card">
            <div class="metric-value">125k+</div>
            <div class="metric-label">Entregas<br />Realizadas</div>
          </div>
        </div>

        <div class="hero-center">
          <h2 class="hero-title">Especialistas em Logística de Saúde</h2>
          <p class="hero-sub">
            Soluções adaptadas a cada necessidade do setor da saúde e bem-estar.
          </p>

          <router-link to="/encomendas" class="btn btn-hd">PEDIR AGORA</router-link>
        </div>
      </div>
    </section>

    <section class="container py-4">
      <div class="pill">
        <div class="pill-card">
          <div class="pill-number">18 min</div>
          <div class="pill-text">Tempo de Espera de Urgência</div>
        </div>

        <div class="pill-card">
          <div class="pill-number">450+</div>
          <div class="pill-text">Organizações Parceiras</div>
        </div>
      </div>
    </section>

    <section class="container pb-5">
      <div class="coverage">
        <div class="coverage-left">
          <h3 class="coverage-title">Zonas de Cobertura</h3>
          <p class="coverage-text">
            Atualmente operamos em toda a Área Metropolitana de Lisboa e Grande Porto,
            com expansão prevista para Coimbra e Braga no próximo trimestre.
          </p>
          
          <router-link to="/servicos" class="btn btn-outline-light btn-round text-decoration-none">
            VER SERVIÇOS
          </router-link>
        </div>

        <div class="coverage-right">
          <div class="map-box">
            <span class="map-icon">📍</span>
          </div>
        </div>
      </div>
    </section>

    <footer class="footer-bar">
      <div class="container footer-inner">
        <p class="footer-note">© 2026 Health Delivery</p>
      </div>
    </footer>
  </main>
</template>

<style scoped>
/* LIMPEZA: Apagámos o teu CSS antigo que estava quebrado e mantivemos só o do colega */
.home { background: #fff; }

/* botão */
.btn-hd{
  background:#006d4a;
  color:#fff;
  font-weight:900;
  border:none;
  border-radius:999px;
  padding: 12px 28px;
  text-decoration: none;
}
.btn-hd:hover{ background:#00593d; color:#fff; }

/* HERO */
.hero{
  background:#fff;
  position:relative;
  overflow:hidden;
}

.hero-wrap{
  position:relative;
  padding: 44px 0 36px;
  min-height: 560px;
  display:flex;
  flex-direction:column;
  gap: 22px;
}

/* imagem principal */
.hero-image{
  width: 100%;
  display:flex;
  justify-content:center;
}

.hero-image img{
  width: min(1100px, 100%);
  height: auto;
  display:block;
  border-radius: 0 !important;
  box-shadow: none !important;
  border: none !important;
}

/* métricas à direita */
.hero-metrics{
  position:absolute;
  right: 16px;
  top: 90px;
  display:flex;
  flex-direction:column;
  gap: 14px;
}

.metric-card{
  width: 140px;
  height: 108px;
  border-radius: 18px;
  background:#006d4a;
  color:#fff;
  display:grid;
  place-items:center;
  text-align:center;
  padding:10px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.12);
}
.metric-value{
  font-weight:900;
  font-size:24px;
  line-height:1.05;
}
.metric-label{
  font-weight:800;
  font-size:12px;
  opacity:0.92;
}

/* centro */
.hero-center{
  text-align:center;
  max-width: 720px;
  margin: 0 auto;
}
.hero-title{
  font-weight:900;
  color:#111827;
  margin: 0 0 8px;
}
.hero-sub{
  color: rgba(0,0,0,0.55);
  margin: 0 0 18px;
}

/* cápsula */
.pill{
  background:#006d4a;
  border-radius: 999px;
  padding: 22px;
  display:flex;
  gap:18px;
  justify-content:center;
  align-items:center;
  flex-wrap:wrap;
}

.pill-card{
  background:#fff;
  border-radius:999px;
  padding: 18px 26px;
  min-width: 280px;
  text-align:center;
  box-shadow: 0 10px 18px rgba(0,0,0,0.08);
}

.pill-number{
  color:#006d4a;
  font-weight:900;
  font-size:22px;
}
.pill-text{
  color: rgba(0,0,0,0.55);
  font-weight:800;
  font-size:12px;
  margin-top:4px;
}

/* cobertura */
.coverage{
  background:#006d4a;
  border-radius:24px;
  padding:34px;
  display:grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap:22px;
  align-items:center;
  min-height:260px;
}
.coverage-title{ color:#fff; font-weight:900; margin:0 0 10px; }
.coverage-text{
  color: rgba(255,255,255,0.85);
  font-weight:700;
  max-width:52ch;
  margin:0 0 16px;
}
.btn-round{ border-radius:999px; font-weight:900; padding:10px 18px; }

.map-box{
  width:260px;
  height:200px;
  border-radius:18px;
  background: rgba(255,255,255,0.12);
  border:1px solid rgba(255,255,255,0.18);
  display:grid;
  place-items:center;
  margin-left:auto;
}
.map-icon{ font-size: 64px; color: rgba(255,255,255,0.75); }

/* footer */
.footer-bar{ background:#006d4a; padding:16px 0; }
.footer-inner{ display:flex; justify-content:center; }
.footer-note{ margin:0; color:rgba(255,255,255,0.75); font-weight:800; font-size:12px; }

/* responsivo */
@media (max-width: 992px){
  .hero-wrap{ min-height:auto; padding: 22px 0 24px; }
  .hero-metrics{
    position: static;
    flex-direction: row;
    justify-content:center;
    margin-top: 10px;
  }
  .coverage{ grid-template-columns: 1fr; }
  .map-box{ width:100%; max-width:320px; margin: 0 auto; }
}
</style>
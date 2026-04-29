<template>
  <main class="services-page">

    <!-- HERO -->
    <section class="hero">
      <div class="container hero-inner">
        <div class="row align-items-center g-4">
          <div class="col-12 col-lg-7">
            <h1 class="hero-title mb-2">
              Serviços Técnicos para <br class="d-none d-md-block" />
              Equipamentos Hospitalares
            </h1>

            <p class="hero-sub mb-4">
              Manutenção e reparação especializada para equipamentos adquiridos através da plataforma Health Delivery.
            </p>

            <router-link to="/pedir_reparacao" class="btn btn-hd px-4">
              Solicitar Reparação
            </router-link>
          </div>

          <div class="col-12 col-lg-5">
            <div class="hero-illustration ms-lg-auto">
              <img :src="imgs.hero" alt="Serviços técnicos" class="hero-img" />
            </div>
          </div>
        </div>
      </div>

      <!-- WAVE: verde -> branco -->
      <svg class="wave wave--down" viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden="true">
        <path
          fill="#ffffff"
          d="M0,32L80,32C160,32,320,32,480,48C640,64,800,96,960,96C1120,96,1280,64,1360,48L1440,32L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
        />
      </svg>
    </section>

    <!-- SERVIÇOS -->
    <section class="cards-section">
      <div class="container py-5">
        <div class="row g-4 justify-content-center">

          <div class="col-12 col-md-4">
            <div class="service-card shadow-sm h-100">
              <div class="service-head">Manutenção Preventiva</div>
              <div class="service-body">
                <div class="service-icon">
                  <img :src="imgs.manPrev" alt="Manutenção Preventiva" />
                </div>
                <p class="service-text mb-0">
                  Verificações periódicas dos equipamentos para evitar falhas inesperadas e garantir o correto funcionamento.
                </p>
              </div>
            </div>
          </div>

          <div class="col-12 col-md-4">
            <div class="service-card shadow-sm h-100">
              <div class="service-head">Reparação Técnica</div>
              <div class="service-body">
                <div class="service-icon">
                  <img :src="imgs.repTec" alt="Reparação Técnica" />
                </div>
                <p class="service-text mb-0">
                  Diagnóstico e reparação de equipamentos médicos vendidos na plataforma, com apoio técnico especializado.
                </p>
              </div>
            </div>
          </div>

          <div class="col-12 col-md-4">
            <div class="service-card shadow-sm h-100">
              <div class="service-head">Assistência Técnica</div>
              <div class="service-body">
                <div class="service-icon">
                  <img :src="imgs.assTec" alt="Assistência Técnica" />
                </div>
                <p class="service-text mb-0">
                  Apoio técnico especializado para garantir o correto funcionamento e a longevidade dos equipamentos.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>

      <!-- WAVE: branco -> verde -->
      <svg class="wave wave--up" viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden="true">
        <path
          fill="#E1F2D1"
          d="M0,96L80,80C160,64,320,32,480,32C640,32,800,64,960,80C1120,96,1280,96,1360,96L1440,96L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
        />
      </svg>
    </section>

    <!-- COMO FUNCIONA -->
    <section class="how">
      <div class="container py-5">
        <h2 class="how-title text-center mb-4">Como Funciona</h2>

        <div class="how-flow">
          <!-- Step 1 -->
          <div class="how-step shadow-sm">
            <div class="how-step-inner">
              <div class="how-icon-wrap">
                <img :src="imgs.step1" alt="Solicita reparação" class="how-icon-img" />
              </div>
              <h6 class="fw-bold mb-1">Solicita reparação</h6>
              <p class="text-muted small mb-0">
                O cliente preenche o pedido com os dados do equipamento e problema.
              </p>
            </div>
          </div>

          <div class="how-arrow" aria-hidden="true">
            <span>›</span>
          </div>

          <!-- Step 2 -->
          <div class="how-step shadow-sm">
            <div class="how-step-inner">
              <div class="how-icon-wrap">
                <img :src="imgs.step2" alt="Técnico analisa" class="how-icon-img" />
              </div>
              <h6 class="fw-bold mb-1">Técnico analisa</h6>
              <p class="text-muted small mb-0">
                O pedido é analisado e validado pela equipa técnica.
              </p>
            </div>
          </div>

          <div class="how-arrow" aria-hidden="true">
            <span>›</span>
          </div>

          <!-- Step 3 -->
          <div class="how-step shadow-sm">
            <div class="how-step-inner">
              <div class="how-icon-wrap">
                <img :src="imgs.step3" alt="Recolha do equipamento" class="how-icon-img" />
              </div>
              <h6 class="fw-bold mb-1">Recolha do equipamento</h6>
              <p class="text-muted small mb-0">
                O equipamento é recolhido para manutenção ou reparação.
              </p>
            </div>
          </div>

          <div class="how-arrow" aria-hidden="true">
            <span>›</span>
          </div>

          <!-- Step 4 -->
          <div class="how-step shadow-sm">
            <div class="how-step-inner">
              <div class="how-icon-wrap">
                <img :src="imgs.step4" alt="Reparação e devolução" class="how-icon-img" />
              </div>
              <h6 class="fw-bold mb-1">Reparação e devolução</h6>
              <p class="text-muted small mb-0">
                O equipamento é reparado e devolvido ao cliente.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>

  </main>
</template>

<script setup>
import hero from "../assets/servicos/1.png";
import manPrev from "../assets/servicos/2.png";
import repTec from "../assets/servicos/3.png";
import assTec from "../assets/servicos/4.png";

import step1 from "../assets/servicos/5.png";
import step2 from "../assets/servicos/6.png";
import step3 from "../assets/servicos/7.png";
import step4 from "../assets/servicos/8.png";

const imgs = { hero, manPrev, repTec, assTec, step1, step2, step3, step4 };
</script>

<style scoped>
/* ===== BASE ===== */
.services-page{
  background:#E1F2D1;
}

/* ===== HERO ===== */
.hero{
  position:relative;
  background:#E1F2D1;
  overflow:hidden;
}
.hero-inner{
  padding: 48px 0 84px; /* deixa espaço para a wave */
}
.hero-title{
  color:#0b6b4a;
  font-weight:900;
  line-height:1.1;
  letter-spacing:-0.5px;
  font-size: clamp(34px, 3.2vw, 52px);
}
.hero-sub{
  color: rgba(0,0,0,0.55);
  max-width: 56ch;
  font-weight:600;
}
.btn-hd{
  background:#006d4a;
  border:none;
  color:#fff;
  font-weight:800;
  border-radius: 14px;
  padding: 12px 18px;
}
.btn-hd:hover{ background:#00593d; color:#fff; }

/* Card da imagem (direita) */
.hero-illustration{
  width:100%;
  max-width: 560px;
  height: 280px;
  border-radius: 24px;
  background: rgba(255,255,255,0.35);
  display:flex;
  align-items:center;
  justify-content:center;
  overflow:hidden;
  padding: 16px;
  border: none;
  box-shadow: none;
}
.hero-img{
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center;
}

/* Waves */
.wave{
  position:absolute;
  left:0; right:0;
  width:100%;
  height:120px;
  pointer-events:none;
}
.wave--down{ bottom:-1px; }
.wave--up{ bottom:-1px; }

/* ===== CARDS SECTION ===== */
.cards-section{
  position:relative;
  background:#ffffff;
  overflow:hidden;
  padding-bottom: 84px; /* espaço para a wave de baixo */
}

.service-card{
  border:0;
  border-radius: 18px;
  background:#fff;
  overflow:hidden;
}

.service-head{
  background:#1b8f6a;  /* verde da barra superior do mockup */
  color:#fff;
  font-weight:900;
  text-align:center;
  padding: 14px 12px;
  font-size: 14px;
  letter-spacing: 0.2px;
}

.service-body{
  padding: 18px 18px 22px;
  text-align:center;
}

/* Aqui é onde corrigimos o “fundo verde”:
   - a imagem já não ocupa 100% do quadrado
   - fica menor e com espaço branco à volta */
.service-icon{
  width: 160px;
  height: 120px;
  margin: 8px auto 14px;
  border-radius: 14px;
  background:#fff;
  display:flex;
  align-items:center;
  justify-content:center;
  overflow:hidden;
}
.service-icon img{
  width: 88%;
  height: 88%;
  object-fit: contain;
  object-position:center;
  background: transparent;
}

.service-text{
  color: rgba(0,0,0,0.58);
  font-weight:600;
}

/* ===== COMO FUNCIONA ===== */
.how{
  background:#E1F2D1;
}

.how-title{
  color:#0b6b4a;
  font-weight:900;
  letter-spacing:-0.4px;
}

/* layout: coluna em mobile, linha em desktop */
.how-flow{
  display:flex;
  flex-direction: column;
  gap: 14px;
  align-items: stretch;
}
@media (min-width: 992px){
  .how-flow{
    flex-direction: row;
    gap: 18px;
    align-items: center;
    justify-content: space-between;
  }
}

.how-step{
  background:#fff;
  border-radius: 18px;
  border: 0;
  flex: 1;
  min-width: 0;
}

.how-step-inner{
  padding: 18px;
  text-align:center;
}

/* área do ícone do “Como Funciona” */
.how-icon-wrap{
  width: 150px;
  height: 120px;
  border-radius: 16px;
  margin: 0 auto 10px;
  background:#fff;
  display:flex;
  align-items:center;
  justify-content:center;
  overflow:hidden;
}

/* corrigir “fundo verde” das imagens: mesma lógica do service-icon */
.how-icon-img{
  width: 88%;
  height: 88%;
  object-fit: contain;
  object-position: center;
  background: transparent;
}

/* setas: agora ficam sempre centradas e com círculo igual */
.how-arrow{
  width: 44px;
  height: 44px;
  border-radius: 999px;
  background: rgba(11,107,74,0.15);
  color:#0b6b4a;
  display:none; /* hidden em mobile */
  place-items:center;
  flex: 0 0 auto;
}
.how-arrow span{
  font-size: 30px;
  font-weight: 900;
  line-height: 1;
  transform: translateY(-1px);
}
@media (min-width: 992px){
  .how-arrow{ display:grid; }
}
</style>
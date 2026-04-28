<template>
  <main class="services-page">

    <!-- HERO -->
    <section class="hero">
      <div class="container py-5">
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
    </section>

    <!-- SERVIÇOS -->
    <section class="cards-section py-5">
      <div class="container">
        <div class="row g-4 justify-content-center">
          <div class="col-12 col-md-4">
            <div class="card service-card h-100 shadow-sm">
              <div class="card-body p-4 text-center">
                <div class="icon-wrap">
                  <img :src="imgs.manPrev" alt="Manutenção Preventiva" class="icon-img" />
                </div>
                <h5 class="fw-bold mt-3 mb-2">Manutenção Preventiva</h5>
                <p class="text-muted mb-0">
                  Verificações periódicas dos equipamentos para evitar falhas inesperadas e garantir o correto funcionamento.
                </p>
              </div>
            </div>
          </div>

          <div class="col-12 col-md-4">
            <div class="card service-card h-100 shadow-sm">
              <div class="card-body p-4 text-center">
                <div class="icon-wrap">
                  <img :src="imgs.repTec" alt="Reparação Técnica" class="icon-img" />
                </div>
                <h5 class="fw-bold mt-3 mb-2">Reparação Técnica</h5>
                <p class="text-muted mb-0">
                  Diagnóstico e reparação de equipamentos médicos vendidos na plataforma, com apoio técnico especializado.
                </p>
              </div>
            </div>
          </div>

          <div class="col-12 col-md-4">
            <div class="card service-card h-100 shadow-sm">
              <div class="card-body p-4 text-center">
                <div class="icon-wrap">
                  <img :src="imgs.assTec" alt="Assistência Técnica" class="icon-img" />
                </div>
                <h5 class="fw-bold mt-3 mb-2">Assistência Técnica</h5>
                <p class="text-muted mb-0">
                  Apoio técnico especializado para garantir o correto funcionamento e a longevidade dos equipamentos.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- COMO FUNCIONA -->
    <section class="how">
      <div class="container py-5">
        <h2 class="how-title text-center mb-4">Como Funciona</h2>

        <div class="how-flow">
          <div class="how-step card shadow-sm">
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

          <div class="how-arrow d-none d-lg-flex" aria-hidden="true">›</div>

          <div class="how-step card shadow-sm">
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

          <div class="how-arrow d-none d-lg-flex" aria-hidden="true">›</div>

          <div class="how-step card shadow-sm">
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

          <div class="how-arrow d-none d-lg-flex" aria-hidden="true">›</div>

          <div class="how-step card shadow-sm">
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

    <!-- BARRA FINAL (rodapé verde) -->
    <footer class="footer-bar">
      <div class="container footer-bar-inner">
        <div class="footer-logos" aria-label="Entidades e financiadores">
          <span class="footer-logo">PRR</span>
          <span class="footer-logo">República Portuguesa</span>
          <span class="footer-logo">NextGenerationEU</span>
          <span class="footer-logo">Portugal 2030</span>
        </div>
        <p class="footer-note">© 2026 Health Delivery</p>
      </div>
    </footer>

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
/* Fundo geral */
.services-page{
  background: #E1F2D1;
}

/* HERO */
.hero{
  background: #E1F2D1;
}

.hero-title{
  color:#0b6b4a;
  font-weight: 800;
  line-height: 1.1;
}

.hero-sub{
  color: rgba(0,0,0,0.55);
  max-width: 52ch;
}

.btn-hd{
  background:#006d4a;
  border:none;
  color:#fff;
  font-weight:700;
  border-radius: 14px;
  padding: 10px 18px;
}
.btn-hd:hover{ background:#00593d; color:#fff; }

/* Card da imagem do hero */
.hero-illustration{
  width:100%;
  max-width: 520px;
  height: 260px;
  border-radius: 22px;
  background: #E1F2D1;
  display:flex;
  align-items:center;
  justify-content:center;
  overflow:hidden;
  padding: 10px;

  border: none;
  box-shadow: none;
}

.hero-img{
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center;
  transform: none;
}

/* SECÇÃO DOS CARDS */
.cards-section{
  background: #ffffff;
}

/* SERVICE CARDS */
.service-card{
  border: 0;
  border-radius: 18px;
}

.icon-wrap{
  width: 180px;
  height: 180px;
  border-radius: 22px;
  margin: 0 auto;
  background: #ffffff;
  overflow: hidden;
  display:flex;
  align-items:center;
  justify-content:center;

  border: none;
  box-shadow: none;
}

.icon-img{
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center;
}

/* COMO FUNCIONA */
.how{
  background:#E1F2D1;
}

.how-title{
  color:#0b6b4a;
  font-weight:800;
}

.how-flow{
  display:grid;
  grid-template-columns: 1fr;
  gap: 14px;
}

@media (min-width: 992px){
  .how-flow{
    grid-template-columns: 1fr auto 1fr auto 1fr auto 1fr;
    align-items:center;
  }
}

.how-step{
  border:0;
  border-radius:18px;
}

.how-step-inner{
  padding: 18px;
  text-align:center;
}

.how-icon-wrap{
  width: 150px;
  height: 150px;
  border-radius: 22px;
  margin: 0 auto 10px auto;
  background: #ffffff;
  overflow:hidden;
  display:flex;
  align-items:center;
  justify-content:center;

  border: none;
  box-shadow: none;
}

.how-icon-img{
  width:100%;
  height:100%;
  object-fit: contain;
  object-position:center;
}

.how-arrow{
  width:34px;
  height:34px;
  border-radius:999px;
  background: rgba(11,107,74,0.15);
  color:#0b6b4a;
  font-size:26px;
  font-weight:800;
  display:grid;
  place-items:center;
}

/* BARRA FINAL */
.footer-bar{
  background: #006d4a;
  padding: 22px 0;
  margin-top: 0;
}

.footer-bar-inner{
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
  justify-content: center;
}

.footer-logos{
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: center;
  justify-content: center;
}

.footer-logo{
  color: rgba(255,255,255,0.92);
  font-weight: 900;
  font-size: 12px;
  letter-spacing: 0.08em;
  text-transform: uppercase;

  padding: 7px 12px;
  border-radius: 999px;
  border: 1px solid rgba(255,255,255,0.18);
  background: rgba(255,255,255,0.06);
}

.footer-note{
  margin: 0;
  color: rgba(255,255,255,0.75);
  font-size: 12px;
  font-weight: 700;
}
</style>
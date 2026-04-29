<script setup>
import { ref, onMounted } from 'vue'

// Variáveis para a animação dos números
const satisfacao = ref(0)
const entregas = ref(0)

onMounted(() => {
  // Animação para contar até 98%
  let contador1 = 0
  const intervalo1 = setInterval(() => {
    if (contador1 >= 98) clearInterval(intervalo1)
    else satisfacao.value = ++contador1
  }, 20)

  // Animação para contar até 125
  let contador2 = 0
  const intervalo2 = setInterval(() => {
    if (contador2 >= 125) clearInterval(intervalo2)
    else entregas.value = ++contador2
  }, 15)
})
</script>

<template>
  <main class="home-page">
    <section class="container py-5 mt-lg-5 overflow-hidden">
      <div class="row align-items-center g-5 pt-4">
        
        <div class="col-lg-6 animacao-texto">
          <div class="d-inline-flex align-items-center gap-2 px-3 py-2 rounded-pill bg-success-subtle text-success fw-bold mb-4" style="color: #006D4A !important;">
            <span class="pulse-dot"></span> Líderes em Portugal
          </div>
          
          <h1 class="display-3 fw-bold text-dark mb-4 lh-sm">
            Saúde entregue com <span class="text-highlight" style="color: #006D4A;">segurança total.</span>
          </h1>
          <p class="lead text-secondary mb-5 fs-5">
            Equipamento médico e serviços de excelência à distância de um clique. Rápido, fiável e com o nosso camião sempre a caminho.
          </p>
          
          <div class="d-flex flex-wrap gap-3">
            <router-link to="/catalogo" class="btn btn-lg text-white rounded-pill px-5 py-3 fw-bold shadow-sm btn-hover" style="background-color: #006D4A;">
              Ver Catálogo <i class="bi bi-arrow-right ms-2"></i>
            </router-link>
            <router-link to="/servicos" class="btn btn-lg btn-outline-dark rounded-pill px-5 py-3 fw-bold btn-hover">
              Os nossos Serviços
            </router-link>
          </div>

          <div class="d-flex gap-5 mt-5 pt-4 border-top">
            <div>
              <h2 class="display-5 fw-bold text-dark mb-0">{{ satisfacao }}%</h2>
              <p class="text-muted fw-medium mt-1">Clientes Satisfeitos</p>
            </div>
            <div>
              <h2 class="display-5 fw-bold text-dark mb-0">{{ entregas }}k+</h2>
              <p class="text-muted fw-medium mt-1">Entregas Feitas</p>
            </div>
          </div>
        </div>

        <div class="col-lg-6 animacao-3d">
          <div style="width: 100%; height: 500px; position: relative;">
            
            <spline-viewer 
              url="https://prod.spline.design/jguVxw6tbd2s8wIZ/scene.splinecode" 
              style="width: 100%; height: 100%; pointer-events: auto;">
            </spline-viewer>

          </div>
        </div>

      </div>
    </section>

    <section class="container py-5 my-5">
      <div class="row g-4 animacao-subir-atraso">
        <div class="col-md-4">
          <div class="p-4 bg-white rounded-4 shadow-sm h-100 feature-card">
            <div class="icon-box mb-3 d-flex align-items-center justify-content-center rounded-circle" style="background-color: #e6f0eb; width: 60px; height: 60px;">
              <i class="bi bi-stopwatch fs-3" style="color: #006D4A;"></i>
            </div>
            <h4 class="fw-bold mb-3">Entregas Rápidas</h4>
            <p class="text-muted mb-0">A nossa frota está sempre em movimento para garantir que o seu material médico chega quando mais precisa.</p>
          </div>
        </div>
        
        <div class="col-md-4">
          <div class="p-4 bg-white rounded-4 shadow-sm h-100 feature-card">
            <div class="icon-box mb-3 d-flex align-items-center justify-content-center rounded-circle" style="background-color: #e6f0eb; width: 60px; height: 60px;">
              <i class="bi bi-shield-check fs-3" style="color: #006D4A;"></i>
            </div>
            <h4 class="fw-bold mb-3">Segurança Máxima</h4>
            <p class="text-muted mb-0">Transportamos equipamentos sensíveis com o máximo rigor e controlo de temperatura certificado.</p>
          </div>
        </div>

        <div class="col-md-4">
          <div class="p-4 bg-white rounded-4 shadow-sm h-100 feature-card">
            <div class="icon-box mb-3 d-flex align-items-center justify-content-center rounded-circle" style="background-color: #e6f0eb; width: 60px; height: 60px;">
              <i class="bi bi-headset fs-3" style="color: #006D4A;"></i>
            </div>
            <h4 class="fw-bold mb-3">Suporte 24/7</h4>
            <p class="text-muted mb-0">Uma equipa dedicada pronta a ajudar a qualquer hora do dia ou da noite, todos os dias do ano.</p>
          </div>
        </div>
      </div>
    </section>

  </main>
</template>

<style scoped>
.home-page {
  background-color: #fcfcfc;
  min-height: 100vh;
}

.bg-success-subtle { 
  background-color: #e6f0eb !important; 
}

/* Bolinha a piscar no badge */
.pulse-dot {
  display: inline-block;
  width: 8px;
  height: 8px;
  background-color: #006D4A;
  border-radius: 50%;
  animation: pulse 1.5s infinite;
}

/* Efeito nos botões e cartões */
.btn-hover {
  transition: all 0.3s ease;
}
.btn-hover:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.1);
}

.feature-card {
  transition: all 0.3s ease;
  border: 1px solid transparent;
}
.feature-card:hover {
  transform: translateY(-8px);
  border-color: #e6f0eb;
  box-shadow: 0 1rem 3rem rgba(0,0,0,0.08) !important;
}

/* =========================================
   ANIMAÇÕES CSS (Keyframes)
   ========================================= */
.animacao-texto {
  opacity: 0;
  animation: subirSuave 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
}

.animacao-3d {
  opacity: 0;
  animation: deslizarDireita 1s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
  animation-delay: 0.3s; 
}

.animacao-subir-atraso {
  opacity: 0;
  animation: subirSuave 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
  animation-delay: 0.6s; 
}

@keyframes subirSuave {
  0% { opacity: 0; transform: translateY(30px); }
  100% { opacity: 1; transform: translateY(0); }
}

@keyframes deslizarDireita {
  0% { opacity: 0; transform: translateX(40px); }
  100% { opacity: 1; transform: translateX(0); }
}

@keyframes pulse {
  0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(0, 109, 74, 0.7); }
  70% { transform: scale(1); box-shadow: 0 0 0 6px rgba(0, 109, 74, 0); }
  100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(0, 109, 74, 0); }
}
</style>
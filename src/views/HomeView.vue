<template>
  <main class="container mt-5">
    
    <section class="row align-items-center mb-5">
      <div class="col-lg-8 position-relative">
        <h1 class="display-3 fw-bold text-brand">Health<br>Delivery</h1>
        <p class="fs-5 text-muted">Porque a sua saúde não pode esperar.</p>
        
        <img src="../assets/camiao.png" alt="Camião Health Delivery" class="img-fluid mt-4 rounded-4 shadow-sm w-100" style="object-fit: contain; max-height: 300px;">
      </div>
      
      <div class="col-lg-4 d-flex flex-column gap-4 mt-4 mt-lg-0">
        <div class="bg-brand text-white p-4 rounded-4 text-center shadow-sm">
          <h2 class="display-4 fw-bold mb-0">98% </h2>
          <p class="mb-0 fs-5 fw-semibold">Análises Positivas </p>
        </div>
        <div class="bg-brand text-white p-4 rounded-4 text-center shadow-sm">
          <h2 class="display-4 fw-bold mb-0">125k+ </h2>
          <p class="mb-0 fs-5 fw-semibold">Entregas Realizadas </p>
        </div>
      </div>
    </section>

    <section class="text-center mb-5 pt-5">
      <h2 class="fw-bold fs-1">Especialistas em Logística de Saúde </h2>
      <p class="text-muted fs-5">Soluções adaptadas a cada necessidade do setor da saúde e bem-estar. </p>
      <router-link to="/encomendas" class="btn btn-brand btn-lg rounded-pill px-5 py-3 fw-bold mt-3 shadow">PEDIR AGORA </router-link>
    </section>

    <section class="row mb-5 pb-4 justify-content-center gap-4">
      <div class="col-md-5 bg-white border-brand p-4 rounded-pill text-center shadow-sm">
        <h2 class="text-brand fw-bold mb-0 fs-1">18 min </h2>
        <p class="text-muted mb-0 fw-semibold fs-5">Tempo de Espera de Urgência </p>
      </div>
      <div class="col-md-5 bg-white border-brand p-4 rounded-pill text-center shadow-sm">
        <h2 class="text-brand fw-bold mb-0 fs-1">450+ </h2>
        <p class="text-muted mb-0 fw-semibold fs-5">Organizações Parceiras </p>
      </div>
    </section>

    <section class="bg-brand text-white rounded-5 p-5 mb-5 shadow-lg position-relative overflow-hidden">
      <div class="row align-items-center position-relative" style="z-index: 2;">
        <div class="col-md-7 px-4">
          <h2 class="fw-bold mb-4 display-5">Zonas de Cobertura </h2>
          <p class="fs-5 mb-5 lh-base">
            Atualmente operamos em toda a Área Metropolitana de Lisboa e Grande Porto, com expansão prevista para Coimbra e Braga no próximo trimestre. [cite: 264]
          </p>
          <button class="btn btn-outline-light btn-lg rounded-pill px-4 fw-bold">VER DISPONIBILIDADE </button>
        </div>
        <div class="col-md-5 text-center mt-4 mt-md-0">
          <i class="bi bi-geo-alt" style="font-size: 12rem; color: rgba(255,255,255,0.2);"></i>
        </div>
      </div>
    </section>
    
  </main>
</template>

<style scoped>
/* As nossas variáveis de cor para manter o código limpo */
.text-brand {
  color: #006D4A;
}

.bg-brand {
  background-color: #006D4A;
}

/* Borda grossa para os cartões brancos */
.border-brand {
  border: 4px solid #006D4A;
}

/* Estilo do botão principal */
.btn-brand {
  background-color: #006D4A;
  color: white;
  transition: all 0.3s ease;
}

.btn-brand:hover {
  background-color: #004d34; /* Um verde um pouco mais escuro ao passar o rato */
  color: white;
  transform: translateY(-2px); /* Pequeno efeito de salto */
}
</style>
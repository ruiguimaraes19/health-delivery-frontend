<template>
  <main class="services-page">
    <!-- HERO -->
    <section class="hero py-5">
      <div class="container">
        <div class="row align-items-center g-4">
          <div class="col-12 col-lg-7">
            <h1 class="display-6 fw-bold text-white mb-2">
              Serviços Técnicos para <br class="d-none d-md-block" />
              Equipamentos Hospitalares
            </h1>

            <p class="text-white-50 mb-4">
              Manutenção e reparação especializada para equipamentos adquiridos através da plataforma Health Delivery.
            </p>

            <router-link to="/pedir_reparacao" class="btn btn-light fw-bold px-4 rounded-pill">
              Solicitar Reparação
            </router-link>
          </div>

          <div class="col-12 col-lg-5">
            <div class="hero-illustration ms-lg-auto">
              <!-- troca por imagem se quiseres -->
              <i class="bi bi-tools text-white" style="font-size: 86px;"></i>
            </div>
          </div>
        </div>
      </div>

      <!-- onda/curva -->
      <div class="hero-wave"></div>
    </section>

    <!-- CARDS DE SERVIÇOS -->
    <section class="py-5 bg-soft">
      <div class="container">
        <div class="row g-4 justify-content-center">
          <div class="col-12 col-md-4">
            <div class="card service-card h-100 shadow-sm border-0">
              <div class="card-body p-4 text-center">
                <div class="icon-bubble mx-auto mb-3">
                  <i class="bi bi-shield-check"></i>
                </div>
                <h5 class="fw-bold mb-2">Manutenção Preventiva</h5>
                <p class="text-muted mb-0">
                  Verificações periódicas e inspeções para garantir o correto funcionamento do equipamento.
                </p>
              </div>
            </div>
          </div>

          <div class="col-12 col-md-4">
            <div class="card service-card h-100 shadow-sm border-0">
              <div class="card-body p-4 text-center">
                <div class="icon-bubble mx-auto mb-3">
                  <i class="bi bi-wrench-adjustable-circle"></i>
                </div>
                <h5 class="fw-bold mb-2">Reparação Técnica</h5>
                <p class="text-muted mb-0">
                  Diagnóstico e reparação de equipamentos com apoio técnico especializado.
                </p>
              </div>
            </div>
          </div>

          <div class="col-12 col-md-4">
            <div class="card service-card h-100 shadow-sm border-0">
              <div class="card-body p-4 text-center">
                <div class="icon-bubble mx-auto mb-3">
                  <i class="bi bi-headset"></i>
                </div>
                <h5 class="fw-bold mb-2">Assistência Técnica</h5>
                <p class="text-muted mb-0">
                  Apoio rápido para dúvidas, orientação e acompanhamento do processo.
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- COMO FUNCIONA -->
        <div class="text-center mt-5 pt-4">
          <h2 class="fw-bold text-green mb-4">Como Funciona</h2>

          <div class="row g-4 justify-content-center">
            <div class="col-12 col-md-3">
              <div class="step-card shadow-sm border-0">
                <div class="step-icon">
                  <i class="bi bi-clipboard-check"></i>
                </div>
                <h6 class="fw-bold mb-1">Solicita reparação</h6>
                <p class="text-muted small mb-0">Preenche o pedido com dados do equipamento.</p>
              </div>
            </div>

            <div class="col-12 col-md-3">
              <div class="step-card shadow-sm border-0">
                <div class="step-icon">
                  <i class="bi bi-person-badge"></i>
                </div>
                <h6 class="fw-bold mb-1">Técnico analisa</h6>
                <p class="text-muted small mb-0">Validação do problema e diagnóstico inicial.</p>
              </div>
            </div>

            <div class="col-12 col-md-3">
              <div class="step-card shadow-sm border-0">
                <div class="step-icon">
                  <i class="bi bi-truck"></i>
                </div>
                <h6 class="fw-bold mb-1">Recolha do equipamento</h6>
                <p class="text-muted small mb-0">Agendamento e recolha para reparação.</p>
              </div>
            </div>

            <div class="col-12 col-md-3">
              <div class="step-card shadow-sm border-0">
                <div class="step-icon">
                  <i class="bi bi-check2-circle"></i>
                </div>
                <h6 class="fw-bold mb-1">Reparação e devolução</h6>
                <p class="text-muted small mb-0">Reparação finalizada e envio de volta.</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  </main>
</template>

<style scoped>
.services-page {
  background: #ffffff;
}

.hero {
  background: #006d4a; /* verde do teu tema */
  position: relative;
  overflow: hidden;
}

.hero-illustration {
  width: 100%;
  max-width: 360px;
  height: 220px;
  border-radius: 18px;
  display: grid;
  place-items: center;
  background: rgba(255,255,255,0.08);
  border: 1px solid rgba(255,255,255,0.15);
}

.hero-wave {
  position: absolute;
  left: 0;
  right: 0;
  bottom: -1px;
  height: 90px;
  background: #e6f6df;
  clip-path: ellipse(75% 100% at 50% 0%);
}

.bg-soft {
  background: #e6f6df; /* verde clarinho */
}

.text-green {
  color: #006d4a;
}

.service-card {
  border-radius: 18px;
}

.icon-bubble {
  width: 56px;
  height: 56px;
  border-radius: 16px;
  display: grid;
  place-items: center;
  background: #e6f6df;
  color: #006d4a;
  font-size: 26px;
}

.step-card {
  background: #ffffff;
  border-radius: 18px;
  padding: 18px;
  text-align: center;
  border: 1px solid rgba(0,0,0,0.05);
}

.step-icon {
  width: 54px;
  height: 54px;
  border-radius: 16px;
  display: grid;
  place-items: center;
  margin: 0 auto 10px auto;
  background: #e6f6df;
  color: #006d4a;
  font-size: 24px;
}
</style>
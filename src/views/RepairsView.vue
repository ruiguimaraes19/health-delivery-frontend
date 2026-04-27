<template>
  <main class="overflow-hidden pb-0" style="background-color: #E1F2D1;">
    
    <div class="container py-5">
      <div class="row align-items-center">
        <div class="col-md-6 pe-lg-5">
          <h1 class="fw-bold text-brand mb-3 display-5">Serviços Técnicos para Equipamentos Hospitalares</h1>
          <p class="text-muted fs-5 mb-4">
            Manutenção e reparação especializada para equipamentos adquiridos através da plataforma Health Delivery.
          </p>
          <button v-if="!showForm" @click="showForm = true" class="btn btn-brand btn-lg rounded-pill px-4 fw-bold">
            Solicitar Reparação
          </button>
        </div>
        <div class="col-md-6 text-center mt-5 mt-md-0">
          <img src="@/assets/tecnico.svg" alt="Técnico Health Delivery" class="img-fluid" style="max-height: 380px;">
        </div>
      </div>
    </div>

    <div style="line-height: 0; font-size: 0;">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 160" class="d-block w-100" style="margin-bottom: -1px;">
        <path fill="#FFFFFF" fill-opacity="1" d="M0,64L80,80C160,96,320,128,480,122.7C640,117,800,75,960,58.7C1120,43,1280,53,1360,58.7L1440,64L1440,160L0,160Z"></path>
      </svg>
    </div>

    <div class="bg-white">
      
      <div class="container py-2" v-if="!showForm">
        <div class="row g-4 justify-content-center">
          <div class="col-md-4">
            <div class="card h-100 border shadow-sm rounded-4 overflow-hidden card-hover text-center bg-white">
              <div class="bg-brand text-white py-3"><h5 class="fw-bold mb-0 fs-6">Manutenção Preventiva</h5></div>
              <div class="card-body p-4 d-flex flex-column align-items-center">
                <i class="bi bi-calendar-check text-brand opacity-75 mb-3" style="font-size: 4rem;"></i>
                <p class="text-muted small mb-0">Verificações periódicas dos equipamentos para evitar falhas inesperadas e garantir o correto funcionamento.</p>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="card h-100 border shadow-sm rounded-4 overflow-hidden card-hover text-center bg-white">
              <div class="bg-brand text-white py-3"><h5 class="fw-bold mb-0 fs-6">Reparação Técnica</h5></div>
              <div class="card-body p-4 d-flex flex-column align-items-center">
                <i class="bi bi-clipboard-pulse text-brand opacity-75 mb-3" style="font-size: 4rem;"></i>
                <p class="text-muted small mb-0">Diagnóstico e reparação de equipamentos avariados na plataforma, com apoio técnico especializado.</p>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="card h-100 border shadow-sm rounded-4 overflow-hidden card-hover text-center bg-white">
              <div class="bg-brand text-white py-3"><h5 class="fw-bold mb-0 fs-6">Assistência Técnica</h5></div>
              <div class="card-body p-4 d-flex flex-column align-items-center">
                <i class="bi bi-headset text-brand opacity-75 mb-3" style="font-size: 4rem;"></i>
                <p class="text-muted small mb-0">Apoio contínuo especializado para garantir o correto funcionamento e a longevidade dos equipamentos.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="container py-4" v-if="showForm">
        <div class="card border-0 shadow-lg rounded-4 p-4 p-md-5 animation-fade-in" style="background-color: #f8fcf9;">
          <div class="d-flex justify-content-between align-items-center mb-4">
            <h3 class="fw-bold text-brand mb-0">Pedido de Reparação</h3>
            <button @click="showForm = false" class="btn btn-outline-secondary btn-sm rounded-pill px-3">
              <i class="bi bi-x-lg me-1"></i> Cancelar
            </button>
          </div>
          <p class="text-muted mb-4">Preencha o formulário para solicitar a reparação de um equipamento.</p>
          <form @submit.prevent="submitPedido">
            <div class="row g-4 mb-4">
              <div class="col-md-6">
                <label class="form-label fw-semibold small">Equipamento *</label>
                <select class="form-select bg-white border-subtle">
                  <option selected disabled>Selecione o equipamento</option>
                  <option>#8135492 - Ventilador Respiratório V5</option>
                </select>
              </div>
              <div class="col-md-6">
                <label class="form-label fw-semibold small">Prioridade (1 a 5) *</label>
                <div class="d-flex gap-2">
                  <button type="button" v-for="n in 5" :key="n" @click="prioridade = n"
                          :class="['btn rounded-circle fw-bold', prioridade === n ? 'btn-brand text-white' : 'btn-light text-muted border']"
                          style="width: 40px; height: 40px;">
                    {{ n }}
                  </button>
                </div>
              </div>
              <div class="col-12">
                <label class="form-label fw-semibold small">Descrição do Problema *</label>
                <textarea class="form-control bg-white border-subtle" rows="3" placeholder="Descreva o problema..."></textarea>
              </div>
            </div>
            <div class="text-center mt-5">
              <button type="submit" class="btn btn-brand btn-lg rounded-pill px-5 fw-bold shadow">Submeter Pedido</button>
            </div>
          </form>
        </div>
      </div>

    </div>

    <div v-if="!showForm" style="line-height: 0; font-size: 0;">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 160" class="d-block w-100" style="margin-top: -1px;">
        <path fill="#FFFFFF" fill-opacity="1" d="M0,64L80,80C160,96,320,128,480,122.7C640,117,800,75,960,58.7C1120,43,1280,53,1360,58.7L1440,64L1440,0L0,0Z"></path>
      </svg>
    </div>

    <div class="container text-center mt-5 pt-2 pb-5" v-if="!showForm">
      <h2 class="fw-bold text-brand mb-5">Como Funciona</h2>
      <div class="d-flex flex-column flex-lg-row justify-content-between align-items-center gap-3">
        <div class="step-card bg-white rounded-4 shadow-sm p-4 text-center border-0">
          <i class="bi bi-ui-checks text-brand mb-3" style="font-size: 3rem;"></i>
          <h6 class="fw-bold">Solicita reparação</h6>
          <p class="text-muted small mb-0" style="font-size: 0.75rem;">O cliente preenche o pedido com os dados do equipamento e problema.</p>
        </div>
        <i class="bi bi-arrow-right fs-2 text-brand opacity-50 d-none d-lg-block"></i>
        <i class="bi bi-arrow-down fs-2 text-brand opacity-50 d-lg-none my-2"></i>
        <div class="step-card bg-white rounded-4 shadow-sm p-4 text-center border-0">
          <i class="bi bi-person-gear text-brand mb-3" style="font-size: 3rem;"></i>
          <h6 class="fw-bold">Técnico analisa</h6>
          <p class="text-muted small mb-0" style="font-size: 0.75rem;">O pedido é analisado e validado pela equipa técnica.</p>
        </div>
        <i class="bi bi-arrow-right fs-2 text-brand opacity-50 d-none d-lg-block"></i>
        <i class="bi bi-arrow-down fs-2 text-brand opacity-50 d-lg-none my-2"></i>
        <div class="step-card bg-white rounded-4 shadow-sm p-4 text-center border-0">
          <i class="bi bi-truck text-brand mb-3" style="font-size: 3rem;"></i>
          <h6 class="fw-bold">Recolha do equipamento</h6>
          <p class="text-muted small mb-0" style="font-size: 0.75rem;">O equipamento é recolhido para manutenção ou reparação.</p>
        </div>
        <i class="bi bi-arrow-right fs-2 text-brand opacity-50 d-none d-lg-block"></i>
        <i class="bi bi-arrow-down fs-2 text-brand opacity-50 d-lg-none my-2"></i>
        <div class="step-card bg-white rounded-4 shadow-sm p-4 text-center border-0">
          <i class="bi bi-tools text-brand mb-3" style="font-size: 3rem;"></i>
          <h6 class="fw-bold">Reparação e devolução</h6>
          <p class="text-muted small mb-0" style="font-size: 0.75rem;">O equipamento é reparado e devolvido ao cliente.</p>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue'

const showForm = ref(false)
const prioridade = ref(3)

const submitPedido = () => {
  alert('Pedido submetido com sucesso!')
  showForm.value = false
}
</script>

<style scoped>
.text-brand { color: #006D4A !important; }
.bg-brand { background-color: #006D4A !important; }
.btn-brand { background-color: #006D4A; color: white; transition: all 0.2s; }
.btn-brand:hover { background-color: #004d34; transform: translateY(-2px); color: white;}
.border-subtle { border: 1px solid #dee2e6; }

.step-card { width: 100%; max-width: 220px; transition: transform 0.2s; }
.step-card:hover { transform: translateY(-5px); box-shadow: 0 1rem 3rem rgba(0,0,0,.15)!important; }
.card-hover { transition: transform 0.2s, box-shadow 0.2s; }
.card-hover:hover { transform: translateY(-5px); box-shadow: 0 1rem 3rem rgba(0,0,0,.175)!important; }
.animation-fade-in { animation: fadeIn 0.4s ease-in-out; }
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
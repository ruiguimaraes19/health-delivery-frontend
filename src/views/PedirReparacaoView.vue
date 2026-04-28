<template>
  <main class="repair-page">
    <!-- HERO -->
    <section class="hero">
      <div class="container py-5">
        <div class="row align-items-center g-4">
          <div class="col-12 col-lg-7">
            <h1 class="hero-title mb-2">Pedido de Reparação</h1>
            <p class="hero-sub mb-0">
              Preencha o formulário para solicitar a reparação de um equipamento adquirido através da nossa plataforma.
              O pedido ficará associado à sua conta para posterior acompanhamento.
            </p>
          </div>

          <div class="col-12 col-lg-5">
            <div class="hero-illustration ms-lg-auto">
              <img :src="heroImg" alt="Pedido de reparação" class="hero-img" />
            </div>
          </div>
        </div>
      </div>

      <div class="hero-wave"></div>
    </section>

    <!-- CONTENT -->
    <section class="content">
      <div class="container py-5">
        <div class="card form-card shadow-sm border-0">
          <div class="card-header form-head">
            <small class="text-muted">
              Preencha todos os campos para solicitar a reparação do equipamento e agendar a respetiva recolha.
            </small>
          </div>

          <div class="card-body p-4">
            <form @submit.prevent="submit">
              <!-- Equipamento -->
              <div class="mb-3">
                <label class="form-label fw-semibold">Equipamento *</label>
                <select class="form-select" v-model="form.equipamento" required>
                  <option value="" disabled>Selecione o equipamento</option>
                  <option>Ventilador Respiratório VS100</option>
                  <option>Monitor de Sinais Vitais MSV-20</option>
                  <option>Cama Hospitalar Elétrica CH-2</option>
                </select>
              </div>

              <!-- Problema + Prioridade -->
              <div class="row g-3">
                <div class="col-12 col-lg-6">
                  <label class="form-label fw-semibold">Problema *</label>
                  <select class="form-select" v-model="form.problema" required>
                    <option value="" disabled>Selecione o problema</option>
                    <option>Não liga</option>
                    <option>Erro no ecrã</option>
                    <option>Barulho anormal</option>
                    <option>Outro</option>
                  </select>
                </div>

                <div class="col-12 col-lg-6">
                  <label class="form-label fw-semibold">Prioridade (1 a 5) *</label>
                  <div class="priority">
                    <button
                      v-for="n in 5"
                      :key="n"
                      type="button"
                      class="priority-btn"
                      :class="{ active: form.prioridade === n }"
                      @click="form.prioridade = n"
                    >
                      {{ n }}
                    </button>
                  </div>

                  <small class="text-muted d-block mt-2">
                    1 = baixa urgência · 5 = alta urgência
                  </small>

                  <div class="status mt-2">
                    <span class="status-pill">Estado atual: <strong>Em análise</strong></span>
                  </div>
                </div>
              </div>

              <!-- Descrição -->
              <div class="mt-3 mb-4">
                <label class="form-label fw-semibold">Descrição *</label>
                <textarea
                  class="form-control"
                  rows="4"
                  v-model="form.descricao"
                  placeholder="Descreva o problema em detalhe..."
                  required
                ></textarea>
              </div>

              <hr class="my-4" />

              <!-- Dados de Recolha -->
              <h5 class="section-title">Dados de Recolha</h5>
              <p class="text-muted small mb-3">
                Indique os dados logísticos para recolha do equipamento. Estes dados serão usados para o transporte
                para manutenção/reparação.
              </p>

              <div class="row g-3">
                <div class="col-12 col-lg-6">
                  <label class="form-label fw-semibold">Nome do contacto *</label>
                  <input class="form-control" v-model="form.nome" placeholder="Ex: Emanuel Costa" required />
                </div>

                <div class="col-12 col-lg-6">
                  <label class="form-label fw-semibold">Telefone *</label>
                  <input class="form-control" v-model="form.telefone" placeholder="Ex: 912 345 678" required />
                </div>
              </div>

              <div class="mt-3">
                <label class="form-label fw-semibold">Tipo de recolha *</label>
                <div class="d-flex gap-4 flex-wrap">
                  <label class="form-check">
                    <input class="form-check-input" type="radio" value="domicilio" v-model="form.tipoRecolha" required />
                    <span class="form-check-label">Recolha ao domicílio</span>
                  </label>

                  <label class="form-check">
                    <input class="form-check-input" type="radio" value="instituicao" v-model="form.tipoRecolha" required />
                    <span class="form-check-label">Recolha em instituição</span>
                  </label>
                </div>
              </div>

              <div class="mt-3">
                <label class="form-label fw-semibold">Morada *</label>
                <input class="form-control" v-model="form.morada" placeholder="Rua, número, piso, porta..." required />

                <div class="form-check mt-2">
                  <input class="form-check-input" type="checkbox" id="useAccountAddress" v-model="form.usarMoradaConta" />
                  <label class="form-check-label text-muted" for="useAccountAddress">
                    Utilizar morada associada à conta
                  </label>
                </div>
              </div>

              <div class="row g-3 mt-0">
                <div class="col-12 col-md-4">
                  <label class="form-label fw-semibold">Código Postal *</label>
                  <input class="form-control" v-model="form.codigoPostal" placeholder="4700-000" required />
                </div>

                <div class="col-12 col-md-4">
                  <label class="form-label fw-semibold">Cidade *</label>
                  <input class="form-control" v-model="form.cidade" placeholder="Braga" required />
                </div>

                <div class="col-12 col-md-4">
                  <label class="form-label fw-semibold">Instituição (opcional)</label>
                  <input class="form-control" v-model="form.instituicao" placeholder="Hospital/Clínica/Lar" />
                </div>
              </div>

              <hr class="my-4" />

              <!-- Agendamento -->
              <h5 class="section-title">Agendamento</h5>
              <p class="text-muted small mb-3">
                Indique o dia e a hora preferencial para recolha do equipamento.
              </p>

              <div class="row g-3">
                <div class="col-12 col-md-6">
                  <label class="form-label fw-semibold">Data preferencial *</label>
                  <input class="form-control" type="date" v-model="form.data" required />
                </div>

                <div class="col-12 col-md-6">
                  <label class="form-label fw-semibold">Hora preferencial *</label>
                  <input class="form-control" type="time" v-model="form.hora" required />
                </div>
              </div>

              <div class="mt-3">
                <label class="form-label fw-semibold">Foto do equipamento (opcional)</label>

                <div class="upload">
                  <input class="upload-input" type="file" accept="image/png,image/jpeg" @change="onFile" />
                  <div class="upload-ui">
                    <div class="upload-icon">☁️</div>
                    <div class="upload-text">
                      <div class="fw-semibold">Selecione ou arraste uma foto aqui</div>
                      <div class="text-muted small">PNG, JPG até 5MB</div>
                    </div>
                    <button class="btn btn-hd btn-sm px-3" type="button" @click="triggerFile">
                      Escolher ficheiro
                    </button>
                  </div>
                </div>
              </div>

              <div class="text-center mt-4">
                <button class="btn btn-hd px-5" type="submit">Submeter Pedido</button>
                <div class="text-muted small mt-2">
                  Ao submeter, concorda com a nossa <a href="#" class="link-privacy">Política de Privacidade</a>.
                </div>
              </div>

            </form>
          </div>
        </div>
      </div>
    </section>

  </main>
</template>

<script setup>
import { reactive, ref } from "vue";

// Reutiliza o hero do serviços:
import heroImg from "../assets/servicos/1.png";

const STORAGE_KEY = "hd_repairs";

function submit() {
  const raw = localStorage.getItem(STORAGE_KEY);
  const list = raw ? JSON.parse(raw) : [];

  const newRepair = {
    id: crypto.randomUUID(),
    code: `GE-2026-${Math.floor(8000 + Math.random()*999)}`,
    equipamento: form.equipamento,
    local: form.cidade ? `Recolha em ${form.cidade}` : "—",
    createdAt: new Date().toISOString(),
    price: 0,
    prioridade: form.prioridade,
    status: "em_curso",
    statusStep: 2, // Em análise
    eta: form.prioridade >= 5 ? "30 min" : form.prioridade === 4 ? "1h" : "2h",
    techName: "Atribuição automática",
    techRating: 4.7,
    techJobs: 120,
    rating: null,
    completedAt: null,
  };

  list.unshift(newRepair);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));

  alert("Pedido submetido ✅");
  window.location.href = "/minhas_reparacoes";
}

const fileInputRef = ref(null);

const form = reactive({
  equipamento: "",
  problema: "",
  prioridade: 3,
  descricao: "",

  nome: "",
  telefone: "",
  tipoRecolha: "domicilio",
  morada: "",
  usarMoradaConta: false,
  codigoPostal: "",
  cidade: "",
  instituicao: "",

  data: "",
  hora: "",
  foto: null,
});

function onFile(e) {
  const f = e.target.files?.[0] || null;
  form.foto = f;
}

function triggerFile() {
  // abre seletor do ficheiro (sem libs)
  document.querySelector(".upload-input")?.click();
}

</script>

<style scoped>
/* Fundo geral */
.repair-page {
  background: #E1F2D1;
}

/* HERO */
.hero {
  background: #E1F2D1;
  position: relative;
  overflow: hidden;
}

.hero-title {
  color: #0b6b4a;
  font-weight: 800;
  line-height: 1.1;
  font-size: clamp(32px, 3.2vw, 48px);
}

.hero-sub {
  color: rgba(0, 0, 0, 0.55);
  max-width: 60ch;
}

.hero-illustration {
  width: 100%;
  max-width: 520px;
  height: 260px;
  border-radius: 22px;
  background: #E1F2D1;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 10px;
  border: none;
  box-shadow: none;
}

.hero-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center;
}

.hero-wave {
  position: absolute;
  left: 0;
  right: 0;
  bottom: -1px;
  height: 110px;
  background: #E1F2D1;
  clip-path: ellipse(75% 100% at 50% 0%);
}

/* CONTENT */
.content {
  background: #ffffff;
}

.form-card {
  border-radius: 18px;
  overflow: hidden;
}

.form-head {
  background: rgba(0, 109, 74, 0.08);
  border-bottom: 1px solid rgba(0,0,0,0.05);
}

/* Botões */
.btn-hd {
  background: #006d4a;
  border: none;
  color: #fff;
  font-weight: 700;
  border-radius: 14px;
  padding: 10px 18px;
}

.btn-hd:hover {
  background: #00593d;
  color: #fff;
}

.section-title {
  color: #0b6b4a;
  font-weight: 800;
}

/* Prioridade */
.priority {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.priority-btn {
  width: 34px;
  height: 34px;
  border-radius: 10px;
  border: 1px solid rgba(0,0,0,0.08);
  background: #fff;
  font-weight: 800;
  color: #0b6b4a;
}

.priority-btn.active {
  background: #006d4a;
  border-color: #006d4a;
  color: #fff;
}

.status-pill {
  display: inline-block;
  padding: 6px 10px;
  border-radius: 999px;
  background: rgba(0, 109, 74, 0.10);
  color: #0b6b4a;
  font-size: 12px;
  font-weight: 700;
}

/* Upload */
.upload {
  position: relative;
  border-radius: 16px;
  border: 1px dashed rgba(0,0,0,0.18);
  background: rgba(0, 109, 74, 0.03);
  padding: 14px;
}

.upload-input {
  position: absolute;
  inset: 0;
  opacity: 0;
  cursor: pointer;
}

.upload-ui {
  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
}

.upload-icon {
  font-size: 22px;
}

.upload-text {
  flex: 1;
  min-width: 200px;
}

.link-privacy {
  color: #006d4a;
  font-weight: 700;
  text-decoration: none;
}
.link-privacy:hover {
  text-decoration: underline;
}

/* Footer */
.footer-bar {
  background: #006d4a;
  padding: 16px 0;
}

.footer-bar-inner {
  display: flex;
  justify-content: center;
  align-items: center;
}

.footer-note {
  margin: 0;
  color: rgba(255,255,255,0.75);
  font-size: 12px;
  font-weight: 700;
}
</style>
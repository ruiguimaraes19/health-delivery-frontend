<template>
  <main class="login-page d-flex align-items-center justify-content-center bg-light py-5">
    
    <div class="container">
      <div class="row shadow-lg rounded-5 overflow-hidden" style="min-height: 75vh;">
        
        <div class="col-lg-5 p-5 d-flex flex-column justify-content-center bg-brand-dark text-white position-relative">
          
          <div class="position-absolute top-0 start-0 p-4">
            <i class="bi bi-heart-pulse-fill fs-3 text-white"></i>
          </div>

          <div v-if="isLogin" class="animation-fade-in mt-4">
            <h2 class="fw-bold mb-4">Log In</h2>
            
            <form @submit.prevent="fazerLogin">
              <div class="mb-3">
                <input type="text" class="form-control form-control-lg rounded-pill border-0 custom-input" placeholder="Email or Username">
              </div>
              <div class="mb-4">
                <input type="password" class="form-control form-control-lg rounded-pill border-0 custom-input" placeholder="Password">
              </div>
              
              <button type="submit" class="btn btn-brand-light btn-lg rounded-pill w-100 fw-bold mb-2">Log In</button>
              
              <div class="text-center mb-4">
                <a href="#" class="text-white text-decoration-none small opacity-75">Forget your username or password</a>
              </div>

              <div class="d-flex align-items-center my-4">
                <hr class="flex-grow-1 bg-white opacity-50">
                <span class="mx-3 fw-semibold small">Or</span>
                <hr class="flex-grow-1 bg-white opacity-50">
              </div>

              <div class="d-flex flex-column gap-3">
                <button type="button" class="btn btn-social rounded-pill py-2 fw-bold d-flex align-items-center justify-content-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-google text-danger" viewBox="0 0 16 16"><path d="M15.545 6.558a9.4 9.4 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.7 7.7 0 0 1 5.352 2.082l-2.284 2.284A4.35 4.35 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.8 4.8 0 0 0 0 3.06c.632 1.896 2.405 3.304 4.492 3.304 1.248 0 2.352-.367 3.213-.984.72-.516 1.21-1.278 1.344-2.142H8v-2.25h7.545z"/></svg>
                  Login with google
                </button>
                <button type="button" class="btn btn-social rounded-pill py-2 fw-bold d-flex align-items-center justify-content-center gap-2">
                  <i class="bi bi-apple fs-5 text-dark" style="margin-top: -3px;"></i>
                  Login with apple
                </button>
              </div>

              <div class="text-center mt-5">
                <a href="#" @click.prevent="isLogin = false" class="text-white text-decoration-none fw-bold border-bottom pb-1">Sign Up Now</a>
              </div>
            </form>
          </div>

          <div v-else class="animation-fade-in mt-4">
            <h2 class="fw-bold mb-4">Sign up</h2>
            
            <form @submit.prevent="fazerRegisto">
              <div class="mb-3">
                <input type="text" class="form-control form-control-lg rounded-pill border-0 custom-input" placeholder="Name">
              </div>
              <div class="mb-3">
                <input type="email" class="form-control form-control-lg rounded-pill border-0 custom-input" placeholder="Email">
              </div>
              <div class="mb-3">
                <input type="password" class="form-control form-control-lg rounded-pill border-0 custom-input" placeholder="Password">
              </div>
              <div class="mb-3">
                <input type="password" class="form-control form-control-lg rounded-pill border-0 custom-input" placeholder="Confirm Password">
              </div>
              <div class="mb-4">
                <select class="form-select form-select-lg rounded-pill border-0 custom-input">
                  <option selected disabled>Role</option>
                  <option value="cliente">Cliente (Particular)</option>
                  <option value="hospital">Instituição / Hospital</option>
                </select>
              </div>
              
              <button type="submit" class="btn btn-brand-light btn-lg rounded-pill w-100 fw-bold mb-4">Sign up</button>

              <div class="text-center mt-3">
                <a href="#" @click.prevent="isLogin = true" class="text-white text-decoration-none fw-bold opacity-75">Already have an account? Log In</a>
              </div>
            </form>
          </div>

        </div>

        <div class="col-lg-7 d-none d-lg-flex flex-column position-relative p-0" style="background-color: #E6F0E1;">
          
          <div class="flex-grow-1 d-flex align-items-center justify-content-center p-5" style="z-index: 2;">
            <img src="@/assets/camiao.png" alt="Health Delivery Truck" class="img-fluid" style="max-width: 85%;">
          </div>

          <div class="position-absolute bottom-0 w-100" style="line-height: 0;">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" class="w-100 d-block">
              <path fill="#ffffff" fill-opacity="1" d="M0,224L80,213.3C160,203,320,181,480,181.3C640,181,800,203,960,197.3C1120,192,1280,160,1360,144L1440,128L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
            </svg>
          </div>

        </div>

      </div>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isLogin = ref(true) // Controla se estamos a ver o Login (true) ou Registo (false)

const fazerLogin = () => {
  // Simulação de login - Redireciona para a página de Encomendas
  router.push('/encomendas')
}

const fazerRegisto = () => {
  alert('Conta criada com sucesso!')
  isLogin.value = true
}
</script>

<style scoped>
/* A cor verde escura principal */
.bg-brand-dark {
  background-color: #006D4A;
}

/* O botão verde clarinho */
.btn-brand-light {
  background-color: #CDE5B1;
  color: #006D4A;
  transition: all 0.2s ease;
}
.btn-brand-light:hover {
  background-color: #bce095;
  transform: translateY(-2px);
}

/* Estilo personalizado para as caixas de texto (Inputs) */
.custom-input {
  font-size: 0.95rem;
  font-weight: 600;
  color: #006D4A;
  padding-left: 1.5rem;
  box-shadow: inset 0 1px 2px rgba(0,0,0,0.05);
}
.custom-input::placeholder {
  color: #006D4A;
  opacity: 0.8;
}

/* Botões Sociais */
.btn-social {
  background-color: white;
  color: #006D4A;
  border: none;
  transition: all 0.2s ease;
}
.btn-social:hover {
  background-color: #f1f1f1;
  transform: translateY(-2px);
}

/* Animação suave na troca de formulários */
.animation-fade-in {
  animation: fadeIn 0.4s ease-in-out;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
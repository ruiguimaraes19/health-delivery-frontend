import { reactive } from 'vue'

export const loja = reactive({
  totalItens: 0,
  
  // NOVO: Gestão de Utilizador
  usuarioLogado: null, // Começa como null (ninguém logado)
  
  // Função para fazer login (vais usar isto na tua página de Login)
  login(nomeDoUtilizador) {
    this.usuarioLogado = { nome: nomeDoUtilizador };
  },
  
  // Função para fazer logout
  logout() {
    this.usuarioLogado = null;
  }
})
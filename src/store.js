import { reactive } from 'vue'

export const loja = reactive({
  carrinho: [],
  adicionarAoCarrinho(produto, quantidade = 1) {
    // Verifica se já temos este produto no carrinho
    const itemExistente = this.carrinho.find(item => item.id === produto.id)
    if (itemExistente) {
      itemExistente.quantidade += quantidade
    } else {
      this.carrinho.push({ ...produto, quantidade })
    }
    alert(`${quantidade}x ${produto.title} adicionado ao carrinho! 🛒`)
  },
  // Conta quantos itens tens no total
  get totalItens() {
    return this.carrinho.reduce((soma, item) => soma + item.quantidade, 0)
  }
})
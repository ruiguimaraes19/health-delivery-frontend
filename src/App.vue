<template>
  <div class="d-flex flex-column min-vh-100">
    <AppHeader />
    
    <div class="flex-grow-1">
      <router-view />
    </div>

    <AppFooter />
  </div>
</template>

<script setup>
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'
</script>

<style>
/* Estilos globais como já tinhas */
body {
  background-color: #F8F9FA !important;
  font-family: 'Inter', Arial, sans-serif;
}
</style>

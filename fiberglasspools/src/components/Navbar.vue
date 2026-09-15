<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const open = ref(false)
const whatsapp = 'https://wa.me/27767401410'
const logo = `${import.meta.env.BASE_URL}images/Logo.png`

function closeMenu() { open.value = false }
</script>

<template>
  <header class="site-header">
    <div class="container header-inner">
      <RouterLink to="/" class="brand" @click="closeMenu">
        <img :src="logo" alt="Just Fibreglass Pools">
      </RouterLink>
      <nav class="desktop-nav" aria-label="Main navigation">
        <RouterLink to="/" exact-active-class="active">Home</RouterLink>
        <RouterLink to="/pools" active-class="active">Pools</RouterLink>
        <RouterLink to="/why-fibreglass" active-class="active">Why Fibreglass?</RouterLink>
        <RouterLink to="/contact" active-class="active">Contact</RouterLink>
      </nav>

      <div class="header-actions">
        <a class="whatsapp-button" :href="whatsapp" target="_blank" rel="noopener">WhatsApp us</a>
        <button class="menu-button" aria-label="Toggle menu" :aria-expanded="open" @click="open = !open">☰</button>
      </div>
    </div>

    <nav v-if="open" class="mobile-nav" aria-label="Mobile navigation">
      <RouterLink to="/" @click="closeMenu">Home</RouterLink>
      <RouterLink to="/pools" @click="closeMenu">Pools</RouterLink>
      <RouterLink to="/why-fibreglass" @click="closeMenu">Why Fibreglass?</RouterLink>
      <RouterLink to="/contact" @click="closeMenu">Contact</RouterLink>
      <a :href="whatsapp" target="_blank" rel="noopener">WhatsApp us</a>
    </nav>
  </header>
</template>

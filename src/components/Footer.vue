<script setup>
import { RouterLink } from 'vue-router'
const whatsapp = 'https://wa.me/27767401410'
const logo = `${import.meta.env.BASE_URL}images/Logo.png`
</script>

<template>
  <footer class="footer">
    <div class="container footer-inner">
      <div>
        <RouterLink to="/" class="brand footer-brand">
          <img :src="logo" alt="Just Fibreglass Pools">
        </RouterLink>
        <p>Quality fibreglass pools supplied across South Africa.</p>
      </div>
      <div class="footer-contact">
         <a :href="whatsapp" target="_blank" rel="noopener">WhatsApp</a>
        <a href="tel:+27767401410">+27 76 740 1410</a>
        <a href="tel:+27872659259">+27 87 265 9259</a>
        <a href="mailto:info@justfibreglasspools.co.za">info@justdiyit.co.za</a>
      </div>
    </div>
    <div class="container copyright">© {{ new Date().getFullYear() }} Just Fibreglass Pools South Africa</div>
  <nav class="container" aria-label="More information" style="display:flex;flex-wrap:wrap;gap:16px;padding-bottom:20px">
<RouterLink to="/about">About us</RouterLink><RouterLink to="/entrepreneur">Become an entrepreneur</RouterLink>
</nav></footer>
</template>

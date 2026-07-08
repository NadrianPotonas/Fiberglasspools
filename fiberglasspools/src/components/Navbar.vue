<script setup>
import { ref } from 'vue'
import whatsappIcon from '../assets/wa_green.svg'

const mobileOpen = ref(false)
</script>

<template>
  <header class="bg-sky-600 text-white sticky top-0 z-50 shadow-md">
    <div class="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

      <!-- Logo -->
      <h1 class="text-xl font-bold tracking-wide">
        Just Fibreglass Pools SA
      </h1>

      <nav class="hidden md:flex items-center gap-8 font-medium">

        <router-link to="/" class="hover:text-sky-200 transition">
          Home
        </router-link>

        <router-link to="/pools" class="hover:text-sky-200 transition">
          Fiberglass Pools
        </router-link>

        <router-link to="/concrete" class="hover:text-sky-200 transition">
          Concrete Pools
        </router-link>

        <!-- <router-link to="/pavement" class="hover:text-sky-200 transition">
          Pavement
        </router-link> -->

       <!--  <router-link to="/delivery" class="hover:text-sky-200 transition">
          Delivery
        </router-link> -->

        <router-link to="/contact" class="hover:text-sky-200 transition">
          Contact
        </router-link>

      </nav>

      <!-- Right Side -->
      <div class="flex items-center gap-4">

        <!-- WhatsApp -->
        <a
          href="https://wa.me/27767401410"
          target="_blank"
          rel="noopener"
          class="hidden md:inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg transition shadow-md"
        >
          <img :src="whatsappIcon" alt="WhatsApp" class="w-4 h-4" />
          <span>WhatsApp</span>
        </a>

        <!-- Mobile Toggle -->
        <button
          @click="mobileOpen = !mobileOpen"
          class="md:hidden focus:outline-none"
        >
          <svg class="w-6 h-6"
               fill="none"
               stroke="currentColor"
               stroke-width="2"
               viewBox="0 0 24 24">
            <path stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

      </div>
    </div>

    <!-- Mobile Menu -->
    <div
      v-if="mobileOpen"
      class="md:hidden bg-white text-gray-800 px-6 py-4 space-y-4 shadow-lg"
    >
      <router-link to="/" class="block">Home</router-link>

      <div>
        <p class="font-semibold mb-2">Pools</p>
        <router-link to="/pools/splash" class="block pl-4">Splash Pools</router-link>
        <router-link to="/pools/medium" class="block pl-4">Medium Pools</router-link>
        <router-link to="/pools/large" class="block pl-4">Large Pools</router-link>
        <router-link to="/pools/freestanding" class="block pl-4">Freestanding Pools</router-link>
        <router-link to="/pools/concrete" class="block pl-4">Concrete Reinforced</router-link>
      </div>

      <div>
        <p class="font-semibold mb-2">Equipment</p>
        <router-link to="/equipment/accessories" class="block pl-4">Accessories</router-link>
        <router-link to="/equipment/heating" class="block pl-4">Heating</router-link>
        <router-link to="/equipment/safety" class="block pl-4">Safety</router-link>
      </div>

      <router-link to="/gallery" class="block">Gallery</router-link>
      <router-link to="/delivery" class="block">Delivery</router-link>
      <router-link to="/contact" class="block">Contact</router-link>

      <a
        href="https://wa.me/27767401410"
        target="_blank"
        class="block bg-green-500 text-white text-center py-2 rounded-lg mt-4"
      >
        WhatsApp
      </a>
    </div>

  </header>
</template>

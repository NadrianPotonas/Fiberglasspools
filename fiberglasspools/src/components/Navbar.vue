<script setup>
import whatsappIcon from '../assets/wa_green.svg'
</script>

<template>
  <header class="bg-sky-600 text-white">
    <div class="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
      <h1 class="text-xl font-bold">
        Just Fibreglass Pools SA
      </h1>

      <nav class="space-x-6 hidden md:block">
        <router-link to="/" class="hover:underline">Home</router-link>
        <router-link to="/pools" class="hover:underline">Pools</router-link>
        <router-link to="/pricing" class="hover:underline">Pricing</router-link>
        <router-link to="/contact" class="hover:underline">Contact</router-link>
      </nav>
        <a
            href="https://wa.me/27767401410"
            target="_blank"
            rel="noopener"
            class="inline-flex items-center gap-2 text-white hover:text-green-400 transition"
            aria-label="Chat with us on WhatsApp"
        >
            <img
            :src="whatsappIcon"
            alt="WhatsApp"
            class="w-5 h-5"
            />
            <span>WhatsApp</span>
        </a>
    </div>
  </header>
</template>

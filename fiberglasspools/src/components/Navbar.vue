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
        class="bg-green-500 px-4 py-2 rounded font-semibold"
      >
        WhatsApp
      </a>
    </div>
  </header>
</template>

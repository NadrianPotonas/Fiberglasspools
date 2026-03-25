<script setup>
import PoolCard from '../components/PoolCard.vue'

const pools = [
  {
      "name": "Hudson",
      "size": "3.0m x 5.0m",
      "depth": "1.0m x 1.5m",
      "price": "R24 900",
      "image": "/Fiberglasspools/pools/Hudson.jpg"
    },
    {
      "name": "Jordan",
      "size": "3.0m x 6.4m",
      "depth": "1.0m -1.6m",
      "price": "R34 400",
      "image": "/Fiberglasspools/pools/Jordan.jpg"
    },
]

</script>

<template>
  <!-- Hero -->
  <section class="bg-sky-500 text-white py-20">
    <div class="max-w-7xl mx-auto px-6 text-center">
      <h2 class="text-4xl font-bold mb-4">
        Fibreglass Pools Delivered Nationwide
      </h2>
      <p class="text-lg mb-6">
        Supply, delivery & installation across South Africa
      </p>
      <a
        href="#pools"
        class="bg-white text-sky-600 px-6 py-3 rounded font-semibold"
      >
        View Pools
      </a>
    </div>
  </section>

  <!-- Pools -->
  <section id="pools" class="py-16 bg-gray-100">
    <div class="max-w-7xl mx-auto px-6">
      <h3 class="text-2xl font-bold mb-8 text-center">
        Popular Pool Models
      </h3>

      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        <PoolCard v-for="pool in pools" :key="pool.name" :pool="pool" />
      </div>
    </div>
  </section>
</template>

<script setup>
import PoolCard from '../components/PoolCard.vue'

const pools = [
  {
    name: 'Minnesota',
    size: '2.1m x 3.1m',
    depth: '1.3m',
    price: 'R15 900',
    image: 'https://picsum.photos/400/300?random=1',
  },
  {
    name: 'Nile',
    size: '3.0m x 4.0m',
    depth: '1.1m',
    price: 'R24 900',
    image: 'https://picsum.photos/400/300?random=2',
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

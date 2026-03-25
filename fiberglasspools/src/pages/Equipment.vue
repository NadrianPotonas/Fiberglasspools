<script setup>
import { ref } from 'vue'
import PoolCard from '../components/PoolCard.vue'
import poolsData from '../data/pools.json'

const activeSection = ref('splash')

const sections = [
  { key: 'accessories', label: 'Accessories' },
  { key: 'heating', label: 'Heating' },
  { key: 'safety', label: 'safety' },
]
</script>

<template>
  <section class="py-24 bg-gray-50">
    <div class="max-w-6xl mx-auto px-6">

      <!-- Page Title -->
      <h1 class="text-4xl font-extrabold text-center text-gray-800 mb-12">
        Our Equipment
      </h1>

      <!-- Tabs Navigation -->
      <div class="flex flex-wrap justify-center gap-4 mb-16">

        <button
          v-for="section in sections"
          :key="section.key"
          @click="activeSection = section.key"
          :class="[
            'px-6 py-3 rounded-full font-medium transition',
            activeSection === section.key
              ? 'bg-sky-600 text-white shadow-lg'
              : 'bg-white text-gray-700 hover:bg-sky-100'
          ]"
        >
          {{ section.label }}
        </button>

      </div>

      <!-- Active Section Title -->
      <div class="text-center mb-10">
        <h2 class="text-3xl font-bold text-gray-800">
          {{ sections.find(s => s.key === activeSection).label }}
        </h2>
        <div class="w-24 h-1 bg-sky-500 mx-auto mt-3 rounded-full"></div>
      </div>

      <!-- Pool Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        <PoolCard
          v-for="pool in poolsData[activeSection]"
          :key="pool.name"
          :pool="pool"
        />
      </div>

    </div>
  </section>
</template>

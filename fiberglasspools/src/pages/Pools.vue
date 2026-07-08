<script setup>
import { ref } from 'vue'
import PoolCard from '../components/PoolCard.vue'
import PoolDialog from '../components/PoolDialog.vue'
import poolsData from '../data/pools.json'

// Active tab
const activeSection = ref('small')

// Dialog state
const selectedPool = ref(null)
const showDialog = ref(false)

// Open dialog
function openPool(pool) {
  selectedPool.value = pool
  showDialog.value = true

  // 🔒 Prevent background scroll
  document.body.style.overflow = 'hidden'
}

// Close dialog
function closeDialog() {
  showDialog.value = false
  selectedPool.value = null // ✅ UX FIX (clear state)

  // 🔓 Restore scroll
  document.body.style.overflow = ''
}

// Sections
const sections = [
  { key: 'small', label: 'Small' },
  { key: 'medium', label: 'Medium' },
  { key: 'large', label: 'Large' },
  { key: 'other', label: 'Other' },
]
</script>

<template>
  <section class="py-24 bg-gray-50">
    <div class="max-w-6xl mx-auto px-6">

      <!-- Page Title -->
      <h1 class="text-4xl font-extrabold text-center text-gray-800 mb-12">
        Our Pools
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
          @select="openPool"
        />
      </div>

    </div>

    <!-- Dialog -->
    <PoolDialog
      v-if="selectedPool"
      :pool="selectedPool"
      :show="showDialog"
      @close="closeDialog"
    />
  </section>
</template>
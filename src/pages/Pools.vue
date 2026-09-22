<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import poolsData from '../data/pools.json'
import PoolDialog from '../components/PoolDialog.vue'
import PoolCard from '../components/PoolCard.vue'

const categories = [
  { key: 'all', label: 'All pools' },
  { key: 'small', label: 'Small' },
  { key: 'medium', label: 'Medium' },
  { key: 'large', label: 'Large' },
  { key: 'other', label: 'Spas & Other' },
]
const active = ref('all')
const selected = ref(null)
const allPools = Object.entries(poolsData).flatMap(([category, pools]) => pools.map(pool => ({
  ...pool,
  category,
  categoryLabel: categories.find(item => item.key === category)?.label || category,
})))
const visiblePools = () => active.value === 'all' ? allPools : allPools.filter(pool => pool.category === active.value)
</script>

<template>
  <section class="page-hero"><div class="container"><p class="eyebrow dark">Our range</p><h1>Find your pool.</h1><p>Browse the range, choose a model you like and request a quote.</p></div></section>
  <section class="pools-section page-section">
    <div class="container">
      <div class="filters"><button v-for="category in categories" :key="category.key" :class="{ active: active === category.key }" @click="active = category.key">{{ category.label }}</button></div>
      <div class="pool-grid">
        <PoolCard
          v-for="pool in visiblePools()"
          :key="`${pool.category}-${pool.name}`"
          :pool="pool"
          @select="selected = $event"
        />
      </div>
      <div class="bottom-cta"><h2>Not sure which pool is right for you?</h2><p>Send us your details and we'll help you work out the best option for your space.</p><RouterLink to="/contact" class="primary-button">Contact us <span>→</span></RouterLink></div>
    </div>
  </section>
  <PoolDialog v-if="selected" :pool="selected" @close="selected = null" />
</template>

<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import poolsData from '../data/pools.json'
import PoolDialog from '../components/PoolDialog.vue'

const categories = [
  { key: 'all', label: 'All pools' },
  { key: 'small', label: 'Small' },
  { key: 'medium', label: 'Medium' },
  { key: 'large', label: 'Large' },
  { key: 'other', label: 'Spas & Other' },
]
const active = ref('all')
const selected = ref(null)
const asset = path => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`
const allPools = Object.entries(poolsData).flatMap(([category, pools]) => pools.map(pool => ({ ...pool, category })))
const visiblePools = () => active.value === 'all' ? allPools : allPools.filter(pool => pool.category === active.value)
</script>

<template>
  <section class="page-hero"><div class="container"><p class="eyebrow dark">Our range</p><h1>Find your pool.</h1><p>Browse the range, choose a model you like and request a quote.</p></div></section>
  <section class="pools-section page-section">
    <div class="container">
      <div class="filters"><button v-for="category in categories" :key="category.key" :class="{ active: active === category.key }" @click="active = category.key">{{ category.label }}</button></div>
      <div class="pool-grid">
        <article v-for="pool in visiblePools()" :key="`${pool.category}-${pool.name}`" class="pool-card">
          <div class="pool-image-wrap"><img :src="asset(pool.image)" :alt="pool.name" class="pool-image" loading="lazy"><span class="pool-category">{{ categories.find(c => c.key === pool.category)?.label }}</span></div>
          <div class="pool-info"><h3>{{ pool.name }}</h3><p>{{ pool.size }} <span>•</span> {{ pool.depth }}</p><div class="pool-bottom"><strong>{{ pool.price !== 'R0' ? `From ${pool.price}` : 'Price on request' }}</strong><button class="quote-button" @click="selected = pool">Request quote <span>→</span></button></div></div>
        </article>
      </div>
      <div class="bottom-cta"><h2>Not sure which pool is right for you?</h2><p>Send us your details and we'll help you work out the best option for your space.</p><RouterLink to="/contact" class="primary-button">Contact us <span>→</span></RouterLink></div>
    </div>
  </section>
  <PoolDialog v-if="selected" :pool="selected" @close="selected = null" />
</template>

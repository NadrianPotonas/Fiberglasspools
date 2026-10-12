<script setup>
import { computed } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import poolsData from '../data/pools.json'
import PoolCard from '../components/PoolCard.vue'

const route = useRoute()
const router = useRouter()

const categories = [
  { key: 'all', label: 'All pools' },
  { key: 'small', label: 'Splash Pools' },
  { key: 'medium', label: 'Medium Pools' },
  { key: 'large', label: 'Large Pools' },
  { key: 'gardenspas', label: 'Garden Spas' },
  { key: 'freestanding', label: 'Freestanding Pools' },
]

const active = computed(() => {
  const category = route.query.category

  return categories.some(item => item.key === category)
    ? category
    : 'all'
})

const allPools = Object.entries(poolsData).flatMap(
  ([category, pools]) =>
    pools.map(pool => ({
      ...pool,
      category,
      categoryLabel:
        categories.find(item => item.key === category)?.label || category,
    }))
)

const visiblePools = computed(() =>
  active.value === 'all'
    ? allPools
    : allPools.filter(pool => pool.category === active.value)
)

function selectCategory(category) {
  router.replace({
    path: '/pools',
    query: {
      ...route.query,
      category: category === 'all' ? undefined : category,
    },
  })
}
</script>

<template>
  <section class="page-hero">
    <div class="container">
      <p class="eyebrow dark">Our range</p>
      <h1>Find your pool.</h1>
      <p>
        Browse the range, choose a model you like and request a quote.
      </p>
    </div>
  </section>

  <section class="pools-section page-section">
    <div class="container">
      <div class="filters" aria-label="Filter pools">
        <button
          v-for="category in categories"
          :key="category.key"
          type="button"
          :class="{ active: active === category.key }"
          :aria-pressed="active === category.key"
          @click="selectCategory(category.key)"
        >
          {{ category.label }}
        </button>
      </div>

      <div v-if="visiblePools.length" class="pool-grid">
        <PoolCard
          v-for="pool in visiblePools"
          :key="`${pool.category}-${pool.name}`"
          :pool="pool"
        />
      </div>

      <p v-else class="empty-message">
        No pools are currently listed in this category.
      </p>

      <div class="bottom-cta">
        <h2>Not sure which pool is right for you?</h2>
        <p>
          Send us your details and we'll help you work out the best
          option for your space.
        </p>

        <RouterLink to="/contact" class="primary-button">
          Contact us
          <span aria-hidden="true">→</span>
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
.empty-message {
  padding: 40px 20px;
  text-align: center;
  color: #64748b;
}

.filters button:focus-visible {
  outline: 3px solid #38bdf8;
  outline-offset: 4px;
}
</style>
<script setup>
import { computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { pools, slug } from '../catalog'
import PoolDialog from '../components/PoolDialog.vue'

const route = useRoute()
const pool = computed(() =>
  pools.find(p => slug(p.name) === route.params.slug)
)
</script>

<template>
  <section v-if="pool" class="quote-page">
    <div class="container">
      <RouterLink to="/pools" class="back-link">
        <span aria-hidden="true">←</span>
        All pools
      </RouterLink>

      <header class="quote-heading">
        <h1>Request a quote for <span>{{ pool.name }}</span></h1>
        <p class="quote-intro">
          Tell us a little about your project and we'll help with the details.
        </p>
      </header>

      <PoolDialog :key="pool.name" :pool="pool" inline />
    </div>
  </section>
</template>

<style scoped>
.quote-page {
  padding: 40px 0 72px;
  background: linear-gradient(160deg, #f0f9ff, #f8fafc 60%);
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 32px;
  padding: 10px 18px;
  color: #0369a1;
  background: #fff;
  border: 1px solid #bae6fd;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 700;
  text-decoration: none;
  transition: background 0.2s, border-color 0.2s;
}

.back-link:hover {
  background: #e0f2fe;
  border-color: #7dd3fc;
}

.back-link:focus-visible {
  outline: 3px solid #38bdf8;
  outline-offset: 4px;
}

.quote-heading {
  max-width: 760px;
  margin: 0 auto 32px;
  text-align: center;
}

.quote-eyebrow {
  margin: 0 0 12px;
  color: #0369a1;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 1.5px;
  text-transform: uppercase;
}

.quote-heading h1 {
  margin: 0;
  color: #0f172a;
  font-size: clamp(28px, 4vw, 44px);
  font-weight: 900;
  line-height: 1.2;
  letter-spacing: -1px;
  overflow-wrap: anywhere;
}

.quote-heading h1 span {
  color: #0284c7;
}

.quote-intro {
  max-width: 480px;
  margin: 16px auto 0;
  color: #64748b;
  font-size: 16px;
  line-height: 1.7;
}

.quote-page :deep(.quote-inline) {
  margin-top: 0;
}

.quote-page :deep(.quote-modal) {
  border: 1px solid #e2e8f0;
  box-shadow: 0 16px 48px rgb(15 23 42 / 8%);
}

@media (max-width: 480px) {
  .quote-page {
    padding: 24px 0 48px;
  }

  .back-link {
    margin-bottom: 24px;
  }

  .quote-heading {
    margin-bottom: 24px;
  }

  .quote-intro {
    font-size: 14px;
  }
}
</style>
<script setup>
import { RouterLink, useRouter } from "vue-router"
import { slug } from "../catalog"
const props = defineProps({
  pool: Object,
})

const router = useRouter()

const asset = (path) => {
  if (!path) return ''
  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`
}
</script>

<template>
  <article
    class="pool-card"
    @click="router.push(`/pools/${slug(pool.name)}`)"
  >
    <!-- IMAGE -->
    <div class="pool-image-wrap">
      <div class="pool-photo">
        <img
          v-if="pool.installationImage"
          :src="asset(pool.installationImage)"
          :alt="`${pool.name} installation`"
          class="pool-image"
          loading="lazy"
        />

        <div
          v-else
          class="pool-photo-placeholder"
        >
          <span class="placeholder-icon">📷</span>
          <span>Photo coming soon</span>
        </div>
      </div>
    </div>

    <!-- INFO -->
    <div class="pool-info">
      <h3>
        {{ pool.name }}
      </h3>

      <p class="pool-details">
        <span class="pool-detail">
          <span class="detail-icon">↔</span>
          {{ pool.size }}
        </span>

        <span class="pool-detail">
          <span class="detail-icon">↕</span>
          {{ pool.depth }}
        </span>
      </p>

      <div class="pool-bottom">
        <strong>
          {{
            pool.price !== 'R0'
              ? `Shell Price: ${pool.price}`
              : 'Price on request'
          }}
        </strong>

        <RouterLink
          class="quote-button"
          :to="`/pools/${slug(pool.name)}`"
          @click.stop
        >
          Request a quote
          <span>→</span>
        </RouterLink>
      </div>
    </div>
</article>
</template>

<style scoped>
.pool-card {
  @apply bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition duration-300;
}


/* =========================================
   IMAGE AREA
========================================= */

.pool-image-wrap {
  background: #f1f5f9;
  padding: 12px;
}


/* =========================================
   IMAGE FRAME
========================================= */

.pool-photo {
  @apply relative flex items-center justify-center overflow-hidden rounded-xl;

  width: 100%;
  height: 300px;
  background: #ffffff;
}


/* =========================================
   IMAGE
========================================= */

.pool-image {
  width: 100%;
  height: 100%;

  object-fit: contain;

  padding: 4px;
  box-sizing: border-box;

  transition: transform 0.3s ease;
}


/* =========================================
   IMAGE HOVER
========================================= */

.pool-card:hover .pool-image {
  transform: scale(1.03);
}


/* =========================================
   PLACEHOLDER
========================================= */

.pool-photo-placeholder {
  @apply flex flex-col items-center justify-center gap-2 px-3 text-center text-xs font-semibold text-slate-400;
}

.placeholder-icon {
  font-size: 22px;
  opacity: 0.6;
}


/* =========================================
   POOL INFORMATION
========================================= */

.pool-info {
  @apply p-5;
}

.pool-info h3 {
  @apply text-2xl font-black tracking-tight mb-1;
}

.pool-details {
  @apply flex items-center  gap-5 mt-2 text-sm text-slate-500;
}

.pool-detail {
  @apply flex items-center gap-2;
}

.detail-icon {
  @apply flex items-center justify-center w-7 h-7 rounded-lg bg-sky-50 text-sky-600 font-bold;
  font-size: 16px;
}

.pool-info p span {
  @apply text-sky-500 px-1;
}


/* =========================================
   PRICE + BUTTON
========================================= */

.pool-bottom {
  @apply mt-6 pt-5 border-t border-slate-100 flex flex-col gap-4;
}

.pool-bottom strong {
  @apply text-base text-slate-900;
}

.quote-button {
  @apply w-full rounded-xl bg-sky-600 hover:bg-sky-700 text-white px-4 py-3 font-bold transition flex items-center justify-center gap-3;
}


/* =========================================
   MOBILE
========================================= */

@media (max-width: 480px) {
  .pool-image-wrap {
    padding: 8px;
  }

  .pool-photo {
    height: 240px;
  }

  .pool-image {
    padding: 3px;
  }
}
</style>
<script setup>

const props = defineProps({
  pool: Object,
})

const emit = defineEmits(["select"])

const asset = (path) => {
  if (!path) return ''
  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`
}

</script>

<template>

  <article
    class="pool-card"
    @click="emit('select', pool)"
  >

    <div class="pool-image-wrap">

      <div class="pool-image-grid">

        <!-- SHELL -->

        <div class="pool-photo shell-photo">

          <span class="pool-photo-label">
            Shell
          </span>

          <img
            v-if="pool.shellImage || pool.image"
            :src="asset(pool.shellImage || pool.image)"
            :alt="`${pool.name} shell`"
            class="pool-image"
            loading="lazy"
          />

          <div
            v-else
            class="pool-photo-placeholder"
          >
            Shell photo not set
          </div>

        </div>

        <!-- INSTALLATION -->

        <div class="pool-photo installation-photo">

          <span class="pool-photo-label">
            Installation
          </span>

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
            <span>Installation photo coming soon</span>
          </div>

        </div>

      </div>

    </div>

    <div class="pool-info">

      <h3>
        {{ pool.name }}
      </h3>

      <p>
        {{ pool.size }}
        <span>•</span>
        {{ pool.depth }}
      </p>

      <div class="pool-bottom">

        <strong>
          {{ pool.price !== 'R0'
            ? `Shell Price: ${pool.price}`
            : 'Price on request'
          }}
        </strong>

        <button
          class="quote-button"
          @click.stop="emit('select', pool)"
        >
          Request quote
          <span>→</span>
        </button>

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

.pool-image-grid {
  @apply grid grid-cols-2 gap-3;
}


/* =========================================
   INDIVIDUAL PHOTO FRAMES
========================================= */

.pool-photo {
  @apply relative flex items-center justify-center overflow-hidden rounded-xl;

  height: 205px;
  background: #ffffff;
}


/* =========================================
   ALL IMAGES
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
   PHOTO LABEL
========================================= */

.pool-photo-label {
  @apply absolute top-3 left-3 z-10 rounded-full bg-slate-900/75 text-white px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider;
}


/* =========================================
   PHOTO PLACEHOLDER
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

.pool-info p {
  @apply text-sm text-slate-500;
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

  .pool-image-grid {
    gap: 8px;
  }

  .pool-photo {
    height: 190px;
  }

  .pool-image {
    padding: 3px;
  }

  .pool-photo-label {
    top: 8px;
    left: 8px;
    font-size: 9px;
    padding: 5px 7px;
  }

}

</style>
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
        <div class="pool-photo">
          <span class="pool-photo-label">Shell</span>
          <img
            v-if="pool.shellImage || pool.image"
            :src="asset(pool.shellImage || pool.image)"
            :alt="`${pool.name} shell`"
            class="pool-image"
            loading="lazy"
          />
          <div v-else class="pool-photo-placeholder">Shell photo not set</div>
        </div>

        <div class="pool-photo">
          <span class="pool-photo-label">Installation</span>
          <img
            v-if="pool.installationImage"
            :src="asset(pool.installationImage)"
            :alt="`${pool.name} installation`"
            class="pool-image"
            loading="lazy"
          />
          <div v-else class="pool-photo-placeholder">Installation photo not set</div>
        </div>
      </div>
    </div>

    <div class="pool-info">
      <h3>{{ pool.name }}</h3>
      <p>{{ pool.size }} <span>•</span> {{ pool.depth }}</p>

      <div class="pool-bottom">
        <strong>{{ pool.price !== 'R0' ? `From ${pool.price}` : 'Price on request' }}</strong>
        <button class="quote-button" @click.stop="emit('select', pool)">
          Request quote <span>→</span>
        </button>
      </div>
    </div>
  </article>
</template>

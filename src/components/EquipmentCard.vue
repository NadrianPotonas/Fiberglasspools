<script setup>
import { RouterLink } from 'vue-router'

defineProps({
  equipment: {
    type: Object,
    required: true,
  },
})

const asset = (path) => {
  if (!path) return ''
  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`
}
</script>

<template>
  <article class="equipment-card">
    <div class="equipment-image-wrap">
      <img
        v-if="equipment.image"
        :src="asset(equipment.image)"
        :alt="equipment.name"
        class="equipment-image"
        loading="lazy"
      >

      <div v-else class="equipment-placeholder">
        Image coming soon
      </div>
    </div>

    <div class="equipment-info">
      <h2>{{ equipment.name }}</h2>

      <RouterLink
        :to="{
          path: '/contact',
          query: { equipment: equipment.name }
        }"
        class="equipment-enquire"
        :aria-label="`Enquire about ${equipment.name}`"
      >
        Enquire
        <span aria-hidden="true">→</span>
      </RouterLink>
    </div>
  </article>
</template>

<style scoped>
.equipment-card {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 20px;
  box-shadow: 0 6px 20px rgb(15 23 42 / 5%);
  transition: box-shadow 0.2s, transform 0.2s;
}

.equipment-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 14px 32px rgb(15 23 42 / 10%);
}

.equipment-image-wrap {
  height: 280px;
  padding: 20px;
  background: #f8fafc;
}

.equipment-image {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.equipment-placeholder {
  display: grid;
  place-items: center;
  height: 100%;
  color: #94a3b8;
  font-size: 14px;
}

.equipment-info {
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 24px;
}

.equipment-info h2 {
  margin: 0 0 24px;
  color: #0f172a;
  font-size: 23px;
  font-weight: 800;
  line-height: 1.3;
}

.equipment-enquire {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-top: auto;
  padding: 13px 20px;
  background: #0284c7;
  color: #fff;
  border-radius: 12px;
  font-weight: 700;
  text-decoration: none;
  transition: background 0.2s;
}

.equipment-enquire:hover {
  background: #0369a1;
}

.equipment-enquire:focus-visible {
  outline: 3px solid #38bdf8;
  outline-offset: 4px;
}

@media (max-width: 480px) {
  .equipment-image-wrap {
    height: 240px;
  }

  .equipment-info {
    padding: 20px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .equipment-card,
  .equipment-enquire {
    transition: none;
  }

  .equipment-card:hover {
    transform: none;
  }
}
</style>
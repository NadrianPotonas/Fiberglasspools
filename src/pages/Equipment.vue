<script setup>
import EquipmentCard from '../components/EquipmentCard.vue'
import equipmentData from '../data/equipment.json'
</script>

<template>
  <section class="page-hero">
    <div class="container">
      <p class="eyebrow dark">Pool equipment</p>
      <h1>Equipment for your pool.</h1>
      <p>Browse our equipment and enquire about the items you need.</p>
    </div>
  </section>

  <section class="equipment-section">
    <div class="container">
      <div v-if="equipmentData.length" class="equipment-grid">
        <EquipmentCard
          v-for="equipment in equipmentData"
          :key="equipment.id"
          :equipment="equipment"
        />
      </div>

      <p v-else class="equipment-empty">
        Equipment will be added soon.
      </p>
    </div>
  </section>
</template>

<style scoped>
.equipment-section {
  padding: 48px 0 72px;
  background: #f8fafc;
}

.equipment-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 24px;
}

.equipment-empty {
  padding: 40px;
  text-align: center;
  color: #64748b;
}

@media (max-width: 900px) {
  .equipment-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 560px) {
  .equipment-section {
    padding: 32px 0 48px;
  }

  .equipment-grid {
    grid-template-columns: 1fr;
  }
}
</style>
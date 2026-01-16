<script setup>
defineProps({
  pool: Object,
})
</script>

<template>
  <div class="bg-white rounded-lg shadow hover:shadow-lg transition">
    <!-- Image placeholder -->
    <div class="h-48 bg-sky-200 flex items-center justify-center text-sky-700 font-semibold">
      <img
        :src="pool.image"
        :alt="pool.name"
        class="w-full h-48 object-cover rounded-t-lg"
        />
    </div>

    <div class="p-4">
      <h4 class="font-bold text-lg mb-2">{{ pool.name }}</h4>
      <p class="text-sm text-gray-600">
        Size: {{ pool.size }}<br />
        Depth: {{ pool.depth }}
      </p>

      <p class="mt-3 font-bold text-sky-600">
        {{ pool.price }}
      </p>
    </div>
  </div>
</template>

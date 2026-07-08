<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import PoolCard from '../components/PoolCard.vue'

const featuredPools = [
  {
    title: 'Winter Special',
    description: 'Get up to 15% off selected fibreglass pools.',
    image: '/Fiberglasspools/pools/Hudson.jpg'
  },
  {
    title: 'Free Delivery Promotion',
    description: 'Free delivery on selected pool installations.',
    image: '/Fiberglasspools/specials/special2.jpg'
  }
]
const reliningSlider = ref(50)
const services = [
  {
    title: 'Fibreglass Pools',
    description:
      'Supply and installation of premium fibreglass pools in various sizes and designs.',
    image: '/Fiberglasspools/services/fiberglass.jpg'
  },
  {
    title: 'Concrete Pools',
    description:
      'Custom-designed concrete pools built to your exact specifications.',
    image: '/Fiberglasspools/services/concrete.jpg'
  },
  {
    title: 'Pool Relining',
    description:
      'Restore and modernise your existing pool with professional relining services.',
    beforeImage: '/Fiberglasspools/public/LiningBefore.jpeg',
    afterImage: '/Fiberglasspools/public/LiningAfter.jpeg'
}
]

const currentSlide = ref(0)
let interval = null

onMounted(() => {
  interval = setInterval(() => {
    currentSlide.value =
      (currentSlide.value + 1) % featuredPools.length
  }, 5000)
})

onUnmounted(() => {
  clearInterval(interval)
})
</script>

<template>
  <!-- Featured Specials -->
  <section class="relative h-[500px] overflow-hidden">
    <div
      v-for="(slide, index) in featuredPools"
      :key="index"
      class="absolute inset-0 transition-opacity duration-700"
      :class="currentSlide === index ? 'opacity-100' : 'opacity-0'"
    >
      <img
        :src="slide.image"
        :alt="slide.title"
        class="w-full h-full object-cover"
      />

      <div
        class="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-center text-white px-6"
      >
        <h1 class="text-4xl md:text-5xl font-bold mb-4">
          {{ slide.title }}
        </h1>

        <p class="text-lg md:text-xl mb-6 max-w-2xl">
          {{ slide.description }}
        </p>

        <a
          href="#services"
          class="bg-sky-500 hover:bg-sky-600 px-6 py-3 rounded-lg font-semibold"
        >
          Learn More
        </a>
      </div>
    </div>

    <!-- Indicators -->
    <div
      class="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3"
    >
      <button
        v-for="(_, index) in featuredPools"
        :key="index"
        @click="currentSlide = index"
        class="w-3 h-3 rounded-full"
        :class="
          currentSlide === index
            ? 'bg-white'
            : 'bg-white/50'
        "
      />
    </div>
  </section>

  <!-- What We Do -->
  <section id="services" class="py-16 bg-gray-100">
    <div class="max-w-7xl mx-auto px-6">
      <h2 class="text-3xl font-bold text-center mb-12">
        What We Do
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div
          v-for="service in services"
          :key="service.title"
          class="bg-white rounded-xl shadow-lg overflow-hidden"
        >
          <div
            v-if="service.beforeImage"
            class="relative h-56 overflow-hidden"
          >
            <!-- Before -->
            <img
              :src="service.afterImage"
              class="absolute inset-0 w-full h-full object-cover"
            />

            <!-- After -->
            <div
              class="absolute inset-0 overflow-hidden"
              :style="{ width: reliningSlider + '%' }"
            >
              <img
                :src="service.beforeImage"
                class="w-full h-full object-cover"
              />
            </div>

            <!-- Divider -->
            <div
              class="absolute top-0 bottom-0 w-1 bg-white"
              :style="{ left: reliningSlider + '%' }"
            >
              <div
                class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                      w-8 h-8 rounded-full bg-white shadow flex items-center justify-center"
              >
                ↔
              </div>
            </div>

            <!-- Labels -->
            <span class="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
              Before
            </span>

            <span class="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
              After
            </span>

            <!-- Slider -->
            <input
              type="range"
              min="0"
              max="100"
              v-model="reliningSlider"
              class="absolute inset-0 opacity-0 cursor-ew-resize"
            />
          </div>

          <img
            v-else
            :src="service.image"
            :alt="service.title"
            class="h-56 w-full object-cover"
          />

          <div class="p-6">
            <h3 class="text-xl font-bold mb-3">
              {{ service.title }}
            </h3>

            <p class="text-gray-600">
              {{ service.description }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
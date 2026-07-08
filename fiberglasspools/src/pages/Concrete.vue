<script setup>
const gallery = [
  '/ConcretePools/pool1.jpg',
  '/ConcretePools/pool2.jpg',
  '/ConcretePools/pool3.jpg',
  '/ConcretePools/pool4.jpg',
  '/ConcretePools/pool5.jpg',
  '/ConcretePools/pool6.jpg',
]
</script>

<template>
  <!-- Hero / Information Section -->
  <section class="py-24 bg-gray-50">
    <div class="max-w-6xl mx-auto px-6 text-center">
      <h1 class="text-4xl font-extrabold text-gray-800 mb-6">
        Custom Concrete Pools
      </h1>

      <p class="text-lg text-gray-600 max-w-4xl mx-auto leading-8 mb-6">
        Looking for a completely custom swimming pool? Our concrete pools are
        designed and built to your exact requirements. Unlike fibreglass pools,
        concrete pools can be constructed in almost any shape, size, and depth,
        giving you complete freedom to create your dream pool.
      </p>

      <p class="text-lg text-gray-600 max-w-4xl mx-auto leading-8 mb-10">
        Whether you want an infinity pool, lap pool, plunge pool, beach entry,
        built-in seating, tanning ledges, or a unique custom design, we can make
        it happen.
      </p>

      <div
        class="bg-white rounded-2xl shadow-lg p-8 max-w-4xl mx-auto text-left"
      >
        <h2 class="text-2xl font-bold text-gray-800 mb-4">
          Request a Quote
        </h2>

        <p class="text-gray-600 mb-4">
          To provide an accurate quotation, please contact us with the following
          information:
        </p>

        <ul class="space-y-3 text-gray-700 list-disc pl-6">
          <li>Desired pool size (length, width, and depth).</li>
          <li>Your preferred pool shape or custom design.</li>
          <li>Any special features you would like included.</li>
          <li>Your location for delivery and installation.</li>
          <li>Any photos or sketches of your dream pool.</li>
        </ul>

        <div class="mt-8 text-center">
          <RouterLink
            to="/contact"
            class="inline-block bg-sky-500 hover:bg-sky-600 text-white font-semibold px-8 py-3 rounded-lg transition"
          >
            Contact Us
          </RouterLink>
        </div>
      </div>
    </div>
  </section>

  <!-- Gallery Section -->
  <section class="py-24 bg-white">
    <div class="max-w-7xl mx-auto px-6">
      <h2 class="text-3xl font-bold text-center text-gray-800 mb-4">
        Our Concrete Pool Projects
      </h2>

      <p class="text-center text-gray-600 mb-12">
        Take a look at some of the custom concrete pools we've built for our
        clients.
      </p>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="(image, index) in gallery"
          :key="index"
          class="overflow-hidden rounded-2xl shadow-lg"
        >
          <img
            :src="image"
            :alt="`Concrete Pool ${index + 1}`"
            class="w-full h-72 object-cover hover:scale-105 transition duration-500"
          />
        </div>
      </div>
    </div>
  </section>
</template>
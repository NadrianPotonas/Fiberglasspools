<script setup>
import { ref } from 'vue'

const form = ref({
  name: '',
  email: '',
  phone: '',
  message: ''
})

const submitForm = () => {
  console.log(form.value)
  alert("Thank you! We'll contact you shortly.")
}
</script>

<template>
  <section class="bg-gray-50 py-24">
    <div class="max-w-6xl mx-auto px-6">

      <!-- Page Header -->
      <div class="text-center mb-16">
        <h1 class="text-4xl font-extrabold text-gray-800 mb-4">
          Contact Us
        </h1>
        <p class="text-gray-600 max-w-2xl mx-auto">
          Get in touch for a quote, consultation, or any questions about our pools and equipment.
        </p>
        <div class="w-24 h-1 bg-sky-500 mx-auto mt-6 rounded-full"></div>
      </div>

      <!-- Contact Grid -->
      <div class="grid md:grid-cols-2 gap-16">

        <!-- Left: Contact Details -->
        <div class="space-y-8">

          <div>
            <h3 class="text-xl font-bold text-gray-800 mb-2">Phone</h3>
            <p class="text-gray-600">+27 76 740 1410</p>
          </div>

          <div>
            <h3 class="text-xl font-bold text-gray-800 mb-2">Email</h3>
            <p class="text-gray-600">info@justfibreglasspools.co.za</p>
          </div>

          <div>
            <h3 class="text-xl font-bold text-gray-800 mb-2">Location</h3>
            <p class="text-gray-600">South Africa</p>
          </div>

          <!-- WhatsApp CTA -->
          <a
            href="https://wa.me/27767401410"
            target="_blank"
            class="inline-block bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg shadow-md transition"
          >
            Chat With Us on WhatsApp
          </a>

        </div>

        <!-- Right: Contact Form -->
        <div class="bg-white shadow-xl rounded-2xl p-8">

          <form @submit.prevent="submitForm" class="space-y-6">

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                v-model="form.name"
                type="text"
                required
                class="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-sky-500 focus:outline-none"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                v-model="form.email"
                type="email"
                required
                class="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-sky-500 focus:outline-none"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                v-model="form.phone"
                type="tel"
                class="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-sky-500 focus:outline-none"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                v-model="form.message"
                rows="5"
                required
                class="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-sky-500 focus:outline-none"
              ></textarea>
            </div>

            <button
              type="submit"
              class="w-full bg-sky-600 hover:bg-sky-700 text-white font-semibold py-3 rounded-lg transition shadow-md"
            >
              Send Message
            </button>

          </form>

        </div>
      </div>
    </div>
  </section>
</template>

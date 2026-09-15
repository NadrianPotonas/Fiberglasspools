<script setup>
import { ref } from 'vue'
const props = defineProps({ pool: { type: Object, required: true } })
const emit = defineEmits(['close'])
const form = ref({ name: '', email: '', phone: '', location: '', message: '' })
const sent = ref(false)
const asset = path => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`
function submitQuote() {
  const subject = `Quote request - ${props.pool.name}`
  const body = [
    `Pool: ${props.pool.name}`,
    `Size: ${props.pool.size}`,
    `Depth: ${props.pool.depth}`,
    '',
    `Name: ${form.value.name}`,
    `Email: ${form.value.email}`,
    `Phone: ${form.value.phone}`,
    `Location: ${form.value.location}`,
    '',
    form.value.message || 'No additional message.'
  ].join('\n')
  window.location.href = `mailto:info@justfibreglasspools.co.za?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  sent.value = true
}
</script>

<template>
  <div class="modal-backdrop" @click.self="emit('close')">
    <section class="quote-modal" role="dialog" aria-modal="true" aria-label="Request a pool quote">
      <button class="modal-close" aria-label="Close" @click="emit('close')">×</button>
      <div class="modal-pool"><img :src="asset(pool.image)" :alt="pool.name"><div><p class="eyebrow dark">Selected pool</p><h2>{{ pool.name }}</h2><p>{{ pool.size }} <span>•</span> {{ pool.depth }}</p><strong>{{ pool.price !== 'R0' ? `From ${pool.price}` : 'Price on request' }}</strong></div></div>
      <div v-if="!sent"><div class="modal-heading"><h3>Request your quote.</h3><p>We'll receive your enquiry by email.</p></div><form class="quote-form" @submit.prevent="submitQuote"><label>Name<input v-model="form.name" required placeholder="Your name"></label><label>Email<input v-model="form.email" required type="email" placeholder="you@example.com"></label><label>Phone<input v-model="form.phone" required type="tel" placeholder="Your phone number"></label><label>Location<input v-model="form.location" required placeholder="City / area"></label><label class="full">Message<textarea v-model="form.message" rows="3" placeholder="Optional"></textarea></label><button class="submit-button full" type="submit">Send quote request by email <span>→</span></button></form></div>
      <div v-else class="success-state"><div class="success-icon">✓</div><h3>Your quote request is ready.</h3><p>Your email app should have opened with the pool details included.</p><button class="submit-button" @click="emit('close')">Done</button></div>
    </section>
  </div>
</template>

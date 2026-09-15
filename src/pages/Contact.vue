<script setup>
import { ref } from 'vue'
const form = ref({ name: '', email: '', phone: '', location: '', message: '' })
const sent = ref(false)
const submitForm = () => {
  const subject = `Pool enquiry from ${form.value.name}`
  const body = [`Name: ${form.value.name}`, `Email: ${form.value.email}`, `Phone: ${form.value.phone || 'Not provided'}`, `Location: ${form.value.location || 'Not provided'}`, '', form.value.message].join('\n')
  window.location.href = `mailto:info@justfibreglasspools.co.za?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  sent.value = true
}
</script>

<template>
  <section class="page-hero"><div class="container"><p class="eyebrow dark">Get in touch</p><h1>Contact us.</h1><p>Have a question or ready to ask for a quote? Send us an email and we'll get back to you.</p></div></section>
  <section class="page-section contact-section"><div class="container contact-grid">
    <div class="contact-details">
      <p class="eyebrow dark">Contact details</p><h2>Let's talk pools.</h2><p>Tell us what you're looking for and where you're located. We'll take it from there.</p>
      <div class="detail-list">
        <div><span>Phone</span><a href="tel:+27767401410">+27 76 740 1410</a></div>
        <div><span>Email</span><a href="mailto:info@justfibreglasspools.co.za">info@justfibreglasspools.co.za</a></div>
        <div><span>WhatsApp</span><a href="https://wa.me/27767401410" target="_blank" rel="noopener">Chat with us on WhatsApp →</a></div>
      </div>
    </div>
    <div class="contact-form-card">
      <h2>Send an enquiry</h2><p>Your email app will open with your message ready to send.</p>
      <form class="contact-form" @submit.prevent="submitForm">
        <label>Full name<input v-model="form.name" required type="text" placeholder="Your name"></label>
        <label>Email address<input v-model="form.email" required type="email" placeholder="you@example.com"></label>
        <label>Phone number<input v-model="form.phone" type="tel" placeholder="Your phone number"></label>
        <label>Location<input v-model="form.location" type="text" placeholder="City / area"></label>
        <label class="full">Message<textarea v-model="form.message" required rows="5" placeholder="Tell us what you need..."></textarea></label>
        <button class="submit-button full" type="submit">Send by email <span>→</span></button>
      </form>
      <p v-if="sent" class="form-note">Your email app should have opened. If it didn't, email us directly at <a href="mailto:info@justfibreglasspools.co.za">info@justfibreglasspools.co.za</a>.</p>
    </div>
  </div></section>
</template>

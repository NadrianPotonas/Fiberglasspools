<script setup>
import { ref } from 'vue'

const form = ref({
  name: '',
  email: '',
  phone: '',
  location: '',
  message: '',
})

const sending = ref(false)
const sent = ref(false)
const error = ref('')

async function submitForm() {
  if (sending.value) return

  sending.value = true
  sent.value = false
  error.value = ''

  const message = [
    `Phone: ${form.value.phone || 'Not provided'}`,
    `Location: ${form.value.location || 'Not provided'}`,
    '',
    form.value.message,
  ].join('\n')

  try {
    const response = await fetch(
      `${import.meta.env.BASE_URL}send-email.php`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: form.value.name,
          email: form.value.email,
          subject: `Pool enquiry from ${form.value.name}`,
          message,
        }),
      }
    )

    const data = await response.json()

    if (!response.ok || data.success !== true) {
      throw new Error(data.message || 'Your enquiry could not be sent.')
    }

    sent.value = true

    form.value = {
      name: '',
      email: '',
      phone: '',
      location: '',
      message: '',
    }
  } catch (err) {
    error.value =
      err instanceof SyntaxError
        ? 'The email service is unavailable. Please contact us directly.'
        : err.message || 'Unable to send. Please try again.'
  } finally {
    sending.value = false
  }
}
</script>

<template>
  <section class="page-hero">
    <div class="container">
      <p class="eyebrow dark">Get in touch</p>
      <h1>Contact us.</h1>
      <p>
        Have a question or ready to ask for a quote?
        Send us an enquiry and we'll get back to you.
      </p>
    </div>
  </section>

  <section class="page-section contact-section">
    <div class="container contact-grid">
      <div class="contact-details">
        <p class="eyebrow dark">Contact details</p>
        <h2>Let's talk pools.</h2>
        <p>
          Tell us what you're looking for and where you're located.
          We'll take it from there.
        </p>

        <div class="detail-list">
          <div>
            <span>Phone</span>
            <a href="tel:+27767401410">+27 76 740 1410</a>
          </div>

          <div>
            <span>Email</span>
            <a href="mailto:info@justfibreglasspools.co.za">
              info@justfibreglasspools.co.za
            </a>
          </div>

          <div>
            <span>WhatsApp</span>
            <a
              href="https://wa.me/27767401410"
              target="_blank"
              rel="noopener"
            >
              Chat with us on WhatsApp →
            </a>
          </div>
        </div>
      </div>

      <div class="contact-form-card">
        <h2>Send an enquiry</h2>
        <p>Complete the form and send your message directly to our team.</p>

        <form
          class="contact-form"
          :aria-busy="sending"
          @submit.prevent="submitForm"
        >
          <label>
            Full name
            <input
              v-model="form.name"
              required
              type="text"
              autocomplete="name"
              maxlength="100"
              placeholder="Your name"
              :disabled="sending"
            >
          </label>

          <label>
            Email address
            <input
              v-model="form.email"
              required
              type="email"
              autocomplete="email"
              maxlength="254"
              placeholder="you@example.com"
              :disabled="sending"
            >
          </label>

          <label>
            Phone number
            <input
              v-model="form.phone"
              type="tel"
              autocomplete="tel"
              maxlength="40"
              placeholder="Your phone number"
              :disabled="sending"
            >
          </label>

          <label>
            Location
            <input
              v-model="form.location"
              type="text"
              maxlength="150"
              placeholder="City / area"
              :disabled="sending"
            >
          </label>

          <label class="full">
            Message
            <textarea
              v-model="form.message"
              required
              rows="5"
              maxlength="5000"
              placeholder="Tell us what you need..."
              :disabled="sending"
            ></textarea>
          </label>

          <button
            class="send-button full"
            type="submit"
            :disabled="sending"
          >
            <span v-if="sending" class="spinner" aria-hidden="true"></span>
            {{ sending ? 'Sending…' : 'Send enquiry' }}
            <span v-if="!sending" aria-hidden="true">→</span>
          </button>
        </form>

        <p v-if="sent" class="status-message success-message" role="status">
          Your enquiry has been submitted. Thank you for contacting us.
        </p>

        <p v-if="error" class="status-message error-message" role="alert">
          {{ error }}
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.send-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  width: 100%;
  height: 50px;
  padding: 16px 24px;
  border: 0;
  border-radius: 14px;
  background: #0284c7;
  color: #fff;
  font: inherit;
  font-weight: 800;
  cursor: pointer;
  box-shadow: 0 6px 18px rgb(2 132 199 / 20%);
  transition: background 0.2s, box-shadow 0.2s;
}

.send-button:hover:not(:disabled) {
  background: #0369a1;
  box-shadow: 0 8px 24px rgb(2 132 199 / 28%);
}

.send-button:focus-visible {
  outline: 3px solid #38bdf8;
  outline-offset: 4px;
}

.send-button:disabled {
  opacity: 0.65;
  cursor: wait;
  box-shadow: none;
}

.spinner {
  width: 18px;
  height: 18px;
  border: 2px solid rgb(255 255 255 / 35%);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

.status-message {
  margin-top: 20px;
  padding: 14px 18px;
  border: 1px solid;
  border-radius: 12px;
  font-size: 14px;
  line-height: 1.6;
}

.success-message {
  color: #166534;
  background: #f0fdf4;
  border-color: #bbf7d0;
}

.error-message {
  color: #991b1b;
  background: #fef2f2;
  border-color: #fecaca;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

@media (prefers-reduced-motion: reduce) {
  .spinner {
    animation: none;
  }

  .send-button {
    transition: none;
  }
}
</style>
<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

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
const selectedEquipment = ref('')

watch(
  () => route.query.equipment,
  (equipmentName) => {
    selectedEquipment.value =
      typeof equipmentName === 'string' ? equipmentName.trim() : ''

    form.value.message = selectedEquipment.value
      ? `I would like to enquire about ${selectedEquipment.value}.`
      : ''

    sent.value = false
    error.value = ''
  },
  { immediate: true }
)

function sendWhatsApp() {
  const message = [
    'Hi, I would like to enquire about your pools or equipment.',
    '',
    ...(selectedEquipment.value
      ? [`Equipment: ${selectedEquipment.value}`]
      : []),
    `Name: ${form.value.name || ''}`,
    `Email: ${form.value.email || ''}`,
    `Phone: ${form.value.phone || ''}`,
    `Location: ${form.value.location || ''}`,
    '',
    form.value.message,
  ].join('\n')

  window.open(
    `https://wa.me/27767401410?text=${encodeURIComponent(message)}`,
    '_blank',
    'noopener,noreferrer'
  )
}

async function submitForm() {
  if (sending.value) return

  sending.value = true
  sent.value = false
  error.value = ''

  const subject = selectedEquipment.value
    ? `Equipment enquiry - ${selectedEquipment.value}`
    : `Pool enquiry from ${form.value.name}`

  const message = [
    ...(selectedEquipment.value
      ? [`Equipment: ${selectedEquipment.value}`]
      : []),
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
          subject,
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
      name: ' ',
      email: ' ',
      phone: ' ',
      location: ' ',
      message: ' ',
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
        Send us an enquiry by email or WhatsApp.
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
            <a href="mailto:info@justdiyit.co.za">
              info@justdiyit.co.za
            </a>
          </div>

          <div>
            <span>WhatsApp</span>
            <a
              href="https://wa.me/27767401410"
              target="_blank"
              rel="noopener noreferrer"
            >
              Chat with us on WhatsApp →
            </a>
          </div>
        </div>
      </div>

      <div class="contact-form-card">
        <h2>Send an enquiry</h2>
        <p>Complete your details and choose email or WhatsApp.</p>

        <div v-if="selectedEquipment" class="selected-equipment">
          <span>Equipment enquiry</span>
          <strong>{{ selectedEquipment }}</strong>
        </div>

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

          <div class="contact-actions full">
            <button
              class="enquiry-button email-action"
              type="submit"
              :disabled="sending"
            >
              <span
                v-if="sending"
                class="spinner"
                aria-hidden="true"
              ></span>

              <span>{{ sending ? 'Sending…' : 'Send email' }}</span>
            </button>

            <button
              class="enquiry-button whatsapp-action"
              type="button"
              :disabled="sending"
              @click="sendWhatsApp"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
              >
                <path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8v.5Z" />
                <path d="M9 8c0 3.9 3.1 7 7 7l1-2-3-1-1 1-2-2 1-1-1-3-2 1Z" />
              </svg>

              <span>WhatsApp</span>
            </button>
          </div>

          <p class="whatsapp-note full">
            WhatsApp opens with your enquiry ready. Press Send there
            to send your message.
          </p>
        </form>

        <p
          v-if="sent"
          class="status-message success-message"
          role="status"
        >
          Your enquiry has been submitted. Thank you for contacting us.
        </p>

        <p
          v-if="error"
          class="status-message error-message"
          role="alert"
        >
          {{ error }}
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.contact-form-card,
.contact-form,
.contact-form > label {
  min-width: 0;
}

.contact-form input,
.contact-form textarea {
  box-sizing: border-box;
  max-width: 100%;
}

.selected-equipment {
  display: grid;
  gap: 6px;
  margin: 20px 0;
  padding: 14px 16px;
  background: #f0f9ff;
  border: 1px solid #bae6fd;
  border-radius: 12px;
}

.selected-equipment span {
  color: #0369a1;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 1px;
  text-transform: uppercase;
}

.selected-equipment strong {
  color: #0f172a;
  font-size: 16px;
  overflow-wrap: anywhere;
}

.contact-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  width: 100%;
  min-width: 0;
}

.contact-actions .enquiry-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  box-sizing: border-box;
  width: auto;
  max-width: 100%;
  height: 44px;
  padding: 10px 14px;
  border: 0;
  border-radius: 10px;
  color: #fff;
  font-family: inherit;
  font-size: 14px;
  font-weight: 700;
  line-height: 1.2;
  cursor: pointer;
  transition: background 0.2s;
}

.email-action {
  background: #0284c7;
}

.email-action:hover:not(:disabled) {
  background: #0369a1;
}

.whatsapp-action {
  background: #15803d;
}

.whatsapp-action:hover:not(:disabled) {
  background: #166534;
}

.enquiry-button svg {
  display: block;
  width: 17px;
  height: 17px;
  flex: 0 0 17px;
}

.enquiry-button:focus-visible {
  outline: 3px solid #38bdf8;
  outline-offset: 4px;
}

.enquiry-button:disabled {
  opacity: 0.65;
  cursor: wait;
}

.whatsapp-note {
  margin: 0;
  color: #64748b;
  font-size: 12px;
  line-height: 1.6;
}

.spinner {
  width: 16px;
  height: 16px;
  flex: 0 0 16px;
  box-sizing: border-box;
  border: 2px solid rgb(255 255 255 / 35%);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

.status-message {
  margin-top: 20px;
  padding: 14px 16px;
  border: 1px solid;
  border-radius: 12px;
  font-size: 14px;
  line-height: 1.6;
  overflow-wrap: anywhere;
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
  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 480px) {
  .contact-actions {
    flex-direction: column;
    align-items: flex-start;
  }

  .contact-actions .enquiry-button {
    font-size: 13px;
    padding: 10px 14px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .spinner {
    animation: none;
  }

  .enquiry-button {
    transition: none;
  }
}
</style>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  inline: { type: Boolean, default: false },
  pool: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['close'])

const whatsappNumber = '27XXXXXXXXX'
const emailAddress = 'info@justfibreglasspools.co.za'

const form = ref({
  name: '',
  email: '',
  phone: '',
  location: '',
  message: '',
})

const formRef = ref(null)

const asset = (path) => {
  if (!path) return ''
  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`
}

function buildQuoteMessage() {
  return [
    `Pool: ${props.pool.name}`,
    `Size: ${props.pool.size}`,
    `Depth: ${props.pool.depth}`,
    '',
    `Name: ${form.value.name}`,
    `Email: ${form.value.email}`,
    `Phone: ${form.value.phone}`,
    `Location: ${form.value.location}`,
    '',
    form.value.message || 'No additional message.',
  ].join('\n')
}

function submitQuote(method) {
  if (!formRef.value?.reportValidity()) return

  const message = buildQuoteMessage()

  if (method === 'email') {
    const subject = `Quote request - ${props.pool.name}`

    window.location.href =
      `mailto:${emailAddress}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`
  }

  if (method === 'whatsapp') {
    const whatsappMessage =
      `Quote request - ${props.pool.name}\n\n${message}`

    const url =
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`

    window.open(url, '_blank', 'noopener,noreferrer')
  }
}
</script>

<template>
  <div
    :class="inline ? 'quote-inline' : 'modal-backdrop'"
    @click.self="emit('close')"
  >
    <section
      class="quote-modal"
      :role="inline ? undefined : 'dialog'"
      :aria-modal="inline ? undefined : true"
      aria-label="Request a pool quote"
    >
      <!-- CLOSE BUTTON -->
      <button
        v-if="!inline"
        class="modal-close"
        type="button"
        aria-label="Close"
        @click="emit('close')"
      >
        ×
      </button>

      <!-- SELECTED POOL -->
      <div class="modal-pool">
        <img
          v-if="pool.shellImage || pool.image || pool.installationImage"
          :src="asset(pool.installationImage)"
          :alt="pool.name"
        />

        <div>
          <p class="eyebrow dark">
            Selected pool
          </p>

          <h2>{{ pool.name }}</h2>

          <p>
            {{ pool.size }}
            <span>•</span>
            {{ pool.depth }}
          </p>

          <strong>
            {{
              pool.price && pool.price !== 'R0'
                ? `From ${pool.price}`
                : 'Price on request'
            }}
          </strong>
        </div>
      </div>

      <!-- FORM HEADING -->
      <div class="modal-heading">
        <h3>Request your quote.</h3>

        <p>
          Fill in your details and choose whether to send
          your enquiry via Email or WhatsApp.
        </p>
      </div>

      <!-- QUOTE FORM -->
      <form
        ref="formRef"
        class="quote-form"
        @submit.prevent
      >
        <label>
          Name
          <input
            v-model="form.name"
            required
            autocomplete="name"
            placeholder="Your name"
          />
        </label>

        <label>
          Email
          <input
            v-model="form.email"
            required
            type="email"
            autocomplete="email"
            placeholder="you@example.com"
          />
        </label>

        <label>
          Phone
          <input
            v-model="form.phone"
            required
            type="tel"
            autocomplete="tel"
            placeholder="Your phone number"
          />
        </label>

        <label>
          Location
          <input
            v-model="form.location"
            required
            placeholder="City / area"
          />
        </label>

        <label class="full">
          Message
          <textarea
            v-model="form.message"
            rows="3"
            placeholder="Optional"
          ></textarea>
        </label>

        <!-- SEND OPTIONS -->
        <div class="full quote-actions">
          <button
            type="button"
            class="submit-button email-button"
            @click="submitQuote('email')"
          >
            <span class="button-icon">✉</span>
            Send via Email
          </button>

          <button
            type="button"
            class="submit-button whatsapp-button"
            @click="submitQuote('whatsapp')"
          >
            <span class="button-icon">◉</span>
            Send via WhatsApp
          </button>
        </div>

        <p class="full send-note">
          Your email or WhatsApp will open with your
          quote request ready to send.
        </p>
      </form>
    </section>
  </div>
</template>

<style scoped>
/* =========================================
   INLINE MODE
========================================= */

.quote-inline {
  margin: 24px auto;
  max-width: 768px;
}

.quote-inline .quote-modal {
  max-width: none;
}

/* =========================================
   MODAL BACKDROP
========================================= */

.modal-backdrop {
  @apply fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm p-4 sm:p-8 overflow-y-auto flex items-start sm:items-center justify-center;
}

/* =========================================
   MODAL
========================================= */

.quote-modal {
  @apply relative bg-white w-full max-w-3xl rounded-3xl shadow-2xl overflow-hidden;
}

/* =========================================
   CLOSE BUTTON
========================================= */

.modal-close {
  @apply absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/90 text-slate-800 text-2xl leading-none shadow hover:bg-slate-100;
}

/* =========================================
   SELECTED POOL
========================================= */

.modal-pool {
  @apply grid sm:grid-cols-[220px_1fr] gap-6 p-6 sm:p-8 bg-[#f6f8f9] border-b border-slate-200 items-center;
}

.modal-pool img {
  @apply w-full h-40 sm:h-44 object-contain rounded-2xl;

  padding: 4px;
  box-sizing: border-box;
  background: #ffffff;
}

.modal-pool h2 {
  @apply text-3xl font-black tracking-tight mb-2;
}

.modal-pool p {
  @apply text-slate-500 mb-3;
}

.modal-pool p span {
  @apply text-sky-500 px-1;
}

.modal-pool strong {
  @apply text-slate-900;
}

/* =========================================
   MODAL HEADING
========================================= */

.modal-heading {
  @apply px-6 sm:px-8 pt-7;
}

.modal-heading h3 {
  @apply text-2xl font-black;
}

.modal-heading p {
  @apply mt-1 text-slate-500;
}

/* =========================================
   QUOTE FORM
========================================= */

.quote-form {
  @apply p-6 sm:p-8 grid sm:grid-cols-2 gap-4;
}

.quote-form label {
  @apply text-sm font-bold text-slate-700;
}

.quote-form input,
.quote-form textarea {
  @apply mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100;
}

.quote-form textarea {
  resize: vertical;
}

/* =========================================
   FULL WIDTH
========================================= */

.full {
  @apply sm:col-span-2;
}

/* =========================================
   SEND BUTTONS
========================================= */

.quote-actions {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
  margin-top: 8px;
}

.submit-button {
  @apply rounded-xl text-white px-5 py-3.5 font-bold transition flex items-center justify-center gap-2;

  cursor: pointer;
  border: none;
  min-height: 52px;
}

.email-button {
  background: #0284c7;
}

.email-button:hover {
  background: #0369a1;
}

.whatsapp-button {
  background: #16a34a;
}

.whatsapp-button:hover {
  background: #15803d;
}

.button-icon {
  font-size: 20px;
  line-height: 1;
}

/* =========================================
   SEND NOTE
========================================= */

.send-note {
  @apply text-xs text-slate-500 text-center;

  margin-top: 2px;
}

/* =========================================
   MOBILE
========================================= */

@media (max-width: 480px) {
  .quote-actions {
    grid-template-columns: 1fr;
  }

  .modal-pool {
    gap: 12px;
  }

  .modal-pool h2 {
    font-size: 24px;
  }

  .submit-button {
    width: 100%;
  }
}
</style>

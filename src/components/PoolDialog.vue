<script setup>

import { ref } from 'vue'

const props = defineProps({
  pool: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['close'])

const form = ref({
  name: '',
  email: '',
  phone: '',
  location: '',
  message: '',
})

const sent = ref(false)

const asset = (path) => {
  if (!path) return ''
  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`
}

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
    form.value.message || 'No additional message.',
  ].join('\n')

  window.location.href =
    `mailto:info@justfibreglasspools.co.za?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`

  sent.value = true
}

</script>

<template>

  <div
    class="modal-backdrop"
    @click.self="emit('close')"
  >

    <section
      class="quote-modal"
      role="dialog"
      aria-modal="true"
      aria-label="Request a pool quote"
    >

      <!-- CLOSE BUTTON -->

      <button
        class="modal-close"
        aria-label="Close"
        @click="emit('close')"
      >
        ×
      </button>


      <!-- SELECTED POOL -->

      <div class="modal-pool">

        <img
          :src="asset(pool.shellImage || pool.image)"
          :alt="pool.name"
        />

        <div>

          <p class="eyebrow dark">
            Selected pool
          </p>

          <h2>
            {{ pool.name }}
          </h2>

          <p>
            {{ pool.size }}
            <span>•</span>
            {{ pool.depth }}
          </p>

          <strong>
            {{ pool.price !== 'R0'
              ? `From ${pool.price}`
              : 'Price on request'
            }}
          </strong>

        </div>

      </div>


      <!-- QUOTE FORM -->

      <div v-if="!sent">

        <div class="modal-heading">

          <h3>
            Request your quote.
          </h3>

          <p>
            We'll receive your enquiry by email.
          </p>

        </div>


        <form
          class="quote-form"
          @submit.prevent="submitQuote"
        >

          <label>
            Name

            <input
              v-model="form.name"
              required
              placeholder="Your name"
            />
          </label>


          <label>
            Email

            <input
              v-model="form.email"
              required
              type="email"
              placeholder="you@example.com"
            />
          </label>


          <label>
            Phone

            <input
              v-model="form.phone"
              required
              type="tel"
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


          <button
            class="submit-button full"
            type="submit"
          >
            Send quote request by email
            <span>→</span>
          </button>

        </form>

      </div>


      <!-- SUCCESS -->

      <div
        v-else
        class="success-state"
      >

        <div class="success-icon">
          ✓
        </div>

        <h3>
          Your quote request is ready.
        </h3>

        <p>
          Your email app should have opened with the pool details included.
        </p>

        <button
          class="submit-button"
          @click="emit('close')"
        >
          Done
        </button>

      </div>

    </section>

  </div>

</template>


<style scoped>

/* =========================================
   MODAL BACKDROP
========================================= */

.modal-backdrop {
  @apply fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm p-4 sm:p-8 overflow-y-auto flex items-center justify-center;
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
   FULL WIDTH FORM ELEMENT
========================================= */

.full {
  @apply sm:col-span-2;
}


/* =========================================
   SUBMIT BUTTON
========================================= */

.submit-button {
  @apply rounded-xl bg-sky-600 hover:bg-sky-700 text-white px-5 py-3.5 font-bold transition;
}


/* =========================================
   SUCCESS STATE
========================================= */

.success-state {
  @apply p-10 sm:p-14 text-center;
}

.success-state h3 {
  @apply text-2xl font-black;
}

.success-state p {
  @apply mt-1 text-slate-500;
}

.success-icon {
  @apply mx-auto mb-5 w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-2xl font-black;
}

.success-state .submit-button {
  @apply mt-7 px-10;
}

</style>
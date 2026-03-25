<script setup>
import { ref, computed } from "vue"

const props = defineProps({
  pool: Object,
  show: Boolean,
})

const emit = defineEmits(["close"])

// 🔹 Steps
const step = ref(1)

// 🔹 Selection
const selectedOption = ref(null)

// 🔹 Add-ons (FULL only)
const addOns = ref({
  paving: "none",
  heating: "none",
})

// 🔹 Paving options with images
const pavingOptions = [
  {
    value: "none",
    label: "No Paving",
    price: 0,
    image: "/Fiberglasspools/options/no-paving.jpg",
  },
  {
    value: "standard",
    label: "Standard Paving",
    price: 5000,
    image: "/Fiberglasspools/options/paving-standard.jpg",
  },
  {
    value: "premium",
    label: "Premium Paving",
    price: 10000,
    image: "/Fiberglasspools/options/paving-premium.jpg",
  },
]

// 🔹 Heating options with images
const heatingOptions = [
  {
    value: "none",
    label: "No Heating",
    price: 0,
    image: "/Fiberglasspools/options/no-heating.jpg",
  },
  {
    value: "solar",
    label: "Solar Heating",
    price: 8000,
    image: "/Fiberglasspools/options/heating-solar.jpg",
  },
  {
    value: "electric",
    label: "Electric Heating",
    price: 12000,
    image: "/Fiberglasspools/options/heating-electric.jpg",
  },
]


// 🔹 Gallery
const galleryImages = props.pool?.gallery || [
  props.pool?.image,
  props.pool?.image,
  props.pool?.image,
]

// 🔹 Pricing logic
const basePrice = computed(() => {
  if (!props.pool) return 0
  return Number(props.pool.price.replace(/[^\d]/g, ""))
})

const installationPrice = computed(() => {
  if (selectedOption.value === "DIY") return basePrice.value
  if (selectedOption.value === "FULL") return basePrice.value + 15000
  return basePrice.value
})

// 🔹 Add-on pricing logic
const addOnTotal = computed(() => {
  if (selectedOption.value !== "FULL") return 0

  let total = 0

  // Paving
  if (addOns.value.paving === "standard") total += 5000
  if (addOns.value.paving === "premium") total += 10000

  // Heating
  if (addOns.value.heating === "solar") total += 8000
  if (addOns.value.heating === "electric") total += 12000

  return total
})

const totalPrice = computed(() => {
  return installationPrice.value + addOnTotal.value
})

// 🔹 Navigation
function goToOptions() {
  step.value = 2
}

function goToSummary() {
  step.value = 3
}

function goBack() {
  if (step.value === 3) step.value = 2
  else step.value = 1
}

function selectOption(option) {
  selectedOption.value = option
}
</script>

<template>
  <div
    v-if="show"
    class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
  >
    <div class="bg-white w-[95%] max-w-4xl max-h-[90vh] rounded-xl shadow-2xl flex flex-col overflow-hidden">

      <!-- 🔹 HEADER -->
      <div class="bg-sky-500 text-white px-6 py-4 flex justify-between items-center sticky top-0 z-10">
        <h2 class="text-xl md:text-2xl font-bold">
          {{ pool.name }}
        </h2>

        <div class="flex gap-3">
          <button
            v-if="step > 1"
            class="bg-white text-sky-600 px-4 py-2 rounded-md font-medium hover:bg-gray-100 transition"
            @click="goBack"
          >
            Back
          </button>

          <button
            class="bg-white text-sky-600 px-4 py-2 rounded-md font-medium hover:bg-gray-100 transition"
            @click="emit('close')"
          >
            Close
          </button>
        </div>
      </div>

      <!-- 🔹 CONTENT -->
      <div class="overflow-y-auto p-6 space-y-6">

        <!-- ===================== -->
        <!-- STEP 1: DETAILS -->
        <!-- ===================== -->
        <div v-if="step === 1" class="space-y-6">

          <div class="grid md:grid-cols-2 gap-6 items-center">
            <img
              :src="pool.image"
              :alt="pool.name"
              class="w-full h-64 md:h-80 object-cover rounded-lg shadow"
            />

            <div>
              <h3 class="text-lg font-semibold text-gray-700 mb-3">
                Pool Details
              </h3>

              <p class="text-gray-600 mb-2">
                <strong>Size:</strong> {{ pool.size }}
              </p>

              <p class="text-gray-600 mb-2">
                <strong>Depth:</strong> {{ pool.depth }}
              </p>

              <p class="text-2xl font-bold text-sky-600 mt-4">
                {{ pool.price }}
              </p>

              <button
                class="mt-6 w-full bg-sky-600 text-white py-3 rounded-lg font-medium hover:bg-sky-700 transition"
                @click="goToOptions"
              >
                Choose Installation Option
              </button>
            </div>
          </div>

          <!-- Gallery -->
          <div>
            <h3 class="text-lg font-semibold text-gray-700 mb-4">
              Gallery
            </h3>

            <div class="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <img
                v-for="(img, i) in galleryImages"
                :key="i"
                :src="img"
                class="h-32 w-full object-cover rounded-lg shadow"
              />
            </div>
          </div>

        </div>

        <!-- ===================== -->
        <!-- STEP 2: OPTIONS -->
        <!-- ===================== -->
        <div v-else-if="step === 2" class="space-y-6">

          <h3 class="text-xl font-semibold text-center">
            Choose Installation Option
          </h3>

          <div class="grid md:grid-cols-2 gap-6">

            <!-- DIY -->
            <div
              @click="selectOption('DIY')"
              :class="[
                'border rounded-xl p-4 cursor-pointer transition',
                selectedOption === 'DIY'
                  ? 'border-sky-500 bg-sky-50'
                  : 'hover:shadow-md'
              ]"
            >
              <img :src="pool.image" class="h-32 w-full object-cover rounded mb-3" />

              <h4 class="font-bold">DIY Installation</h4>
              <p class="text-sm text-gray-600">
                You handle the installation yourself.
              </p>
            </div>

            <!-- FULL -->
            <div
              @click="selectOption('FULL')"
              :class="[
                'border rounded-xl p-4 cursor-pointer transition',
                selectedOption === 'FULL'
                  ? 'border-sky-500 bg-sky-50'
                  : 'hover:shadow-md'
              ]"
            >
              <img :src="pool.image" class="h-32 w-full object-cover rounded mb-3" />

              <h4 class="font-bold">Full Installation</h4>
              <p class="text-sm text-gray-600">
                We handle everything for you.
              </p>
            </div>

          </div>

          <button
            :disabled="!selectedOption"
            class="w-full py-3 rounded-lg font-medium"
            :class="selectedOption
              ? 'bg-sky-600 text-white hover:bg-sky-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'"
            @click="goToSummary"
          >
            Continue
          </button>

        </div>

        <!-- ===================== -->
        <!-- STEP 3: SUMMARY -->
        <!-- ===================== -->
        <div v-else class="space-y-6">

        <!-- Image -->
        <img
            :src="pool.image"
            class="w-full h-56 object-cover rounded-lg shadow"
        />

        <h3 class="text-xl font-semibold">
            {{ selectedOption === 'FULL' ? 'Full Installation' : 'DIY Package' }}
        </h3>

        <!-- Included -->
        <div class="bg-gray-50 p-4 rounded-lg">
            <h4 class="font-bold mb-2">What's Included:</h4>

            <ul class="list-disc ml-5 text-sm text-gray-600">
            <li>Pool Shell</li>
            <li v-if="selectedOption === 'FULL'">Excavation</li>
            <li v-if="selectedOption === 'FULL'">Installation</li>
            <li v-if="selectedOption === 'FULL'">Plumbing setup</li>
            </ul>
        </div>

        <!-- 🔥 FULL ONLY: Add-ons -->
        <div v-if="selectedOption === 'FULL'" class="space-y-8">

        <!-- PAVING -->
        <div>
            <h4 class="font-bold mb-4">Paving Options</h4>

            <div class="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div
                v-for="option in pavingOptions"
                :key="option.value"
                @click="addOns.paving = option.value"
                :class="[
                'border rounded-xl overflow-hidden cursor-pointer transition',
                addOns.paving === option.value
                    ? 'border-sky-500 ring-2 ring-sky-300'
                    : 'hover:shadow-md'
                ]"
            >
                <img
                :src="option.image"
                class="h-32 w-full object-cover"
                />

                <div class="p-3 text-sm">
                <p class="font-semibold">{{ option.label }}</p>
                <p class="text-gray-600">
                    {{ option.price ? `+R${option.price}` : 'Included' }}
                </p>
                </div>
            </div>
            </div>
        </div>

        <!-- HEATING -->
        <div>
            <h4 class="font-bold mb-4">Heating Options</h4>

            <div class="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div
                v-for="option in heatingOptions"
                :key="option.value"
                @click="addOns.heating = option.value"
                :class="[
                'border rounded-xl overflow-hidden cursor-pointer transition',
                addOns.heating === option.value
                    ? 'border-sky-500 ring-2 ring-sky-300'
                    : 'hover:shadow-md'
                ]"
            >
                <img
                :src="option.image"
                class="h-32 w-full object-cover"
                />

                <div class="p-3 text-sm">
                <p class="font-semibold">{{ option.label }}</p>
                <p class="text-gray-600">
                    {{ option.price ? `+R${option.price}` : 'Included' }}
                </p>
                </div>
            </div>
            </div>
        </div>

        </div>

        <!-- Price -->
        <div class="bg-sky-50 p-4 rounded-lg">
            <p>Base: R{{ installationPrice }}</p>
            <p v-if="selectedOption === 'FULL'">Add-ons: R{{ addOnTotal }}</p>
            <p class="font-bold text-lg mt-2">
            Total: R{{ totalPrice }}
            </p>
        </div>

        <!-- Order -->
        <button
            class="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700"
        >
            Order Now
        </button>

        </div>

      </div>
    </div>
  </div>
</template>
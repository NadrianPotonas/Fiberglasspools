<script setup>
import { ref, computed } from "vue"

const props = defineProps({
  pool: Object,
  show: Boolean,
})

const emit = defineEmits(["close"])

const disclaimer =
  'Prices shown are estimates only and may change depending on delivery location, site conditions, accessibility, and additional requirements. Final quotations are confirmed after consultation with our team.'

// 🔹 Steps
const step = ref(1)

const customer = ref({
  name: '',
  surname: '',
  phone: '',
  email: '',
  city: '',
  province: '',
  notes: '',
})

const quoteMessage = computed(() => {
  const heating =
    heatingOptions.find(x => x.value === addOns.value.heating)?.label ||
    'None'

  const cover =
    coverOptions.find(x => x.value === addOns.value.cover)?.label ||
    'None'

  const paving =
    pavingOptions.find(x => x.value === addOns.value.paving)?.label ||
    'None'

  return `
Pool Quote Request

Customer Details
----------------
Name: ${customer.value.name} ${customer.value.surname}
Phone: ${customer.value.phone}
Email: ${customer.value.email || 'Not provided'}
Location: ${customer.value.city}, ${customer.value.province}

Pool Details
------------
Pool: ${props.pool.name}
Installation: ${
  selectedOption.value === 'FULL'
    ? 'Full Installation'
    : 'DIY Package'
}

Extras
-------
Paving: ${paving}
Heating: ${heating}
Cover: ${cover}

Estimated Price
---------------
From R${totalPrice.value.toLocaleString()}

Additional Information
----------------------
${customer.value.notes || 'None'}
`
})

function sendWhatsApp() {
  const number = '27829760827'

  window.open(
    `https://wa.me/${number}?text=${encodeURIComponent(
      quoteMessage.value
    )}`,
    '_blank'
  )
}

function sendEmail() {
  const subject = `Pool Quote Request - ${props.pool.name}`

  window.location.href =
    `mailto:quotes@yourcompany.co.za` +
    `?subject=${encodeURIComponent(subject)}` +
    `&body=${encodeURIComponent(quoteMessage.value)}`
}

// 🔹 Selection
const selectedOption = ref(null)

// 🔹 Add-ons (FULL only)
const showAdditionalOptions = ref(false)

const addOns = ref({
  paving: "none",
  heating: "none",
  lighting: "none",
  cover: "none",
  waterFeature: "none",
})

const lightingOptions = [
  {
    value: "none",
    label: "No Lighting",
    price: 0,
    image: "/Fiberglasspools/pavement/None.jpg",
  },
  {
    value: "white",
    label: "White LED Lights",
    price: 2500,
    image: "/Fiberglasspools/extras/white-led.jpg",
  },
  {
    value: "rgb",
    label: "RGB LED Lights",
    price: 4500,
    image: "/Fiberglasspools/extras/rgb-led.jpg",
  },
]

const coverOptions = [
  {
    value: "none",
    label: "No Cover",
    price: 0,
    image: "/Fiberglasspools/pavement/None.jpg",
  },
  {
    value: "standard",
    label: "Standard Cover",
    price: 5000,
    image: "/Fiberglasspools/extras/poolcover.jpg",
  },
  {
    value: "automatic",
    label: "Automatic Cover",
    price: 12000,
    image: "/Fiberglasspools/extras/automatic-cover.jpg",
  },
]

const waterFeatureOptions = [
  {
    value: "none",
    label: "No Water Feature",
    price: 0,
    image: "/Fiberglasspools/pavement/None.jpg",
  },
  {
    value: "waterfall",
    label: "Waterfall",
    price: 8000,
    image: "/Fiberglasspools/extras/waterfall.jpg",
  },
  {
    value: "fountain",
    label: "Fountain",
    price: 6000,
    image: "/Fiberglasspools/extras/fountain.jpg",
  },
]

// 🔹 Paving options with images
const pavingOptions = [
  {
    value: "none",
    label: "Red Bricks",
    image: "/Fiberglasspools/pavement/pavement.jpg",
  },
  {
    value: "standard",
    label: "Grey Bricks",
    image: "/Fiberglasspools/pavement/pavement2.jpg",
  },
]

// 🔹 Heating options with images
const heatingOptions = [
  {
    value: "none",
    label: "No Heating",
    price: 0,
    image: "/Fiberglasspools/pavement/None12313.jpg",
  },
  {
    value: "solar",
    label: "Solar Heating",
    price: 8000,
    image: "/Fiberglasspools/pavement/solarheating.jpg",
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
  // if (selectedOption.value !== "FULL") return 0

  let total = 0

  // Paving
  if (addOns.value.paving === "standard") total += 5000
  if (addOns.value.paving === "premium") total += 10000

  // Heating
  if (addOns.value.heating === "solar") total += 8000
  if (addOns.value.heating === "electric") total += 12000

  // Lighting
  if (addOns.value.lighting === "white") total += 2500
  if (addOns.value.lighting === "rgb") total += 4500

  // Cover
  if (addOns.value.cover === "standard") total += 5000
  if (addOns.value.cover === "automatic") total += 12000

  // Water Feature
  if (addOns.value.waterFeature === "waterfall") total += 8000
  if (addOns.value.waterFeature === "fountain") total += 6000

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
  if (step.value === 4) step.value = 3
  else if (step.value === 3) step.value = 2
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
        <div v-else-if="step === 3" class="space-y-6">

        

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
        <!-- 🔥 DIY ONLY: Add-ons -->
        <div v-if="selectedOption === 'DIY'" class="space-y-8">

            <!-- ADDITIONAL OPTIONS -->
            <div class="border rounded-lg overflow-hidden">

              <button
                class="w-full bg-gray-100 px-4 py-3 flex justify-between items-center font-semibold"
                @click="showAdditionalOptions = !showAdditionalOptions"
              >
                <span>Additional Options</span>

                <span>
                  {{ showAdditionalOptions ? '−' : '+' }}
                </span>
              </button>

              <div v-if="showAdditionalOptions" class="space-y-8">

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
                      <!-- COVER -->
                      <!-- <div>
                          <h4 class="font-bold mb-4">Heating Options</h4>

                          <div class="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                          <div
                              v-for="option in coverOptions"
                              :key="option.value"
                              @click="addOns.cover  = option.value"
                              :class="[
                                'border rounded-xl overflow-hidden cursor-pointer transition',
                                addOns.cover  === option.value
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
                      </div> -->

                </div>
            </div> 

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
                    <!-- <p class="text-gray-600">
                        {{ option.price ? `+R${option.price}` : 'Included' }}
                    </p> -->
                    </div>
                </div>
                </div>
            </div>
            <!-- ADDITIONAL OPTIONS -->
            <div class="border rounded-lg overflow-hidden">

              <button
                class="w-full bg-gray-100 px-4 py-3 flex justify-between items-center font-semibold"
                @click="showAdditionalOptions = !showAdditionalOptions"
              >
                <span>Additional Options</span>

                <span>
                  {{ showAdditionalOptions ? '−' : '+' }}
                </span>
              </button>

              
              <div v-if="showAdditionalOptions" class="space-y-8">

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
                      <!-- LIGHTING -->
                      <!-- <div>
                          <h4 class="font-bold mb-4">Heating Options</h4>

                          <div class="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                          <div
                              v-for="option in lightingOptions"
                              :key="option.value"
                              @click="addOns.lighting = option.value"
                              :class="[
                                'border rounded-xl overflow-hidden cursor-pointer transition',
                                addOns.lighting === option.value
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
                      </div> -->
                      <!-- COVER -->
                      <!-- <div>
                          <h4 class="font-bold mb-4">Heating Options</h4>

                          <div class="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                          <div
                              v-for="option in coverOptions"
                              :key="option.value"
                              @click="addOns.cover  = option.value"
                              :class="[
                                'border rounded-xl overflow-hidden cursor-pointer transition',
                                addOns.cover  === option.value
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
                      </div> -->
                      <!-- WATER FEATURES -->
                      <!-- <div>
                          <h4 class="font-bold mb-4">Heating Options</h4>

                          <div class="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                          <div
                              v-for="option in waterFeatureOptions"
                              :key="option.value"
                              @click="addOns.waterFeature  = option.value"
                              :class="[
                                'border rounded-xl overflow-hidden cursor-pointer transition',
                                addOns.waterFeature  === option.value
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
                      </div> -->
                </div>
            </div> 

        </div>

        <!-- Price -->
        <div class="bg-sky-50 p-4 rounded-lg">

          <h4 class="font-bold text-lg mb-4">
            Price Breakdown
          </h4>

          <div class="space-y-2">

            <div class="flex justify-between">
              <span>Pool Package</span>
              <span>R{{ installationPrice }}</span>
            </div>

            <div
              v-if="addOns.paving !== 'none'"
              class="flex justify-between"
            >
              <span>
                {{ pavingOptions.find(x => x.value === addOns.paving)?.label }}
              </span>
              <span>+R5,000</span>
            </div>

            <div
              v-if="addOns.heating !== 'none'"
              class="flex justify-between"
            >
              <span>
                {{ heatingOptions.find(x => x.value === addOns.heating)?.label }}
              </span>
              <span>
                +R{{ heatingOptions.find(x => x.value === addOns.heating)?.price }}
              </span>
            </div>

            <div
              v-if="addOns.lighting !== 'none'"
              class="flex justify-between"
            >
              <span>
                {{ lightingOptions.find(x => x.value === addOns.lighting)?.label }}
              </span>
              <span>
                +R{{ lightingOptions.find(x => x.value === addOns.lighting)?.price }}
              </span>
            </div>

            <div
              v-if="addOns.cover !== 'none'"
              class="flex justify-between"
            >
              <span>
                {{ coverOptions.find(x => x.value === addOns.cover)?.label }}
              </span>
              <span>
                +R{{ coverOptions.find(x => x.value === addOns.cover)?.price }}
              </span>
            </div>

            <div
              v-if="addOns.waterFeature !== 'none'"
              class="flex justify-between"
            >
              <span>
                {{ waterFeatureOptions.find(x => x.value === addOns.waterFeature)?.label }}
              </span>
              <span>
                +R{{ waterFeatureOptions.find(x => x.value === addOns.waterFeature)?.price }}
              </span>
            </div>

            <hr class="my-3">

            <div class="flex justify-between font-bold text-lg">
              <span>Estimated Total</span>
              <span>From R{{ totalPrice.toLocaleString() }}</span>
            </div>
            <div class="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p class="text-sm text-gray-600">
                {{ disclaimer }}
              </p>
            </div>
          </div>

        </div>

        <!-- Order -->
        <button
            @click="step = 4" class="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700"
        >
            Request Quote
        </button>
        <p class="text-center text-sm text-gray-500 mt-3">
          Our team will contact you to discuss delivery, installation requirements,
          and provide a final quotation.
        </p>
        </div>
        
        <div v-else-if="step === 4" class="space-y-6">

          <h3 class="text-xl font-semibold text-center">
            Contact Details
          </h3>

          <div class="grid md:grid-cols-2 gap-4">

            <input
              v-model="customer.name"
              placeholder="Name"
              class="border rounded-lg p-3"
            />

            <input
              v-model="customer.surname"
              placeholder="Surname"
              class="border rounded-lg p-3"
            />

            <input
              v-model="customer.phone"
              placeholder="Phone Number"
              class="border rounded-lg p-3"
            />

            <input
              v-model="customer.email"
              placeholder="Email (Optional)"
              class="border rounded-lg p-3"
            />

            <input
              v-model="customer.city"
              placeholder="City"
              class="border rounded-lg p-3"
            />

            <input
              v-model="customer.province"
              placeholder="Province"
              class="border rounded-lg p-3"
            />

          </div>

          <textarea
            v-model="customer.notes"
            rows="4"
            placeholder="Additional information"
            class="w-full border rounded-lg p-3"
          />

          <div class="grid md:grid-cols-2 gap-4">

            <button
              class="bg-green-600 text-white py-3 rounded-lg hover:bg-green-700"
              @click="sendWhatsApp"
            >
              Send via WhatsApp
            </button>

            <button
              class="bg-sky-600 text-white py-3 rounded-lg hover:bg-sky-700"
              @click="sendEmail"
            >
              Send via Email
            </button>

          </div>

        </div>

      </div>
    </div>
  </div>
</template>
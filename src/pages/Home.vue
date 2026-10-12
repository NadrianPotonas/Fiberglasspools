<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import PoolCard from '../components/PoolCard.vue'
import poolsData from '../data/pools.json'
import homeData from '../data/home.json'
import { slug } from '../catalog'

const allPools = [
  ...poolsData.small,
  ...poolsData.medium,
  ...poolsData.large,
]

const featured = allPools
  .filter(
    (pool, index, all) =>
      all.findIndex(item => item.name === pool.name) === index
  )
  .slice(0, 6)

const specialPool = computed(() =>
  Object.values(poolsData)
    .flat()
    .find(
      pool =>
        pool.name.toLowerCase() ===
        (homeData.special.poolName || '').trim().toLowerCase()
    )
)

const specialQuoteLink = computed(() =>
  specialPool.value
    ? `/pools/${slug(specialPool.value.name)}`
    : '/pools'
)

const asset = (path) => {
  if (!path) return ''
  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`
}

const rating = (value) =>
  Math.max(0, Math.min(5, Math.round(Number(value) || 0)))
</script>

<template>
  <!-- SPECIAL OFFER -->
  <section class="special-hero">
    <div class="container special-layout">
      <div class="special-content">
        <p class="eyebrow dark">{{ homeData.special.label }}</p>

        <h1>{{ homeData.special.title }}</h1>

        <p class="special-description">
          {{ homeData.special.description }}
        </p>

        <p v-if="homeData.special.price" class="special-offer-price">
          {{ homeData.special.price }}
        </p>

        <p v-if="homeData.special.validUntil" class="special-offer-validity">
          Valid until: {{ homeData.special.validUntil }}
        </p>

        <div class="special-actions">
          <RouterLink
            :to="specialQuoteLink"
            class="primary-button"
          >
            {{ homeData.special.buttonText }}
            <span aria-hidden="true">→</span>
          </RouterLink>

          <RouterLink to="/pools" class="special-browse">
            View our pools
            <span aria-hidden="true">→</span>
          </RouterLink>
        </div>
      </div>

      <figure class="special-image-card">
        <img
          :src="asset(
            homeData.special.image ||
            specialPool?.installationImage ||
            specialPool?.shellImage ||
            'pools/Hudson1.jpg'
          )"
          :alt="homeData.special.poolName || 'Pool on special offer'"
          fetchpriority="high"
        >

        <figcaption
          v-if="homeData.special.poolName || homeData.special.size"
        >
          <strong v-if="homeData.special.poolName">
            {{ homeData.special.poolName }}
          </strong>

          <span v-if="homeData.special.size">
            {{ homeData.special.size }}
          </span>
        </figcaption>
      </figure>
    </div>
  </section>

  <!-- UPCOMING DELIVERY DATES -->
  <section class="delivery-section" aria-labelledby="delivery-heading">
    <div class="container">
      <div class="section-heading">
        <div>
          <p class="eyebrow dark">Nationwide deliveries</p>

          <h2 id="delivery-heading">
            {{ homeData.deliveries.title }}
          </h2>

          <p v-if="homeData.deliveries.description" class="section-copy">
            {{ homeData.deliveries.description }}
          </p>
        </div>
      </div>

      <div v-if="homeData.deliveries.items.length" class="delivery-grid">
        <article
          v-for="delivery in homeData.deliveries.items"
          :key="delivery.region"
          class="delivery-card"
        >
          <span class="delivery-label">Delivery region</span>
          <h3>{{ delivery.region }}</h3>
          <p class="delivery-date">{{ delivery.dates }}</p>
        </article>
      </div>

      <p v-else class="delivery-note">
        The next delivery dates will be published here.
      </p>

      <p v-if="homeData.deliveries.notice" class="delivery-note">
        {{ homeData.deliveries.notice }}
      </p>
    </div>
  </section>

  <!-- INTRO -->
  <section class="intro-section">
    <div class="container split-intro">
      <div>
        <p class="eyebrow dark">Just Fibreglass Pools</p>
        <h2>Find the right pool without the hassle.</h2>
      </div>

      <div class="intro-copy">
        <p>
          Our website is simple for a reason. See the pools, compare the
          basics and ask us for a quote. We'll help you with the details
          of your site, delivery and installation from there.
        </p>

        <RouterLink to="/pools" class="text-link">
          Explore the full range
          <span aria-hidden="true">→</span>
        </RouterLink>
      </div>
    </div>
  </section>

  <!-- FEATURED POOLS -->
  <section class="featured-section">
    <div class="container">
      <div class="section-heading">
        <div>
          <p class="eyebrow dark">Our pools</p>
          <h2>Start with a pool you like.</h2>
        </div>

        <RouterLink to="/pools" class="text-link">
          View all pools
          <span aria-hidden="true">→</span>
        </RouterLink>
      </div>

      <div class="pool-grid home-pool-grid">
        <PoolCard
          v-for="pool in featured"
          :key="pool.name"
          :pool="pool"
        />
      </div>
    </div>
  </section>

  <!-- POOL RELINING -->
  <section class="relining-section">
    <div class="container">
      <div class="section-heading">
        <div>
          <p class="eyebrow dark">Pool relining</p>
          <h2>Give your pool a fresh finish.</h2>

          <p class="section-copy">
            We also offer fibreglass pool relining.
            See the difference before and after.
          </p>
        </div>

        <RouterLink to="/contact" class="text-link">
          Enquire about relining
          <span aria-hidden="true">→</span>
        </RouterLink>
      </div>

      <div class="relining-grid">
        <figure class="relining-card">
          <div class="relining-image-wrap">
            <img
              :src="asset('images/LiningBefore.jpeg')"
              alt="Pool before fibreglass relining"
              loading="lazy"
            >
          </div>
          <figcaption>Lining before</figcaption>
        </figure>

        <figure class="relining-card">
          <div class="relining-image-wrap">
            <img
              :src="asset('images/LiningAfter.jpeg')"
              alt="Pool after fibreglass relining"
              loading="lazy"
            >
          </div>
          <figcaption>Lining after</figcaption>
        </figure>
      </div>
    </div>
  </section>

  <!-- CONCRETE POOLS -->
  <section class="concrete-home-section">
    <div class="container concrete-home-inner">
      <div>
        <p class="eyebrow dark">More than fibreglass</p>
        <h2>We also build concrete pools.</h2>

        <p>
          Looking for a custom-built pool? We also offer concrete pools
          for customers who want a bespoke design.
        </p>
      </div>

      <RouterLink to="/contact" class="secondary-button">
        Enquire about a concrete pool
      </RouterLink>
    </div>
  </section>

  <!-- WHY FIBREGLASS -->
  <section class="why-strip">
    <div class="container why-strip-inner">
      <div>
        <p class="eyebrow">Why fibreglass?</p>
        <h2>Strong. Smooth. Quick to install</h2>
      </div>

      <RouterLink to="/why-fibreglass" class="light-button">
        Why choose fibreglass?
        <span aria-hidden="true">→</span>
      </RouterLink>
    </div>
  </section>

  <!-- CUSTOMER REVIEWS -->
  <section
    v-if="homeData.reviews.items.length"
    class="reviews-section"
    aria-labelledby="reviews-heading"
  >
    <div class="container">
      <div class="section-heading">
        <div>
          <p class="eyebrow dark">Customer feedback</p>
          <h2 id="reviews-heading">{{ homeData.reviews.title }}</h2>
        </div>
      </div>

      <div class="reviews-grid">
        <figure
          v-for="(review, index) in homeData.reviews.items"
          :key="`${review.name}-${index}`"
          class="review-card"
        >
          <span v-if="review.placeholder" class="placeholder-label">
            Sample review — replace before publishing
          </span>

          <div
            class="review-stars"
            role="img"
            :aria-label="`${rating(review.rating)} out of 5 stars${review.placeholder ? ' — sample rating' : ''}`"
          >
            <span
              v-for="star in 5"
              :key="star"
              :class="{ filled: star <= rating(review.rating) }"
              aria-hidden="true"
            >★</span>
          </div>

          <blockquote>
            <p>{{ review.text }}</p>
          </blockquote>

          <figcaption>
            <strong>{{ review.name }}</strong>
            <span v-if="review.location">{{ review.location }}</span>
          </figcaption>
        </figure>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* SPECIAL OFFER */
.special-hero {
  padding: 48px 0;
  background: linear-gradient(135deg, #f0f9ff, #fff);
}

.special-layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.1fr);
  align-items: center;
  gap: 48px;
}

.special-content h1 {
  margin: 16px 0 20px;
  color: #0f172a;
  font-size: clamp(30px, 3.5vw, 52px);
  font-weight: 900;
  line-height: 1.12;
  letter-spacing: -1px;
  overflow-wrap: anywhere;
}

.special-description {
  max-width: 500px;
  color: #64748b;
  font-size: 16px;
  line-height: 1.8;
}

.special-offer-price {
  margin: 20px 0 8px;
  color: #0284c7;
  font-size: 36px;
  font-weight: 900;
}

.special-offer-validity {
  margin-top: 16px;
  color: #64748b;
  font-size: 13px;
}

.special-actions {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 28px;
}

.special-browse {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #0369a1;
  font-weight: 700;
  text-decoration: none;
}

.special-browse:hover {
  text-decoration: underline;
  text-underline-offset: 4px;
}

.special-browse:focus-visible {
  outline: 3px solid #38bdf8;
  outline-offset: 4px;
  border-radius: 4px;
}

.special-image-card {
  min-width: 0;
  margin: 0;
  padding: 20px;
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 24px;
  box-shadow: 0 16px 40px rgb(15 23 42 / 7%);
}

.special-image-card img {
  display: block;
  width: 100%;
  height: 380px;
  object-fit: contain;
}

.special-image-card figcaption {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #e2e8f0;
}

.special-image-card figcaption strong {
  color: #0f172a;
  font-size: 20px;
  font-weight: 800;
}

.special-image-card figcaption span {
  color: #64748b;
  font-size: 14px;
}

/* SHARED SECTION STYLES */
.delivery-section,
.reviews-section,
.relining-section {
  padding: 56px 0;
}

.delivery-section,
.relining-section {
  background: #f0f9ff;
}

.reviews-section {
  background: #fff;
}

.section-copy {
  max-width: 580px;
  margin-top: 14px;
  color: #64748b;
  line-height: 1.7;
}

.delivery-grid,
.reviews-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 260px), 1fr));
  gap: 24px;
  margin-top: 28px;
}

/* DELIVERY DATES */
.delivery-card {
  padding: 28px;
  background: #fff;
  border: 1px solid #bae6fd;
  border-radius: 20px;
  box-shadow: 0 8px 24px rgb(15 23 42 / 4%);
}

.delivery-label {
  color: #0369a1;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 1px;
  text-transform: uppercase;
}

.delivery-card h3 {
  margin: 12px 0;
  color: #0f172a;
  font-size: 21px;
  font-weight: 800;
}

.delivery-date {
  margin: 0;
  color: #0284c7;
  font-size: 18px;
  font-weight: 700;
  line-height: 1.6;
}

.delivery-note {
  margin-top: 20px;
  color: #64748b;
  font-size: 13px;
  line-height: 1.7;
}

/* REVIEWS */
.review-card {
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 28px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 20px;
}

.placeholder-label {
  margin-bottom: 14px;
  color: #92400e;
  font-size: 12px;
  font-weight: 700;
}

.review-stars {
  display: flex;
  gap: 4px;
  font-size: 24px;
}

.review-stars span {
  color: #cbd5e1;
}

.review-stars span.filled {
  color: #f59e0b;
}

.review-card blockquote {
  flex: 1;
  margin: 18px 0 24px;
  color: #475569;
  font-size: 16px;
  line-height: 1.8;
}

.review-card figcaption {
  display: grid;
  gap: 4px;
  padding-top: 18px;
  border-top: 1px solid #e2e8f0;
}

.review-card figcaption strong {
  color: #0f172a;
  font-weight: 800;
}

.review-card figcaption span {
  color: #64748b;
  font-size: 13px;
}

/* RELINING */
.relining-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 24px;
  margin-top: 32px;
}

.relining-card {
  margin: 0;
  overflow: hidden;
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 20px;
  box-shadow: 0 8px 24px rgb(15 23 42 / 5%);
}

.relining-image-wrap {
  aspect-ratio: 1 / 1;
  background: #e2e8f0;
}

.relining-image-wrap img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.relining-card figcaption {
  padding: 18px 24px;
  color: #0f172a;
  font-size: 18px;
  font-weight: 800;
}

/* MOBILE */
@media (max-width: 760px) {
  .special-hero {
    padding: 32px 0;
  }

  .special-layout {
    grid-template-columns: 1fr;
    gap: 28px;
  }

  .special-image-card img {
    height: 300px;
  }
}

@media (max-width: 640px) {
  .delivery-section,
  .reviews-section,
  .relining-section {
    padding: 40px 0;
  }

  .delivery-card,
  .review-card {
    padding: 22px;
  }

  .relining-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .relining-card figcaption {
    padding: 16px 20px;
    font-size: 16px;
  }
}
</style>
<script setup>
import { RouterLink } from 'vue-router'
import PoolCard from '../components/PoolCard.vue'
import poolsData from '../data/pools.json'

const featured = [
  ...poolsData.small,
  ...poolsData.medium,
  ...poolsData.large,
]
  .filter(
    (pool, index, all) =>
      all.findIndex(item => item.name === pool.name) === index
  )
  .slice(0, 6)

const asset = (path) => {
  if (!path) return ''
  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`
}
</script>

<template>
  <!-- HERO -->
  <section
    class="hero home-hero"
    :style="{ backgroundImage: `url(${asset('pools/Hudson1.jpg')})` }"
  >
    <div class="hero-overlay"></div>

    <div class="container hero-content">
      <p class="eyebrow">Fibreglass pools • South Africa</p>

      <h1>
        A pool you'll love.<br>
        <em>A quote made simple.</em>
      </h1>

      <p class="hero-copy">
        Browse our range of fibreglass pools, choose your favourite and
        request a quote. Simple, straightforward and without the
        unnecessary steps.
      </p>

      <div class="hero-actions">
        <RouterLink to="/pools" class="primary-button">
          View our pools
          <span aria-hidden="true">→</span>
        </RouterLink>

        <RouterLink to="/contact" class="secondary-button">
          Contact us
        </RouterLink>
      </div>
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
          <p class="relining-copy">
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
        <h2>Strong. Smooth. Quick to install.</h2>
      </div>

      <RouterLink to="/why-fibreglass" class="light-button">
        Why choose fibreglass?
        <span aria-hidden="true">→</span>
      </RouterLink>
    </div>
  </section>
</template>

<style scoped>
/* Shorter homepage hero */
.home-hero {
  min-height: 0;
  height: auto;
  padding: 72px 0;
}

/* Relining comparison */
.relining-section {
  padding: 64px 0;
  background: #f0f9ff;
}

.relining-copy {
  max-width: 520px;
  margin-top: 14px;
  color: #64748b;
  line-height: 1.7;
}

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
}

.relining-card figcaption {
  padding: 18px 24px;
  color: #0f172a;
  font-size: 18px;
  font-weight: 800;
}

@media (max-width: 640px) {
  .home-hero {
    padding: 48px 0;
  }

  .relining-section {
    padding: 44px 0;
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
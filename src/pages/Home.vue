<script setup>
import { RouterLink } from 'vue-router'
import poolsData from '../data/pools.json'

const featured = [
  ...poolsData.small,
  ...poolsData.medium,
  ...poolsData.large,
].filter((pool, i, arr) => arr.findIndex(p => p.name === pool.name) === i).slice(0, 6)

const asset = (path) => {
  if (!path) return ''
  return `${import.meta.env.BASE_URL}images/${path.replace(/^\/+/, '')}`
}
</script>

<template>
  <section class="hero home-hero" :style="{ backgroundImage: `url(${asset('pools/Hudson1.jpg')})` }">
    <div class="hero-overlay"></div>
    <div class="container hero-content">
      <p class="eyebrow">Fibreglass pools • South Africa</p>
      <h1>A pool you'll love.<br><em>A quote made simple.</em></h1>
      <p class="hero-copy">Browse our range of fibreglass pools, choose your favourite and request a quote. Simple, straightforward and without the unnecessary steps.</p>
      <div class="hero-actions">
        <RouterLink to="/pools" class="primary-button">View our pools <span>→</span></RouterLink>
        <RouterLink to="/contact" class="secondary-button">Contact us</RouterLink>
      </div>
    </div>
  </section>

  <section class="intro-section">
    <div class="container split-intro">
      <div>
        <p class="eyebrow dark">Just Fibreglass Pools</p>
        <h2>Find the right pool without the hassle.</h2>
      </div>
      <div class="intro-copy">
        <p>Our website is simple for a reason. See the pools, compare the basics and ask us for a quote. We'll help you with the details of your site, delivery and installation from there.</p>
        <RouterLink to="/pools" class="text-link">Explore the full range <span>→</span></RouterLink>
      </div>
    </div>
  </section>

  <section class="featured-section">
    <div class="container">
      <div class="section-heading">
        <div><p class="eyebrow dark">Our pools</p><h2>Start with a pool you like.</h2></div>
        <RouterLink to="/pools" class="text-link">View all pools <span>→</span></RouterLink>
      </div>
      <div class="pool-grid home-pool-grid">
        <article v-for="pool in featured" :key="pool.name" class="pool-card">
          <div class="pool-image-wrap"><img :src="asset(pool.shellImage || pool.image)" :alt="pool.name" class="pool-image" loading="lazy"></div>
          <div class="pool-info compact"><h3>{{ pool.name }}</h3><p>{{ pool.size }} <span>•</span> {{ pool.depth }}</p></div>
        </article>
      </div>
    </div>
  </section>

  <section class="concrete-home-section">
    <div class="container concrete-home-inner">
      <div>
        <p class="eyebrow dark">More than fibreglass</p>
        <h2>We also build concrete pools.</h2>
        <p>Looking for a custom-built pool? We also offer concrete pools for customers who want a bespoke design.</p>
      </div>
      <RouterLink to="/contact" class="secondary-button">Enquire about a concrete pool</RouterLink>
    </div>
  </section>

  <section class="why-strip">
    <div class="container why-strip-inner">
      <div><p class="eyebrow">Why fibreglass?</p><h2>Strong. Smooth. Quick to install.</h2></div>
      <RouterLink to="/why-fibreglass" class="light-button">Why choose fibreglass? <span>→</span></RouterLink>
    </div>
  </section>
</template>

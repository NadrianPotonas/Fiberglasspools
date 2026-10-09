<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <section class="not-found">
    <div class="not-found-card">
      <span class="error-code" aria-hidden="true">404</span>

      <p class="eyebrow dark">Looks like you took a wrong turn</p>
      <h1>Page not found.</h1>

      <p class="error-description">
        We couldn't find this page. Let's help you find your perfect pool.
      </p>

      <div class="error-actions">
        <RouterLink to="/pools" class="primary-button">
          Browse our pools <span aria-hidden="true">→</span>
        </RouterLink>

        <RouterLink to="/" class="home-link">
          Back to home
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
.not-found {
  min-height: 65vh;
  display: grid;
  place-items: center;
  padding: 64px 20px;
  background: linear-gradient(145deg, #f0f9ff, #f8fafc 65%);
}

.not-found-card {
  width: 100%;
  max-width: 640px;
  padding: 48px 32px;
  text-align: center;
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 28px;
  box-shadow: 0 20px 60px rgb(15 23 42 / 6%);
}

.error-code {
  display: block;
  margin-bottom: 20px;
  color: #0ea5e9;
  font-size: clamp(80px, 15vw, 128px);
  font-weight: 900;
  line-height: 1;
  letter-spacing: -6px;
}

h1 {
  margin: 12px 0 16px;
  color: #0f172a;
  font-size: clamp(28px, 5vw, 42px);
  font-weight: 900;
  letter-spacing: -1px;
}

.error-description {
  max-width: 400px;
  margin: 0 auto;
  color: #64748b;
  line-height: 1.7;
}

.error-actions {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 24px;
  margin-top: 32px;
}

.home-link {
  color: #475569;
  font-weight: 700;
  text-underline-offset: 5px;
}

.home-link:hover {
  color: #0284c7;
  text-decoration: underline;
}

.home-link:focus-visible {
  outline: 3px solid #38bdf8;
  outline-offset: 6px;
  border-radius: 4px;
}

@media (max-width: 480px) {
  .not-found {
    padding: 40px 16px;
  }

  .not-found-card {
    padding: 36px 20px;
  }

  .error-actions {
    flex-direction: column;
    gap: 20px;
  }

  .primary-button {
    width: 100%;
    justify-content: center;
  }
}
</style>
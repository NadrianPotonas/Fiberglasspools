<script setup>
import { ref, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

const route = useRoute()
const open = ref(false)
const dropdown = ref(null)

const whatsapp = 'https://wa.me/27767401410'
const logo = `${import.meta.env.BASE_URL}images/Logo.png`

const poolLinks = [
  { label: 'All pools', to: '/pools' },
  { label: 'Small pools', to: '/pools?category=small' },
  { label: 'Medium pools', to: '/pools?category=medium' },
  { label: 'Large pools', to: '/pools?category=large' },
  { label: 'Spas & Other', to: '/pools?category=other' },
]

const infoLinks = [
  { label: 'Benefits', to: '/why-fibreglass#benefits' },
  { label: 'Our shells', to: '/why-fibreglass#shells' },
  { label: 'Fibreglass vs Concrete', to: '/why-fibreglass#comparison' },
  { label: 'How the shell is built', to: '/why-fibreglass#construction' },
  { label: 'DIY installation', to: '/why-fibreglass#diy' },
  { label: 'Pool care', to: '/why-fibreglass#care' },
  { label: 'Pool ownership', to: '/why-fibreglass#ownership' },
  { label: 'Guarantees & Information', to: '/why-fibreglass#guarantees' },
]

function closeMenu() {
  open.value = false
  dropdown.value = null
}

function toggleDropdown(name) {
  dropdown.value = dropdown.value === name ? null : name
}

watch(() => route.fullPath, closeMenu)
</script>

<template>
  <header
    class="site-header"
    @keydown.esc="closeMenu"
    @focusout="event => {
      if (!event.currentTarget.contains(event.relatedTarget)) closeMenu()
    }"
  >
    <div class="container header-inner">
      <RouterLink to="/" class="brand" @click="closeMenu">
        <img :src="logo" alt="Just Fibreglass Pools">
      </RouterLink>

      <nav class="desktop-nav" aria-label="Main navigation">
        <RouterLink to="/" exact-active-class="active" @click="closeMenu">
          Home
        </RouterLink>

        <div class="nav-dropdown">
          <button
            type="button"
            class="dropdown-trigger"
            :class="{ active: route.path.startsWith('/pools') }"
            :aria-expanded="dropdown === 'pools'"
            aria-controls="desktop-pools"
            @click="toggleDropdown('pools')"
          >
            Pools
            <span
              class="dropdown-arrow"
              :class="{ rotated: dropdown === 'pools' }"
              aria-hidden="true"
            >▾</span>
          </button>

          <div
            v-if="dropdown === 'pools'"
            id="desktop-pools"
            class="dropdown-panel"
          >
            <RouterLink
              v-for="item in poolLinks"
              :key="item.label"
              :to="item.to"
              @click="closeMenu"
            >
              {{ item.label }}
            </RouterLink>
          </div>
        </div>

        <div class="nav-dropdown">
          <button
            type="button"
            class="dropdown-trigger"
            :class="{ active: route.path === '/why-fibreglass' }"
            :aria-expanded="dropdown === 'info'"
            aria-controls="desktop-info"
            @click="toggleDropdown('info')"
          >
            Why Fibreglass?
            <span
              class="dropdown-arrow"
              :class="{ rotated: dropdown === 'info' }"
              aria-hidden="true"
            >▾</span>
          </button>

          <div
            v-if="dropdown === 'info'"
            id="desktop-info"
            class="dropdown-panel info-dropdown"
          >
            <RouterLink
              to="/why-fibreglass"
              class="dropdown-overview"
              @click="closeMenu"
            >
              View all information
            </RouterLink>

            <RouterLink
              v-for="item in infoLinks"
              :key="item.label"
              :to="item.to"
              @click="closeMenu"
            >
              {{ item.label }}
            </RouterLink>
          </div>
        </div>

        <RouterLink to="/contact" active-class="active" @click="closeMenu">
          Contact
        </RouterLink>
      </nav>

      <div class="header-actions">
        <a
          class="whatsapp-button"
          :href="whatsapp"
          target="_blank"
          rel="noopener"
        >
          WhatsApp us
        </a>

        <button
          type="button"
          class="menu-button"
          :aria-label="open ? 'Close menu' : 'Open menu'"
          :aria-expanded="open"
          aria-controls="mobile-navigation"
          @click="open = !open; dropdown = null"
        >
          {{ open ? '×' : '☰' }}
        </button>
      </div>
    </div>

    <nav
      v-if="open"
      id="mobile-navigation"
      class="mobile-nav"
      aria-label="Mobile navigation"
    >
      <RouterLink to="/" @click="closeMenu">Home</RouterLink>

      <button
        type="button"
        class="mobile-dropdown-trigger"
        :aria-expanded="dropdown === 'mobile-pools'"
        aria-controls="mobile-pools"
        @click="toggleDropdown('mobile-pools')"
      >
        Pools
        <span aria-hidden="true">
          {{ dropdown === 'mobile-pools' ? '−' : '+' }}
        </span>
      </button>

      <div
        v-if="dropdown === 'mobile-pools'"
        id="mobile-pools"
        class="mobile-submenu"
      >
        <RouterLink
          v-for="item in poolLinks"
          :key="item.label"
          :to="item.to"
          @click="closeMenu"
        >
          {{ item.label }}
        </RouterLink>
      </div>

      <button
        type="button"
        class="mobile-dropdown-trigger"
        :aria-expanded="dropdown === 'mobile-info'"
        aria-controls="mobile-info"
        @click="toggleDropdown('mobile-info')"
      >
        Why Fibreglass?
        <span aria-hidden="true">
          {{ dropdown === 'mobile-info' ? '−' : '+' }}
        </span>
      </button>

      <div
        v-if="dropdown === 'mobile-info'"
        id="mobile-info"
        class="mobile-submenu"
      >
        <RouterLink to="/why-fibreglass" @click="closeMenu">
          View all information
        </RouterLink>

        <RouterLink
          v-for="item in infoLinks"
          :key="item.label"
          :to="item.to"
          @click="closeMenu"
        >
          {{ item.label }}
        </RouterLink>
      </div>

      <RouterLink to="/contact" @click="closeMenu">Contact</RouterLink>

      <a :href="whatsapp" target="_blank" rel="noopener">
        WhatsApp us
      </a>
    </nav>
  </header>

  <div
    v-if="dropdown && !open"
    class="dropdown-dismiss"
    aria-hidden="true"
    @click="closeMenu"
  ></div>
</template>

<style scoped>
.site-header {
  position: relative;
  z-index: 60;
  overflow: visible;
}

.nav-dropdown {
  position: relative;
}

.dropdown-trigger {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 0;
  border: 0;
  background: transparent;
  color: #475569;
  font: inherit;
  font-weight: 700;
  cursor: pointer;
}

.dropdown-trigger:hover,
.dropdown-trigger.active {
  color: #0284c7;
}

.dropdown-arrow {
  display: inline-block;
  font-size: 14px;
  transition: transform 0.2s;
}

.dropdown-arrow.rotated {
  transform: rotate(180deg);
}

.dropdown-panel {
  position: absolute;
  top: calc(100% + 12px);
  left: -16px;
  z-index: 2;
  width: 220px;
  padding: 8px;
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  box-shadow: 0 16px 40px rgb(15 23 42 / 12%);
}

.info-dropdown {
  width: 270px;
}

.desktop-nav .dropdown-panel a {
  display: block;
  padding: 11px 14px;
  border-radius: 9px;
  color: #475569;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  transition: background 0.2s, color 0.2s;
}

.desktop-nav .dropdown-panel a:hover {
  color: #0369a1;
  background: #f0f9ff;
}

.desktop-nav .dropdown-panel .dropdown-overview {
  margin-bottom: 5px;
  color: #0369a1;
  background: #f0f9ff;
  font-weight: 800;
}

.mobile-dropdown-trigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 12px 0;
  border: 0;
  background: transparent;
  color: #0f172a;
  font: inherit;
  font-weight: 700;
  text-align: left;
  cursor: pointer;
}

.mobile-submenu {
  display: grid;
  gap: 4px;
  margin-bottom: 8px;
  padding: 8px;
  background: #f0f9ff;
  border-radius: 12px;
}

.mobile-nav .mobile-submenu a {
  padding: 10px 12px;
  color: #0369a1;
  font-size: 14px;
  text-decoration: none;
}

.dropdown-trigger:focus-visible,
.mobile-dropdown-trigger:focus-visible,
.dropdown-panel a:focus-visible,
.mobile-submenu a:focus-visible {
  outline: 3px solid #38bdf8;
  outline-offset: 3px;
  border-radius: 6px;
}

.dropdown-dismiss {
  position: fixed;
  inset: 0;
  z-index: 59;
  background: transparent;
}
</style>
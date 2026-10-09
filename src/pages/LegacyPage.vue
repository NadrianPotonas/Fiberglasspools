<script setup>
import { computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import pages from '../data/legacy-pages.json'
const route = useRoute()
const page = computed(() => pages.find(p => p.path === route.path && !p.supplement))
const email = computed(() => 'mailto:info@justfibreglasspools.co.za?subject=' + encodeURIComponent('Enquiry: ' + (page.value?.title || 'Pool enquiry')))
</script>
<template><section v-if="page" class="page-section"><div class="container">
<h1>{{ page.title }}</h1>


<div class="legacy-content" v-html="page.html"></div>
<p><a :href="email" class="primary-button">Request a quote / enquire</a></p>
<p><RouterLink to="/pools">Browse the current pool range</RouterLink></p>
</div></section></template>
<style scoped>
.legacy-content { overflow-wrap: anywhere; overflow-x: auto; margin: 24px 0; }
.legacy-content :deep(img) { max-width:100%; height:auto; max-height:500px; object-fit:contain; margin:12px; }
.legacy-content :deep(table) { width:100%; border-collapse:collapse; }
.legacy-content :deep(td),.legacy-content :deep(th) { padding:12px; border-bottom:1px solid #e2e8f0; }
.legacy-content :deep(p) { margin:12px 0; }
.legacy-content :deep(h2) { font-size:1.5rem; font-weight:700; margin:20px 0 12px; }
.legacy-content :deep(a) { color:#0369a1; text-decoration:underline; }
</style>

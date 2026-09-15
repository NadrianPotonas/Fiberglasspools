<script setup>
import { RouterLink } from 'vue-router'

const sections = [
  ['benefits', 'Why Fibreglass'],
  ['shells', 'Our Shells'],
  ['comparison', 'Fibreglass vs Concrete'],
  ['construction', 'How the Shell Is Built'],
  ['diy', 'DIY Installation'],
  ['care', 'Pool Care'],
  ['ownership', 'Pool Ownership'],
  ['guarantees', 'Guarantees & Information'],
]

function scrollToSection(id) {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    history.replaceState(null, '', `#${id}`)
  }
}
</script>

<template>
  <section class="page-hero why-hero">
    <div class="container">
      <p class="eyebrow dark">Pool information</p>
      <h1>Why Fibreglass?</h1>
      <p>Everything you need to know about our fibreglass pools, installation, maintenance, construction and guarantees.</p>
    </div>
  </section>

  <div class="info-nav-wrap">
    <div class="container info-nav">
      <a v-for="item in sections" :key="item[0]" :href="`#${item[0]}`" @click.prevent="scrollToSection(item[0])">{{ item[1] }}</a>
    </div>
  </div>

  <section id="benefits" class="page-section">
    <div class="container">
      <div class="section-heading"><div><p class="eyebrow dark">Why smart buyers choose fibreglass</p><h2>Strong, practical and easier to maintain.</h2></div></div>
      <div class="benefit-grid">
        <article><span>01</span><h3>Stronger</h3><p>Fibreglass pools combine strength and flexibility, with multiple layers and reinforcing throughout the shell.</p></article>
        <article><span>02</span><h3>Quick & easier to install</h3><p>Factory-manufactured shells make installation quicker and easier than a conventional concrete pool.</p></article>
        <article><span>03</span><h3>Easier to maintain</h3><p>The smooth, non-porous surface makes routine cleaning a quick and straightforward operation.</p></article>
        <article><span>04</span><h3>Quality materials</h3><p>Only SABS-approved materials are used in our fibreglass pools.</p></article>
        <article><span>05</span><h3>Nationwide</h3><p>We supply pools nationwide and can assist with delivery and installation requirements.</p></article>
        <article><span>06</span><h3>After-sales service</h3><p>We provide support after your pool has been supplied and installed.</p></article>
      </div>
    </div>
  </section>

  <section id="shells" class="comparison-section">
    <div class="container">
      <div class="section-heading"><div><p class="eyebrow dark">Why our shells</p><h2>Built with strength in mind.</h2></div></div>
      <div class="feature-list-grid">
        <div><strong>More layers & reinforcing</strong><p>Our shells use a multi-layer laminate specification with structural reinforcement.</p></div>
        <div><strong>15-year shell guarantee</strong><p>Qualified clients receive a 15-year guarantee on the shell.</p></div>
        <div><strong>Export quality</strong><p>Our shells are manufactured to a high-quality standard.</p></div>
        <div><strong>SABS materials</strong><p>Only SABS-approved materials are used.</p></div>
        <div><strong>DIY assistance</strong><p>Customers choosing to install their own pool can receive DIY assistance.</p></div>
        <div><strong>Flexible strength</strong><p>The factory pre-moulded shell combines strength and flexibility to accommodate a wide range of ground conditions.</p></div>
      </div>
    </div>
  </section>

  <section id="comparison" class="page-section">
    <div class="container">
      <div class="section-heading"><div><p class="eyebrow dark">Your options</p><h2>Fibreglass or concrete?</h2></div><p>We offer both options. The right choice depends on your property, design and requirements.</p></div>
      <div class="comparison-grid">
        <div class="comparison-card featured"><h3>Fibreglass Pools</h3><ul><li>Factory-manufactured shell</li><li>Flexible strength</li><li>Smooth, non-porous surface</li><li>Quick installation</li><li>Easy routine cleaning</li><li>Multiple shell layers and reinforcing</li></ul><RouterLink to="/pools" class="text-link">View fibreglass pools <span>→</span></RouterLink></div>
        <div class="comparison-card"><h3>Concrete Pools</h3><ul><li>Built on site</li><li>Custom shapes and sizes</li><li>Suitable for bespoke designs</li><li>Can incorporate custom layouts and features</li><li>Longer construction process</li><li>Different maintenance requirements</li></ul><RouterLink to="/contact" class="text-link">Enquire about a concrete pool <span>→</span></RouterLink></div>
      </div>
      <div class="notice-card"><strong>Yes, we also build concrete pools.</strong><p>If a concrete pool is better suited to your property or you want a completely custom design, contact us and we can discuss your requirements.</p></div>
    </div>
  </section>

  <section id="construction" class="layers-section">
    <div class="container">
      <div class="section-heading"><div><p class="eyebrow dark">Manufacturing</p><h2>How our fibreglass shell is built.</h2></div><p>The basic laminate specification consists of six main layers.</p></div>
      <div class="layers-detail">
        <article><b>01</b><div><h3>Gelcoat layer</h3><p>The surface in contact with the water. The NPG gelcoat is available in different colours and chip colours.</p></div></article>
        <article><b>02</b><div><h3>Corrosion barrier</h3><p>A heat- and chemical-resistant vinyl ester-rich layer behind the gelcoat provides a strong corrosion barrier.</p></div></article>
        <article><b>03</b><div><h3>Structural lamination</h3><p>The main body of the shell, contributing approximately 80% of the total strength across key structural areas.</p></div></article>
        <article><b>04</b><div><h3>Stiffening ribs</h3><p>Core material and fibreglass reinforcement are used in strategic areas to improve stiffness during transport and installation.</p></div></article>
        <article><b>05</b><div><h3>Buffer zone</h3><p>A polyethylene core with fibreglass laminate provides additional protection during transport and installation.</p></div></article>
        <article><b>06</b><div><h3>Outer surface sealer</h3><p>An alkaline-resistant coat seals the laminate against attack from soil, acid, cement and other materials.</p></div></article>
      </div>
      <p class="small-note">Structural laminate thickness varies between approximately 5–16 mm depending on the pool size and the area of the shell being measured.</p>
    </div>
  </section>

  <section id="diy" class="page-section">
    <div class="container">
      <div class="section-heading"><div><p class="eyebrow dark">DIY assistance</p><h2>Installing your own fibreglass pool.</h2></div><p>DIY installation is possible for suitable projects. Plan the site carefully and contact us before starting.</p></div>
      <div class="steps-grid">
        <article><b>01</b><h3>Choose the site</h3><p>Choose a site that is as level as possible and consider the cost of retaining walls, rocky ground and excavation.</p></article>
        <article><b>02</b><h3>Check access & services</h3><p>Make sure the shell can reach the site and that sewer, water pipelines and buried service cables are accounted for.</p></article>
        <article><b>03</b><h3>Check local requirements</h3><p>Contact your local municipality to determine whether permissions or plans are required.</p></article>
        <article><b>04</b><h3>Mark & excavate</h3><p>Mark the exact pool shape, allow the required over-excavation and excavate to the manufacturer's specified depth.</p></article>
        <article><b>05</b><h3>Prepare the base</h3><p>Compact the excavation, prepare the sand bed and screed it level to the required depth.</p></article>
        <article><b>06</b><h3>Position the shell</h3><p>Lower the shell into position and check the datum and finished levels carefully.</p></article>
        <article><b>07</b><h3>Backfill carefully</h3><p>Add water to the pool as specified, check levels and backfill progressively with clean sand while supporting the shell.</p></article>
        <article><b>08</b><h3>Finish the installation</h3><p>Complete plumbing and optional light openings, finish the backfill and prepare the surrounding ground and paving.</p></article>
      </div>
      <div class="notice-card"><strong>Important installation note</strong><p>Electrical connections must be completed by a qualified electrician. In low-lying areas with a high water table, the supplied installation guidance recommends a cement-and-dry-sand backfill mix. Professional advice should be obtained where site conditions require it.</p></div>
    </div>
  </section>

  <section id="care" class="comparison-section">
    <div class="container">
      <div class="section-heading"><div><p class="eyebrow dark">Pool care</p><h2>Looking after your pool.</h2></div><p>Good water balance, filtration and circulation are the three golden rules for maintaining a healthy swimming pool.</p></div>
      <div class="care-grid">
        <article><h3>After installation</h3><p>Brush the surface with a nylon brush to loosen cement particles, remove loose stone and cement, then follow the supplied cleaning procedure before normal use.</p></article>
        <article><h3>Water balance</h3><p>The supplied guidance lists pH 7.0 for fibreglass pools, chlorine 1–3 ppm, alkalinity 80–120 ppm and calcium 250 ppm.</p></article>
        <article><h3>Filtration</h3><p>Use the correctly sized pump and filter. The supplied guidance recommends at least 12 hours of filtration in summer, with filter sand changed after 5 years and cleaned at the start of the swimming season.</p></article>
        <article><h3>Circulation</h3><p>Make sure the aim flow and weir are installed correctly and check for suction leaks so there are no circulation dead spots.</p></article>
        <article><h3>Recommended chemicals</h3><p>The supplied list includes a Month Mate pool floater, salt chlorinator, pool acid and HTH chlorine.</p></article>
        <article><h3>Water treatment</h3><p>Test the water weekly, backwash and rinse weekly, and keep chlorine at 1–3 ppm. The supplied guidance lists pH 7.0 for fibreglass and 7.2–7.4 for marblite.</p></article>
      </div>
      <div class="notice-card"><strong>Filter functions</strong><p><b>Filter:</b> normal water filtration. <b>Close:</b> blocks air to the system when opening the pump lid. <b>Backwash:</b> cleans filter sand. <b>Rinse:</b> clears water after backwash. <b>Bypass:</b> sends water directly from the weir to the aim flow when chemicals are applied. <b>Waste:</b> sends water directly to the drain when cleaning or removing sand and debris.</p></div>
    </div>
  </section>

  <section id="ownership" class="comparison-section">
    <div class="container">
      <div class="section-heading"><div><p class="eyebrow dark">Pool ownership</p><h2>Benefits of having a pool.</h2></div></div>
      <div class="benefit-grid"><article><span>01</span><h3>Property value</h3><p>A pool can add value to your property.</p></article><article><span>02</span><h3>Enjoyment</h3><p>A pool provides a relaxing and refreshing space.</p></article><article><span>03</span><h3>Exercise & health</h3><p>Swimming provides exercise and health benefits.</p></article><article><span>04</span><h3>Family entertainment</h3><p>A pool creates entertainment for children and the whole family.</p></article><article><span>05</span><h3>Fits your home</h3><p>The pool should complement your house and garden.</p></article><article><span>06</span><h3>Choose the right size</h3><p>Smaller pools can reduce water and chemical costs while still providing plenty of enjoyment.</p></article></div>
      <div class="notice-card"><strong>Choosing the size of a pool</strong><p>The supplied information notes that larger pools can be colder and cost more in chemicals and water. A smaller pool can work just as well in a garden and take up less space; shape can be more important than size when deciding what works for the property.</p></div>
    </div>
  </section>

  <section id="guarantees" class="guarantee-section">
    <div class="container">
      <p class="eyebrow dark">Guarantees & information</p>
      <h2>Know what is included.</h2>
      <div class="guarantee-grid">
        <div><strong>15 years</strong><span>Shell guarantee for qualified clients</span></div>
        <div><strong>1 year</strong><span>Gel coat guarantee for qualified clients</span></div>
        <div><strong>12 months</strong><span>DIY workmanship & equipment</span></div>
      </div>
      <p>Guarantees do not cover water damage, earth movement or wrongful installation according to the supplied information.</p>
      <div class="payment-grid">
        <div><h3>Delivery</h3><p>Share-load deliveries are used to help lower delivery costs.</p></div>
        <div><h3>Payments</h3><p>For the stated pool terms: 50% on order and 50% on delivery before off-loading.</p></div>
        <div><h3>Pool contractors</h3><p>For pool contractors to their customers: 50% on acceptance, 45% on delivery and 5% on completion.</p></div>
      </div>
      <RouterLink to="/contact" class="text-link">Ask us about your pool <span>→</span></RouterLink>
    </div>
  </section>
</template>

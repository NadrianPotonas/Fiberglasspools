import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import Pools from '../pages/Pools.vue'
import WhyFibreglass from '../pages/WhyFibreglass.vue'
import Contact from '../pages/Contact.vue'

export default createRouter({
  history: createWebHashHistory(),
  scrollBehavior(to) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
        top: 80,
      }
    }
    return { top: 0 }
  },
  routes: [
    { path: '/', component: Home },
    { path: '/pools', component: Pools },
    { path: '/why-fibreglass', component: WhyFibreglass },
    { path: '/contact', component: Contact },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
})

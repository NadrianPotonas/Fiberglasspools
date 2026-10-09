import { createRouter, createWebHistory, createMemoryHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import Pools from '../pages/Pools.vue'
import WhyFibreglass from '../pages/WhyFibreglass.vue'
import Contact from '../pages/Contact.vue'
import PoolDetail from '../pages/PoolDetail.vue'
import LegacyPage from '../pages/LegacyPage.vue'
import legacyPages from '../data/legacy-pages.json'
import NotFound from '../pages/NotFound.vue'
import { pools, slug } from '../catalog'
export function makeRouter(server = false) {
 return createRouter({
 history: server ? createMemoryHistory() : createWebHistory(import.meta.env.BASE_URL),
 scrollBehavior(to) { return to.hash ? { el: to.hash, behavior: 'smooth', top: 80 } : { top: 0 } },
 routes: [
 { path: '/', component: Home }, { path: '/pools', component: Pools },
 { path: '/pools/:slug', component: PoolDetail, beforeEnter: to => pools.some(p=>slug(p.name)===to.params.slug) ? true : '/404' },
 ...legacyPages.filter(p=>!p.supplement).map(p=>({path:p.path,component:LegacyPage})), { path: '/why-fibreglass', component: WhyFibreglass },
 { path: '/contact', component: Contact }, { path: '/404', component: NotFound },
 { path: '/:pathMatch(.*)*', component: NotFound }
 ] })
}

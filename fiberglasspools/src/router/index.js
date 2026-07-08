import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import Pools from '../pages/Pools.vue'
import Contact from '../pages/Contact.vue'
import Concrete from '../pages/Concrete.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/pools', component: Pools },
  { path: '/concrete', component: Concrete },
  { path: '/contact', component: Contact },
]

export default createRouter({
  history: createWebHashHistory(),
  routes,
})

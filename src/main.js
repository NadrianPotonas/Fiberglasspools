import { createApp } from 'vue'
import App from './App.vue'
import { makeRouter } from './router'
import { updateHead } from './seo'
import './style.css'
const router=makeRouter()
router.afterEach(to=>updateHead(to.path))
const app=createApp(App).use(router)
router.isReady().then(()=>app.mount('#app'))

import { createSSRApp } from 'vue'
import { renderToString } from '@vue/server-renderer'
import App from './App.vue'
import { makeRouter } from './router'
import { metadata } from './seo'
import { pools, slug } from './catalog'
import legacyPages from './data/legacy-pages.json'
export const paths=['/','/pools','/about','/contact','/why-fibreglass','/404',...pools.map(p=>'/pools/'+slug(p.name)),...legacyPages.filter(p=>!p.supplement&&p.path!='/about').map(p=>p.path)]
export async function render(path){const router=makeRouter(true);const app=createSSRApp(App).use(router);await router.push(path);await router.isReady();return {html:await renderToString(app),meta:metadata(path)}}

import { pools, slug } from './catalog'
import legacyPages from './data/legacy-pages.json'
export const origin = 'https://www.fibreglasspoolssa.co.za'
const pages = {
 '/': ['Fibreglass Pools & DIY Pool Quotes | JUST DIY IT Pools', 'Browse fibreglass pools, compare dimensions and request a quote from JUST DIY IT Pools in South Africa.'],
 '/pools': ['Fibreglass Pool Range & Prices | JUST DIY IT Pools', 'Compare our pool range by size, depth and listed price. Request a quote for delivery and installation.'],
 '/about': ['About JUST DIY IT Pools', 'Contact JUST DIY IT Pools for advice on choosing a fibreglass pool and available delivery and installation options.'],
 '/contact': ['Contact & Pool Quotes | JUST DIY IT Pools', 'Contact our team by phone, WhatsApp or email to discuss your pool and request a quote.'],
 '/why-fibreglass': ['Why Choose Fibreglass Pools? | JUST DIY IT Pools', 'Learn about fibreglass swimming pools, installation and pool care.']
}
export function metadata(path) {
 const pool = pools.find(p=>path === '/pools/'+slug(p.name))
 const legacy = legacyPages.find(p=>p.path===path&&!p.supplement)
 const entry = (legacy ? [legacy.title+' | JUST DIY IT Pools',legacy.description] : pages[path]) || (pool ? [`Request a Quote for ${pool.name} | JUST DIY IT Pools`, `${pool.name}: ${pool.size}, depth ${pool.depth}. Request a quote and confirm delivery and installation options.`] : ['Page not found | JUST DIY IT Pools','This page is unavailable.'])
 const business = {'@context':'https://schema.org','@type':'Organization','@id':origin+'/#business',name:'JUST DIY IT Pools',url:origin,telephone:'+27767401410',email:'info@justfibreglasspools.co.za'}
 const schema = pool ? [business, {'@context':'https://schema.org','@type':'Product',name:pool.name+' pool',description:entry[1],image:origin+'/'+(pool.installationImage||pool.shellImage),url:origin+path,additionalProperty:[{'@type':'PropertyValue',name:'Size',value:pool.size},{'@type':'PropertyValue',name:'Depth',value:pool.depth}]}] : [business]
 return { title:entry[0],description:entry[1],canonical:origin+path,schema,noindex:!pages[path]&&!pool&&!legacy }
}
export function updateHead(path) {
 const m=metadata(path);document.title=m.title
 const set=(selector,tag,attrs)=>{let el=document.head.querySelector(selector);if(!el){el=document.createElement(tag);document.head.appendChild(el)}Object.entries(attrs).forEach(([k,v])=>el.setAttribute(k,v))}
 set('meta[name="description"]','meta',{name:'description',content:m.description})
 set('meta[name="robots"]','meta',{name:'robots',content:m.noindex?'noindex,follow':'index,follow'})
 set('link[rel="canonical"]','link',{rel:'canonical',href:m.canonical})
 for(const [property,content] of Object.entries({'og:title':m.title,'og:description':m.description,'og:url':m.canonical,'og:type':'website'}))set(`meta[property="${property}"]`,'meta',{property,content})
 let s=document.getElementById('site-schema');if(!s){s=document.createElement('script');s.id='site-schema';s.type='application/ld+json';document.head.appendChild(s)}s.textContent=JSON.stringify(m.schema)
}

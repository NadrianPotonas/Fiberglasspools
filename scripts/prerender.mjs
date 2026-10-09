import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { render, paths } from '../.ssr/entry-server.js'
const template=await readFile('dist/index.html','utf8')
const escape=s=>s.replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
for(const path of paths){
 const {html,meta:m}=await render(path)
 const head=`<title>${escape(m.title)}</title><meta name="description" content="${escape(m.description)}"><meta name="robots" content="${m.noindex?'noindex,follow':'index,follow'}"><link rel="canonical" href="${m.canonical}"><meta property="og:title" content="${escape(m.title)}"><meta property="og:description" content="${escape(m.description)}"><meta property="og:url" content="${m.canonical}"><meta property="og:type" content="website"><script id="site-schema" type="application/ld+json">${JSON.stringify(m.schema).replace(/</g,'\u003c')}</script>`
 const result=template.replace(/<title>.*?<\/title>/s,'').replace('</head>',head+'</head>').replace('<div id="app"></div>',`<div id="app">${html}</div>`)
 const file=path==='/404'?'dist/404.html':path==='/'?'dist/index.html':`dist${path}/index.html`
 await mkdir(file.slice(0,file.lastIndexOf('/')),{recursive:true});await writeFile(file,result)
}
await writeFile('dist/sitemap.xml',`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${paths.filter(p=>p!='/404').map(p=>`<url><loc>https://www.fibreglasspoolssa.co.za${p}</loc></url>`).join('')}</urlset>`)
console.log(`Prerendered ${paths.length} pages`)

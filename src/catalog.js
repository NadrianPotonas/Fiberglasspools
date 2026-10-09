import data from './data/pools.json'
export const slug = name => name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
export const pools = Object.values(data).flat().filter((p,i,a)=>a.findIndex(x=>x.name===p.name)===i)

from pathlib import Path
from urllib.parse import urlsplit
import csv,re,json
root=Path(__file__).resolve().parent.parent
rules=[];conds=[]
for line in (root/'public/.htaccess').read_text().splitlines():
 if line.startswith('RewriteCond %{QUERY_STRING} '):conds.append(line.split(' ',2)[2].split(' [')[0])
 elif line.startswith('RewriteRule ') and ('R=301' in line or '[G,L]' in line):
  _,pattern,target,*flags=line.split();rules.append((conds,pattern,target,'410' if '[G,L]' in line else '301'));conds=[]
def result(url):
 u=urlsplit(url)
 for conditions,pattern,target,action in rules:
  if re.search(pattern,u.path.lstrip('/')) and all(re.search(c,u.query,re.I) for c in conditions):return action,target
 return None
rows=list(csv.DictReader((root/'REDIRECT-MAP.csv').open()))
counts={'301':0,'410':0}
for r in rows:
 if r['action'] not in counts:continue
 if urlsplit(r['old_url']).path!='/':assert result(r['old_url'])==(r['action'],r['new_path'] if r['action']=='301' else '-'),r
 if r['action']=='301':
  f=root/'dist'/r['new_path'].lstrip('/');assert f.is_file() or (f/'index.html').is_file(),r
 counts[r['action']]+=1
for path,key in [('stockview.php','stockid'),('catview.php','catid'),('newsreader.php','newsid')]:assert result('https://www.fibreglasspoolssa.co.za/'+path+'?'+key+'=999999') is None
assert set(r['path'] for r in json.loads((root/'src/data/legacy-pages.json').read_text()))=={'/about','/entrepreneur'}
for f in (root/'dist').rglob('index.html'):
 s=f.read_text();assert '<h1' in s and 'rel="canonical"' in s
 assert 'More about' not in s and 'View pool details' not in s
 for im in re.findall(r'<img[^>]+src="(/legacy-assets/[^"?]+)"',s):assert (root/'dist'/im.lstrip('/')).is_file()
print('Passed migration checks:',counts)
print('Actual HTTP 301/410/404 responses need Apache hosting verification.')

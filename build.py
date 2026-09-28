import json
t=open('src/template.html').read()
d={k:open(f'data/{k}.txt').read() for k in ['pokemon','habitats','recipes','favorites','pokedetail','crafting']}
d['items']=''.join(open(f'data/items{i}.txt').read() for i in range(1,5))
t=t.replace('/*FOOD*/',open('src/food.js').read()).replace('/*ART*/',open('src/art.js').read()).replace('/*DATA*/null',json.dumps(d,ensure_ascii=False))
if '.card.hab{cursor:default}' not in t: t=t.replace('.hab .mats{','.card.hab{cursor:default}\n.hab .mats{')
open('artifact.html','w').write(t)
head='<!doctype html><html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><style>body{margin:0}img{max-width:100%}[hidden]{display:none!important}</style></head><body>'
open('index.html','w').write(head+t+'</body></html>')

# Builds src/app/uniqlo.ts from _logs/uniqlo-raw.json (written by tools/fetch-uniqlo.mjs).
# Names, cuts, fabrics and colours of the first 11 items live in tools/uniqlo_meta.py.
import json,re
raw=json.load(open('_logs/uniqlo-raw.json',encoding='utf8'))
src=open('tools/uniqlo_meta.py',encoding='utf8').read()
# reuse META / HEX / ZH from the first generator
ns={}
exec(src.split("items=[]")[0].replace("raw=json.load(open('_logs/uniqlo-raw.json',encoding='utf8'))",""),ns)
META=ns['META']; HEX=ns['HEX']; ZH=ns['ZH']
HEX.update({"LIGHT BLUE":"#9fc3e0","DARK PURPLE":"#4a3553","LIGHT PURPLE":"#b9a6c9"}); ZH.update({"LIGHT BLUE":"淺藍","DARK PURPLE":"深紫","LIGHT PURPLE":"淺紫"})
META.update({
 "E482285-000":("麻混打褶長裙","skirts",dict(type="skirt",sleeve="none",neckline="crew",silhouette="aline"),"棉66% 麻34% 梭織"),
 "E482286-000":("層次感長裙","skirts",dict(type="skirt",sleeve="none",neckline="crew",silhouette="aline"),"棉100% 梭織"),
 "E487996-000":("雪紡百褶中長裙","skirts",dict(type="skirt",sleeve="none",neckline="crew",silhouette="aline"),"聚酯纖維100% 雪紡 梭織"),
 "E487997-000":("刷毛針織喇叭長裙","skirts",dict(type="skirt",sleeve="none",neckline="crew",silhouette="aline"),"聚酯纖維48% 棉40% 嫘縈12% 針織"),
 "E487016-000":("運動無鋼圈內衣","sports",dict(type="top",sleeve="none",neckline="scoop",silhouette="fitted"),"尼龍90% 彈性纖維10% 針織"),
 "E483458-000":("Ultra Stretch 運動 T 恤","sports",dict(type="top",sleeve="short",neckline="crew",silhouette="fitted"),"聚酯纖維86% 彈性纖維14% 針織"),
 "E483546-000":("Ultra Stretch 運動緊身褲","sports",dict(type="pants",sleeve="none",neckline="crew",silhouette="fitted"),"尼龍77% 彈性纖維23% 針織"),
 "E483296-000":("Ultra Stretch 喇叭運動緊身褲","sports",dict(type="pants",sleeve="none",neckline="crew",silhouette="aline"),"尼龍77% 彈性纖維23% 針織"),
 "E483294-000":("Ultra Stretch 運動短褲","sports",dict(type="pants",sleeve="none",neckline="crew",silhouette="straight"),"聚酯纖維72% 彈性纖維28% 梭織"),
 "E483295-000":("Ultra Stretch 單車短褲","sports",dict(type="pants",sleeve="none",neckline="crew",silhouette="fitted"),"尼龍77% 彈性纖維23% 針織"),
 "E483282-000":("寬版運動褲","sports",dict(type="pants",sleeve="none",neckline="crew",silhouette="oversized"),"棉86% 聚酯纖維14% 針織"),
})
# the wireless bra is sold by body bust, not garment size: approximate garment measurements from UNIQLO's
# bra size guide (bust ranges S 79-85, M 82-88, L 86-92, XL 90-96 cm), cropped under the bust
BRA=[("S",76,28),("M",80,29),("L",84,30),("XL",88,31)]
items=[]
for pid,(zh,group,cut,fabric) in META.items():
    v=raw[pid]
    seen=set(); colors=[]
    for c in v['colors']:
        n=c['name']
        if n in seen or n not in HEX: continue
        seen.add(n); colors.append({"name":ZH[n],"hex":HEX[n]})
    sizes=[]
    for s in v['sizeChart']:
        p=s['parts']; m={}
        L=p.get('body-length-back',p.get('knit-body-length-front',p.get('skirt-length')))
        if L: m['length']=L
        if 'shoulder-width' in p and cut['type'] in ('top','dress'): m['shoulder']=p['shoulder-width']
        if 'body-width' in p and cut['type'] in ('top','dress'): m['chest']=round(p['body-width']*2,1)
        if 'waist-product-size' in p: m['waist']=p['waist-product-size']
        if 'hip-product-size' in p: m['hip']=p['hip-product-size']
        if 'sleeve-length-cb' in p and 'shoulder-width' in p: m['sleeveLength']=round(p['sleeve-length-cb']-p['shoulder-width']/2,1)
        if cut['type']=='skirt' and p.get('bottom-width'): m['hem']=round(p['bottom-width']*2,1)
        if cut['type']=='pants':
            if p.get('bottom-width'): m['legOpening']=round(p['bottom-width']*2,1)
            if p.get('thigh'):
                # thigh is a flat width, except the biker shorts chart which gives the full girth
                m['thigh']=p['thigh'] if pid=="E483295-000" else round(p['thigh']*2,1)
            if p.get('inseam'): m['inseam']=p['inseam']
        sizes.append({"size":s['size'],"m":m})
    body={}
    for b in v.get('body',[]):
        r={}
        for code,key in (('nude-bust','bust'),('nude-waist','waist'),('nude-hip','hips')):
            if code in b['parts'] and '-' in b['parts'][code]:
                lo,hi=b['parts'][code].split('-'); r[key]=[float(lo),float(hi)]
        body[b['size']]=r
    if pid=="E487016-000":
        # sold by body bust: garment chest a little under the smallest bust of the range (stretch knit)
        sizes=[{"size":z,"m":{"chest":body[z]['bust'][0]-3,"length":28+k*0.8}} for k,z in enumerate(body)]
    for z in sizes:
        if z['size'] in body: z['body']=body[z['size']]
    site=v.get('site','us')
    items.append({"id":pid,"name":zh,"en":v['name'],"group":group,**cut,"fabricText":fabric,"colors":colors,"sizes":sizes,
      "sizing":"asia" if site=="jp" else "us",
      "url":f"https://www.uniqlo.com/{site}/{'ja' if site=='jp' else 'en'}/products/{pid}/00"})
out="""// UNIQLO plain basics used as the standard fitting set (標準試穿). Finished-garment measurements and the
// body-size range of every size come from UNIQLO's own size charts, fetched 2026-09-29 by
// tools/fetch-uniqlo.mjs: Japan site (Asian sizing = Taiwan labels) where the item is sold there,
// otherwise the US site (sizing "us": labels run about one size larger). chest = body width x 2,
// sleeve length = centre-back sleeve - shoulder / 2, flat hem / thigh widths x 2. The wireless bra is
// sold by body bust only: its garment chest is approximated from the bust range.
// Regenerate with `node tools/fetch-uniqlo.mjs && python tools/gen-uniqlo.py`.

import type { GarmentKey } from "../fit/sizeChart";
import type { GarmentType, Neckline, Silhouette, Sleeve } from "../garment/spec";

export interface UniqloItem {
  id: string; name: string; en: string; group: keyof typeof UNIQLO_GROUPS;
  type: GarmentType; sleeve: Sleeve; neckline: Neckline; silhouette: Silhouette;
  fabricText: string; url: string;
  /** asia: Japan / Taiwan labels; us: US labels (about one size larger) */
  sizing: "asia" | "us";
  colors: { name: string; hex: string }[];
  sizes: { size: string; m: Partial<Record<GarmentKey, number>>; body?: Partial<Record<"bust" | "waist" | "hips", [number, number]>> }[];
}

export const UNIQLO_GROUPS = { innerwear: "內衣（罩杯式背心）", tops: "上衣", dresses: "洋裝", skirts: "長裙", sports: "運動" } as const;

export const UNIQLO: UniqloItem[] = """+json.dumps(items,ensure_ascii=False,indent=1)+";\n"
open('src/app/uniqlo.ts','w',encoding='utf8').write(out)
print(len(items))

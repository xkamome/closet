# Base metadata for the UNIQLO catalogue (read by tools/gen-uniqlo.py). Running it alone writes the
# first-generation catalogue; use tools/gen-uniqlo.py instead.
import json
raw=json.load(open('_logs/uniqlo-raw.json',encoding='utf8'))
# curated: Chinese name, group, cut, fabric text (from the official composition + knit/woven)
META={
 "E473980-000":("AIRism 罩杯式背心","innerwear",dict(type="top",sleeve="none",neckline="scoop",silhouette="fitted"),"AIRism 聚酯纖維 嫘縈 彈性纖維 針織"),
 "E473977-000":("AIRism 罩杯式細肩帶背心","innerwear",dict(type="top",sleeve="none",neckline="boat",silhouette="fitted"),"AIRism 聚酯纖維 嫘縈 彈性纖維 針織"),
 "E482195-000":("羅紋短版罩杯式背心","innerwear",dict(type="top",sleeve="none",neckline="scoop",silhouette="fitted"),"棉96% 彈性纖維4% 羅紋針織"),
 "E465755-000":("AIRism 棉質圓領 T 恤","tops",dict(type="top",sleeve="short",neckline="crew",silhouette="oversized"),"棉70% 聚酯纖維30% 針織"),
 "E424873-000":("圓領 T 恤","tops",dict(type="top",sleeve="short",neckline="crew",silhouette="straight"),"棉100% 針織"),
 "E465760-000":("Mini T 恤（短版合身）","tops",dict(type="top",sleeve="short",neckline="crew",silhouette="fitted"),"棉96% 彈性纖維4% 針織"),
 "E487579-000":("Mini T 恤 長袖","tops",dict(type="top",sleeve="long",neckline="crew",silhouette="fitted"),"棉96% 彈性纖維4% 針織"),
 "E465751-000":("柔軟羅紋圓領 T 恤 長袖","tops",dict(type="top",sleeve="long",neckline="crew",silhouette="fitted"),"棉57% 嫘縈39% 彈性纖維4% 羅紋針織"),
 "E482982-000":("Ultra Stretch AIRism 洋裝","dresses",dict(type="dress",sleeve="none",neckline="crew",silhouette="aline"),"聚酯纖維100% 彈性 針織"),
 "E488722-000":("可機洗羅紋針織洋裝","dresses",dict(type="dress",sleeve="none",neckline="crew",silhouette="fitted"),"嫘縈72% 聚酯纖維28% 羅紋針織"),
 "E488186-000":("雙面針織無袖洋裝","dresses",dict(type="dress",sleeve="none",neckline="crew",silhouette="straight"),"棉23% 壓克力21% 聚酯纖維16% 羊毛16% 尼龍13% 嫘縈11% 針織"),
}
HEX={"WHITE":"#f4f2ee","OFF WHITE":"#efe9dc","NATURAL":"#e6dccb","CREAM":"#efe4c8","BEIGE":"#d8c3a3","LIGHT GRAY":"#c9c8c5","GRAY":"#9d9c99","DARK GRAY":"#55565a",
 "BLACK":"#1f1f22","NAVY":"#232f4b","BLUE":"#5a7fb3","GREEN":"#5f7556","DARK BROWN":"#4a3326","BROWN":"#7a5238","WINE":"#6e2635","RED":"#b8323a","PINK":"#e3a7b4",
 "PURPLE":"#76608f","YELLOW":"#e7c75a","ORANGE":"#d9793e"}
ZH={"WHITE":"白","OFF WHITE":"米白","NATURAL":"原色","CREAM":"奶油","BEIGE":"米色","LIGHT GRAY":"淺灰","GRAY":"灰","DARK GRAY":"深灰","BLACK":"黑","NAVY":"海軍藍","BLUE":"藍",
 "GREEN":"綠","DARK BROWN":"深咖啡","BROWN":"咖啡","WINE":"酒紅","RED":"紅","PINK":"粉紅","PURPLE":"紫","YELLOW":"黃","ORANGE":"橘"}
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
        L=p.get('body-length-back',p.get('knit-body-length-front'))
        if L: m['length']=L
        if 'shoulder-width' in p: m['shoulder']=p['shoulder-width']
        if 'body-width' in p: m['chest']=round(p['body-width']*2,1)
        if 'hip-product-size' in p: m['hip']=p['hip-product-size']
        if 'sleeve-length-cb' in p and 'shoulder-width' in p: m['sleeveLength']=round(p['sleeve-length-cb']-p['shoulder-width']/2,1)
        sizes.append({"size":s['size'],"m":m})
    items.append({"id":pid,"name":zh,"en":v['name'],"group":group,**cut,"fabricText":fabric,"colors":colors,"sizes":sizes,
      "url":f"https://www.uniqlo.com/us/en/products/{pid}/00"})
src="""// UNIQLO plain basics used as the standard fitting set (標準試穿). Finished-garment measurements per
// size come from UNIQLO's own size charts (US site, fetched 2026-09-29 by tools/fetch-uniqlo.mjs):
// chest = body width x 2, sleeve length = centre-back sleeve - shoulder / 2. Regenerate with
// `node tools/fetch-uniqlo.mjs && python _logs/gen_uniqlo.py` if UNIQLO changes them.

import type { GarmentKey } from "../fit/sizeChart";
import type { GarmentType, Neckline, Silhouette, Sleeve } from "../garment/spec";

export interface UniqloItem {
  id: string; name: string; en: string; group: "innerwear" | "tops" | "dresses";
  type: GarmentType; sleeve: Sleeve; neckline: Neckline; silhouette: Silhouette;
  fabricText: string; url: string;
  colors: { name: string; hex: string }[];
  sizes: { size: string; m: Partial<Record<GarmentKey, number>> }[];
}

export const UNIQLO_GROUPS = { innerwear: "內衣（罩杯式背心）", tops: "上衣", dresses: "洋裝" } as const;

export const UNIQLO: UniqloItem[] = """+json.dumps(items,ensure_ascii=False,indent=1)+";\n"
open('src/app/uniqlo.ts','w',encoding='utf8').write(src)
print(len(items))

// UNIQLO plain basics used as the standard fitting set (標準試穿). Finished-garment measurements and the
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

export const UNIQLO: UniqloItem[] = [
 {
  "id": "E473980-000",
  "name": "AIRism 罩杯式背心",
  "en": "AIRism Bra Top",
  "group": "innerwear",
  "type": "top",
  "sleeve": "none",
  "neckline": "scoop",
  "silhouette": "fitted",
  "fabricText": "AIRism 聚酯纖維 嫘縈 彈性纖維 針織",
  "colors": [
   {
    "name": "淺灰",
    "hex": "#c9c8c5"
   },
   {
    "name": "白",
    "hex": "#f4f2ee"
   },
   {
    "name": "黑",
    "hex": "#1f1f22"
   },
   {
    "name": "深咖啡",
    "hex": "#4a3326"
   },
   {
    "name": "藍",
    "hex": "#5a7fb3"
   }
  ],
  "sizes": [
   {
    "size": "XXS",
    "m": {
     "length": 50.5,
     "chest": 72
    },
    "body": {
     "bust": [
      75.0,
      81.0
     ],
     "waist": [
      57.0,
      63.0
     ],
     "hips": [
      83.0,
      89.0
     ]
    }
   },
   {
    "size": "XS",
    "m": {
     "length": 52,
     "chest": 75.0
    },
    "body": {
     "bust": [
      79.0,
      85.0
     ],
     "waist": [
      61.0,
      67.0
     ],
     "hips": [
      87.0,
      93.0
     ]
    }
   },
   {
    "size": "S",
    "m": {
     "length": 54,
     "chest": 78
    },
    "body": {
     "bust": [
      83.0,
      89.0
     ],
     "waist": [
      65.0,
      71.0
     ],
     "hips": [
      91.0,
      97.0
     ]
    }
   },
   {
    "size": "M",
    "m": {
     "length": 56,
     "chest": 83.0
    },
    "body": {
     "bust": [
      87.0,
      93.0
     ],
     "waist": [
      69.0,
      75.0
     ],
     "hips": [
      95.0,
      101.0
     ]
    }
   },
   {
    "size": "L",
    "m": {
     "length": 58,
     "chest": 88
    },
    "body": {
     "bust": [
      93.0,
      99.0
     ],
     "waist": [
      75.0,
      81.0
     ],
     "hips": [
      101.0,
      107.0
     ]
    }
   },
   {
    "size": "XL",
    "m": {
     "length": 60,
     "chest": 93.0
    },
    "body": {
     "bust": [
      99.0,
      105.0
     ],
     "waist": [
      81.0,
      87.0
     ],
     "hips": [
      107.0,
      113.0
     ]
    }
   },
   {
    "size": "XXL",
    "m": {
     "length": 60,
     "chest": 98
    },
    "body": {
     "bust": [
      105.0,
      111.0
     ],
     "waist": [
      87.0,
      93.0
     ],
     "hips": [
      113.0,
      119.0
     ]
    }
   }
  ],
  "sizing": "us",
  "url": "https://www.uniqlo.com/us/en/products/E473980-000/00"
 },
 {
  "id": "E473977-000",
  "name": "AIRism 罩杯式細肩帶背心",
  "en": "AIRism Bra Camisole",
  "group": "innerwear",
  "type": "top",
  "sleeve": "none",
  "neckline": "boat",
  "silhouette": "fitted",
  "fabricText": "AIRism 聚酯纖維 嫘縈 彈性纖維 針織",
  "colors": [
   {
    "name": "白",
    "hex": "#f4f2ee"
   },
   {
    "name": "黑",
    "hex": "#1f1f22"
   },
   {
    "name": "粉紅",
    "hex": "#e3a7b4"
   },
   {
    "name": "原色",
    "hex": "#e6dccb"
   },
   {
    "name": "咖啡",
    "hex": "#7a5238"
   }
  ],
  "sizes": [
   {
    "size": "XXS",
    "m": {
     "length": 53.5,
     "chest": 70
    },
    "body": {
     "bust": [
      75.0,
      81.0
     ],
     "waist": [
      57.0,
      63.0
     ],
     "hips": [
      83.0,
      89.0
     ]
    }
   },
   {
    "size": "XS",
    "m": {
     "length": 55,
     "chest": 73.0
    },
    "body": {
     "bust": [
      79.0,
      85.0
     ],
     "waist": [
      61.0,
      67.0
     ],
     "hips": [
      87.0,
      93.0
     ]
    }
   },
   {
    "size": "S",
    "m": {
     "length": 57,
     "chest": 76
    },
    "body": {
     "bust": [
      83.0,
      89.0
     ],
     "waist": [
      65.0,
      71.0
     ],
     "hips": [
      91.0,
      97.0
     ]
    }
   },
   {
    "size": "M",
    "m": {
     "length": 59,
     "chest": 81.0
    },
    "body": {
     "bust": [
      87.0,
      93.0
     ],
     "waist": [
      69.0,
      75.0
     ],
     "hips": [
      95.0,
      101.0
     ]
    }
   },
   {
    "size": "L",
    "m": {
     "length": 61,
     "chest": 86
    },
    "body": {
     "bust": [
      93.0,
      99.0
     ],
     "waist": [
      75.0,
      81.0
     ],
     "hips": [
      101.0,
      107.0
     ]
    }
   },
   {
    "size": "XL",
    "m": {
     "length": 63,
     "chest": 91.0
    },
    "body": {
     "bust": [
      99.0,
      105.0
     ],
     "waist": [
      81.0,
      87.0
     ],
     "hips": [
      107.0,
      113.0
     ]
    }
   },
   {
    "size": "XXL",
    "m": {
     "length": 63,
     "chest": 96
    },
    "body": {
     "bust": [
      105.0,
      111.0
     ],
     "waist": [
      87.0,
      93.0
     ],
     "hips": [
      113.0,
      119.0
     ]
    }
   }
  ],
  "sizing": "us",
  "url": "https://www.uniqlo.com/us/en/products/E473977-000/00"
 },
 {
  "id": "E482195-000",
  "name": "羅紋短版罩杯式背心",
  "en": "Ribbed Cropped Bra Top",
  "group": "innerwear",
  "type": "top",
  "sleeve": "none",
  "neckline": "scoop",
  "silhouette": "fitted",
  "fabricText": "棉96% 彈性纖維4% 羅紋針織",
  "colors": [
   {
    "name": "深咖啡",
    "hex": "#4a3326"
   },
   {
    "name": "白",
    "hex": "#f4f2ee"
   },
   {
    "name": "黑",
    "hex": "#1f1f22"
   },
   {
    "name": "酒紅",
    "hex": "#6e2635"
   },
   {
    "name": "米色",
    "hex": "#d8c3a3"
   },
   {
    "name": "綠",
    "hex": "#5f7556"
   }
  ],
  "sizes": [
   {
    "size": "XS",
    "m": {
     "length": 43,
     "shoulder": 24.5,
     "chest": 72
    },
    "body": {
     "bust": [
      79.0,
      85.0
     ],
     "waist": [
      61.0,
      67.0
     ],
     "hips": [
      87.0,
      93.0
     ]
    }
   },
   {
    "size": "S",
    "m": {
     "length": 43,
     "shoulder": 25,
     "chest": 75.0
    },
    "body": {
     "bust": [
      83.0,
      89.0
     ],
     "waist": [
      65.0,
      71.0
     ],
     "hips": [
      91.0,
      97.0
     ]
    }
   },
   {
    "size": "M",
    "m": {
     "length": 45,
     "shoulder": 26,
     "chest": 80
    },
    "body": {
     "bust": [
      87.0,
      93.0
     ],
     "waist": [
      69.0,
      75.0
     ],
     "hips": [
      95.0,
      101.0
     ]
    }
   },
   {
    "size": "L",
    "m": {
     "length": 47,
     "shoulder": 26.5,
     "chest": 85.0
    },
    "body": {
     "bust": [
      93.0,
      99.0
     ],
     "waist": [
      75.0,
      81.0
     ],
     "hips": [
      101.0,
      107.0
     ]
    }
   },
   {
    "size": "XL",
    "m": {
     "length": 49,
     "shoulder": 27.5,
     "chest": 90
    },
    "body": {
     "bust": [
      99.0,
      105.0
     ],
     "waist": [
      81.0,
      87.0
     ],
     "hips": [
      107.0,
      113.0
     ]
    }
   },
   {
    "size": "XXL",
    "m": {
     "length": 49,
     "shoulder": 28.5,
     "chest": 95.0
    },
    "body": {
     "bust": [
      105.0,
      111.0
     ],
     "waist": [
      87.0,
      93.0
     ],
     "hips": [
      113.0,
      119.0
     ]
    }
   }
  ],
  "sizing": "us",
  "url": "https://www.uniqlo.com/us/en/products/E482195-000/00"
 },
 {
  "id": "E465755-000",
  "name": "AIRism 棉質圓領 T 恤",
  "en": "エアリズムコットンT",
  "group": "tops",
  "type": "top",
  "sleeve": "short",
  "neckline": "crew",
  "silhouette": "oversized",
  "fabricText": "棉70% 聚酯纖維30% 針織",
  "colors": [
   {
    "name": "米色",
    "hex": "#d8c3a3"
   },
   {
    "name": "白",
    "hex": "#f4f2ee"
   },
   {
    "name": "淺灰",
    "hex": "#c9c8c5"
   },
   {
    "name": "黑",
    "hex": "#1f1f22"
   },
   {
    "name": "粉紅",
    "hex": "#e3a7b4"
   },
   {
    "name": "深咖啡",
    "hex": "#4a3326"
   },
   {
    "name": "海軍藍",
    "hex": "#232f4b"
   }
  ],
  "sizes": [
   {
    "size": "XS",
    "m": {
     "length": 54.5,
     "shoulder": 43.5,
     "chest": 92,
     "sleeveLength": 19.2
    },
    "body": {
     "bust": [
      73.0,
      79.0
     ]
    }
   },
   {
    "size": "S",
    "m": {
     "length": 56,
     "shoulder": 44.5,
     "chest": 97.0,
     "sleeveLength": 19.8
    },
    "body": {
     "bust": [
      77.0,
      83.0
     ]
    }
   },
   {
    "size": "M",
    "m": {
     "length": 58,
     "shoulder": 45.5,
     "chest": 102,
     "sleeveLength": 20.2
    },
    "body": {
     "bust": [
      81.0,
      87.0
     ]
    }
   },
   {
    "size": "L",
    "m": {
     "length": 60,
     "shoulder": 47,
     "chest": 108,
     "sleeveLength": 21.0
    },
    "body": {
     "bust": [
      85.0,
      91.0
     ]
    }
   },
   {
    "size": "XL",
    "m": {
     "length": 62,
     "shoulder": 48.5,
     "chest": 114,
     "sleeveLength": 21.8
    },
    "body": {
     "bust": [
      91.0,
      97.0
     ]
    }
   },
   {
    "size": "XXL",
    "m": {
     "length": 62,
     "shoulder": 49.5,
     "chest": 120,
     "sleeveLength": 22.2
    },
    "body": {
     "bust": [
      97.0,
      103.0
     ]
    }
   },
   {
    "size": "3XL",
    "m": {
     "length": 64.5,
     "shoulder": 50.5,
     "chest": 126,
     "sleeveLength": 23.2
    },
    "body": {
     "bust": [
      103.0,
      109.0
     ]
    }
   }
  ],
  "sizing": "asia",
  "url": "https://www.uniqlo.com/jp/ja/products/E465755-000/00"
 },
 {
  "id": "E424873-000",
  "name": "圓領 T 恤",
  "en": "クルーネックT",
  "group": "tops",
  "type": "top",
  "sleeve": "short",
  "neckline": "crew",
  "silhouette": "straight",
  "fabricText": "棉100% 針織",
  "colors": [
   {
    "name": "粉紅",
    "hex": "#e3a7b4"
   },
   {
    "name": "白",
    "hex": "#f4f2ee"
   },
   {
    "name": "黑",
    "hex": "#1f1f22"
   },
   {
    "name": "咖啡",
    "hex": "#7a5238"
   },
   {
    "name": "奶油",
    "hex": "#efe4c8"
   },
   {
    "name": "海軍藍",
    "hex": "#232f4b"
   },
   {
    "name": "淺紫",
    "hex": "#b9a6c9"
   }
  ],
  "sizes": [
   {
    "size": "XS",
    "m": {
     "length": 58,
     "shoulder": 34,
     "chest": 76,
     "sleeveLength": 15.5
    },
    "body": {
     "bust": [
      73.0,
      79.0
     ]
    }
   },
   {
    "size": "S",
    "m": {
     "length": 59.5,
     "shoulder": 35,
     "chest": 81.0,
     "sleeveLength": 16.0
    },
    "body": {
     "bust": [
      77.0,
      83.0
     ]
    }
   },
   {
    "size": "M",
    "m": {
     "length": 61.5,
     "shoulder": 36,
     "chest": 86,
     "sleeveLength": 16.5
    },
    "body": {
     "bust": [
      81.0,
      87.0
     ]
    }
   },
   {
    "size": "L",
    "m": {
     "length": 63.5,
     "shoulder": 37.5,
     "chest": 92,
     "sleeveLength": 16.8
    },
    "body": {
     "bust": [
      85.0,
      91.0
     ]
    }
   },
   {
    "size": "XL",
    "m": {
     "length": 66,
     "shoulder": 39,
     "chest": 98,
     "sleeveLength": 17.5
    },
    "body": {
     "bust": [
      91.0,
      97.0
     ]
    }
   },
   {
    "size": "XXL",
    "m": {
     "length": 68,
     "shoulder": 40,
     "chest": 104,
     "sleeveLength": 18.5
    },
    "body": {
     "bust": [
      97.0,
      103.0
     ]
    }
   },
   {
    "size": "3XL",
    "m": {
     "length": 69.5,
     "shoulder": 41,
     "chest": 110,
     "sleeveLength": 19.0
    },
    "body": {
     "bust": [
      103.0,
      109.0
     ]
    }
   }
  ],
  "sizing": "asia",
  "url": "https://www.uniqlo.com/jp/ja/products/E424873-000/00"
 },
 {
  "id": "E465760-000",
  "name": "Mini T 恤（短版合身）",
  "en": "ミニT",
  "group": "tops",
  "type": "top",
  "sleeve": "short",
  "neckline": "crew",
  "silhouette": "fitted",
  "fabricText": "棉96% 彈性纖維4% 針織",
  "colors": [
   {
    "name": "黑",
    "hex": "#1f1f22"
   },
   {
    "name": "白",
    "hex": "#f4f2ee"
   },
   {
    "name": "灰",
    "hex": "#9d9c99"
   },
   {
    "name": "酒紅",
    "hex": "#6e2635"
   },
   {
    "name": "咖啡",
    "hex": "#7a5238"
   },
   {
    "name": "黃",
    "hex": "#e7c75a"
   },
   {
    "name": "藍",
    "hex": "#5a7fb3"
   },
   {
    "name": "海軍藍",
    "hex": "#232f4b"
   }
  ],
  "sizes": [
   {
    "size": "XS",
    "m": {
     "length": 44.5,
     "shoulder": 34,
     "chest": 70,
     "sleeveLength": 11.5
    },
    "body": {
     "bust": [
      73.0,
      79.0
     ]
    }
   },
   {
    "size": "S",
    "m": {
     "length": 46,
     "shoulder": 35,
     "chest": 75.0,
     "sleeveLength": 12.0
    },
    "body": {
     "bust": [
      77.0,
      83.0
     ]
    }
   },
   {
    "size": "M",
    "m": {
     "length": 48,
     "shoulder": 36,
     "chest": 80,
     "sleeveLength": 12.0
    },
    "body": {
     "bust": [
      81.0,
      87.0
     ]
    }
   },
   {
    "size": "L",
    "m": {
     "length": 50,
     "shoulder": 37.5,
     "chest": 86,
     "sleeveLength": 12.8
    },
    "body": {
     "bust": [
      85.0,
      91.0
     ]
    }
   },
   {
    "size": "XL",
    "m": {
     "length": 52.5,
     "shoulder": 39,
     "chest": 92,
     "sleeveLength": 13.5
    },
    "body": {
     "bust": [
      91.0,
      97.0
     ]
    }
   },
   {
    "size": "XXL",
    "m": {
     "length": 52.5,
     "shoulder": 40,
     "chest": 98,
     "sleeveLength": 14.5
    },
    "body": {
     "bust": [
      97.0,
      103.0
     ]
    }
   },
   {
    "size": "3XL",
    "m": {
     "length": 54.5,
     "shoulder": 41,
     "chest": 104,
     "sleeveLength": 15.0
    },
    "body": {
     "bust": [
      103.0,
      109.0
     ]
    }
   }
  ],
  "sizing": "asia",
  "url": "https://www.uniqlo.com/jp/ja/products/E465760-000/00"
 },
 {
  "id": "E487579-000",
  "name": "Mini T 恤 長袖",
  "en": "ミニT",
  "group": "tops",
  "type": "top",
  "sleeve": "long",
  "neckline": "crew",
  "silhouette": "fitted",
  "fabricText": "棉96% 彈性纖維4% 針織",
  "colors": [
   {
    "name": "米色",
    "hex": "#d8c3a3"
   },
   {
    "name": "白",
    "hex": "#f4f2ee"
   },
   {
    "name": "黑",
    "hex": "#1f1f22"
   },
   {
    "name": "粉紅",
    "hex": "#e3a7b4"
   },
   {
    "name": "紅",
    "hex": "#b8323a"
   },
   {
    "name": "綠",
    "hex": "#5f7556"
   },
   {
    "name": "藍",
    "hex": "#5a7fb3"
   }
  ],
  "sizes": [
   {
    "size": "XS",
    "m": {
     "length": 46.5,
     "shoulder": 34,
     "chest": 73.0,
     "sleeveLength": 55.5
    },
    "body": {
     "bust": [
      73.0,
      79.0
     ]
    }
   },
   {
    "size": "S",
    "m": {
     "length": 48,
     "shoulder": 35,
     "chest": 78,
     "sleeveLength": 56.5
    },
    "body": {
     "bust": [
      77.0,
      83.0
     ]
    }
   },
   {
    "size": "M",
    "m": {
     "length": 50,
     "shoulder": 36,
     "chest": 83.0,
     "sleeveLength": 57.0
    },
    "body": {
     "bust": [
      81.0,
      87.0
     ]
    }
   },
   {
    "size": "L",
    "m": {
     "length": 52,
     "shoulder": 37,
     "chest": 88,
     "sleeveLength": 58.5
    },
    "body": {
     "bust": [
      85.0,
      91.0
     ]
    }
   },
   {
    "size": "XL",
    "m": {
     "length": 54.5,
     "shoulder": 38.5,
     "chest": 94,
     "sleeveLength": 58.2
    },
    "body": {
     "bust": [
      91.0,
      97.0
     ]
    }
   },
   {
    "size": "XXL",
    "m": {
     "length": 54.5,
     "shoulder": 39.5,
     "chest": 100,
     "sleeveLength": 58.2
    },
    "body": {
     "bust": [
      97.0,
      103.0
     ]
    }
   },
   {
    "size": "3XL",
    "m": {
     "length": 56.5,
     "shoulder": 40.5,
     "chest": 106,
     "sleeveLength": 58.2
    },
    "body": {
     "bust": [
      103.0,
      109.0
     ]
    }
   }
  ],
  "sizing": "asia",
  "url": "https://www.uniqlo.com/jp/ja/products/E487579-000/00"
 },
 {
  "id": "E465751-000",
  "name": "柔軟羅紋圓領 T 恤 長袖",
  "en": "ソフトリブクルーネックT",
  "group": "tops",
  "type": "top",
  "sleeve": "long",
  "neckline": "crew",
  "silhouette": "fitted",
  "fabricText": "棉57% 嫘縈39% 彈性纖維4% 羅紋針織",
  "colors": [
   {
    "name": "黑",
    "hex": "#1f1f22"
   },
   {
    "name": "白",
    "hex": "#f4f2ee"
   },
   {
    "name": "淺灰",
    "hex": "#c9c8c5"
   },
   {
    "name": "橘",
    "hex": "#d9793e"
   },
   {
    "name": "咖啡",
    "hex": "#7a5238"
   },
   {
    "name": "奶油",
    "hex": "#efe4c8"
   },
   {
    "name": "藍",
    "hex": "#5a7fb3"
   }
  ],
  "sizes": [
   {
    "size": "XS",
    "m": {
     "length": 56,
     "shoulder": 32.5,
     "chest": 68,
     "sleeveLength": 57.8
    },
    "body": {
     "bust": [
      73.0,
      79.0
     ]
    }
   },
   {
    "size": "S",
    "m": {
     "length": 57.5,
     "shoulder": 33.5,
     "chest": 73.0,
     "sleeveLength": 58.8
    },
    "body": {
     "bust": [
      77.0,
      83.0
     ]
    }
   },
   {
    "size": "M",
    "m": {
     "length": 59.5,
     "shoulder": 34.5,
     "chest": 78,
     "sleeveLength": 59.2
    },
    "body": {
     "bust": [
      81.0,
      87.0
     ]
    }
   },
   {
    "size": "L",
    "m": {
     "length": 61.5,
     "shoulder": 36,
     "chest": 84,
     "sleeveLength": 60.5
    },
    "body": {
     "bust": [
      85.0,
      91.0
     ]
    }
   },
   {
    "size": "XL",
    "m": {
     "length": 64,
     "shoulder": 37.5,
     "chest": 90,
     "sleeveLength": 60.8
    },
    "body": {
     "bust": [
      91.0,
      97.0
     ]
    }
   },
   {
    "size": "XXL",
    "m": {
     "length": 64,
     "shoulder": 38.5,
     "chest": 96,
     "sleeveLength": 60.8
    },
    "body": {
     "bust": [
      97.0,
      103.0
     ]
    }
   },
   {
    "size": "3XL",
    "m": {
     "length": 66,
     "shoulder": 39.5,
     "chest": 102,
     "sleeveLength": 60.8
    },
    "body": {
     "bust": [
      103.0,
      109.0
     ]
    }
   }
  ],
  "sizing": "asia",
  "url": "https://www.uniqlo.com/jp/ja/products/E465751-000/00"
 },
 {
  "id": "E482982-000",
  "name": "Ultra Stretch AIRism 洋裝",
  "en": "ウルトラストレッチエアリズムワンピース/ノースリーブ",
  "group": "dresses",
  "type": "dress",
  "sleeve": "none",
  "neckline": "crew",
  "silhouette": "aline",
  "fabricText": "聚酯纖維100% 彈性 針織",
  "colors": [
   {
    "name": "黑",
    "hex": "#1f1f22"
   },
   {
    "name": "米白",
    "hex": "#efe9dc"
   },
   {
    "name": "深咖啡",
    "hex": "#4a3326"
   },
   {
    "name": "黃",
    "hex": "#e7c75a"
   },
   {
    "name": "藍",
    "hex": "#5a7fb3"
   }
  ],
  "sizes": [
   {
    "size": "XS",
    "m": {
     "length": 113,
     "shoulder": 31.5,
     "chest": 78,
     "hip": 120
    },
    "body": {
     "bust": [
      73.0,
      79.0
     ],
     "waist": [
      57.0,
      63.0
     ],
     "hips": [
      80.0,
      86.0
     ]
    }
   },
   {
    "size": "S",
    "m": {
     "length": 115,
     "shoulder": 32.5,
     "chest": 83.0,
     "hip": 124.5
    },
    "body": {
     "bust": [
      77.0,
      83.0
     ],
     "waist": [
      61.0,
      67.0
     ],
     "hips": [
      84.0,
      90.0
     ]
    }
   },
   {
    "size": "M",
    "m": {
     "length": 116.5,
     "shoulder": 33.5,
     "chest": 88,
     "hip": 129
    },
    "body": {
     "bust": [
      81.0,
      87.0
     ],
     "waist": [
      65.0,
      71.0
     ],
     "hips": [
      88.0,
      94.0
     ]
    }
   },
   {
    "size": "L",
    "m": {
     "length": 118.5,
     "shoulder": 34.5,
     "chest": 93.0,
     "hip": 133.5
    },
    "body": {
     "bust": [
      85.0,
      91.0
     ],
     "waist": [
      69.0,
      75.0
     ],
     "hips": [
      92.0,
      98.0
     ]
    }
   },
   {
    "size": "XL",
    "m": {
     "length": 120.5,
     "shoulder": 35.5,
     "chest": 99.0,
     "hip": 139
    },
    "body": {
     "bust": [
      91.0,
      97.0
     ],
     "waist": [
      75.0,
      81.0
     ],
     "hips": [
      98.0,
      104.0
     ]
    }
   },
   {
    "size": "XXL",
    "m": {
     "length": 122.5,
     "shoulder": 36.5,
     "chest": 105.0,
     "hip": 144.5
    },
    "body": {
     "bust": [
      97.0,
      103.0
     ],
     "waist": [
      81.0,
      87.0
     ],
     "hips": [
      104.0,
      110.0
     ]
    }
   },
   {
    "size": "3XL",
    "m": {
     "length": 124,
     "shoulder": 37.5,
     "chest": 111.0,
     "hip": 150.5
    },
    "body": {
     "bust": [
      103.0,
      109.0
     ],
     "waist": [
      87.0,
      93.0
     ],
     "hips": [
      110.0,
      116.0
     ]
    }
   }
  ],
  "sizing": "asia",
  "url": "https://www.uniqlo.com/jp/ja/products/E482982-000/00"
 },
 {
  "id": "E488722-000",
  "name": "可機洗羅紋針織洋裝",
  "en": "ウォッシャブルリブニットワンピース/ノースリーブ",
  "group": "dresses",
  "type": "dress",
  "sleeve": "none",
  "neckline": "crew",
  "silhouette": "fitted",
  "fabricText": "嫘縈72% 聚酯纖維28% 羅紋針織",
  "colors": [
   {
    "name": "黑",
    "hex": "#1f1f22"
   },
   {
    "name": "深灰",
    "hex": "#55565a"
   },
   {
    "name": "咖啡",
    "hex": "#7a5238"
   },
   {
    "name": "深咖啡",
    "hex": "#4a3326"
   }
  ],
  "sizes": [
   {
    "size": "S",
    "m": {
     "length": 110.5,
     "shoulder": 29.5,
     "chest": 70
    },
    "body": {
     "bust": [
      77.0,
      83.0
     ],
     "waist": [
      61.0,
      67.0
     ],
     "hips": [
      84.0,
      90.0
     ]
    }
   },
   {
    "size": "M",
    "m": {
     "length": 112,
     "shoulder": 30.5,
     "chest": 75.0
    },
    "body": {
     "bust": [
      81.0,
      87.0
     ],
     "waist": [
      65.0,
      71.0
     ],
     "hips": [
      88.0,
      94.0
     ]
    }
   },
   {
    "size": "L",
    "m": {
     "length": 114,
     "shoulder": 32,
     "chest": 81.0
    },
    "body": {
     "bust": [
      85.0,
      91.0
     ],
     "waist": [
      69.0,
      75.0
     ],
     "hips": [
      92.0,
      98.0
     ]
    }
   },
   {
    "size": "XL",
    "m": {
     "length": 116,
     "shoulder": 33.5,
     "chest": 87.0
    },
    "body": {
     "bust": [
      91.0,
      97.0
     ],
     "waist": [
      75.0,
      81.0
     ],
     "hips": [
      98.0,
      104.0
     ]
    }
   },
   {
    "size": "XXL",
    "m": {
     "length": 118,
     "shoulder": 34.5,
     "chest": 93.0
    },
    "body": {
     "bust": [
      97.0,
      103.0
     ],
     "waist": [
      81.0,
      87.0
     ],
     "hips": [
      104.0,
      110.0
     ]
    }
   },
   {
    "size": "3XL",
    "m": {
     "length": 119.5,
     "shoulder": 35.5,
     "chest": 99.0
    },
    "body": {
     "bust": [
      103.0,
      109.0
     ],
     "waist": [
      87.0,
      93.0
     ],
     "hips": [
      110.0,
      116.0
     ]
    }
   }
  ],
  "sizing": "asia",
  "url": "https://www.uniqlo.com/jp/ja/products/E488722-000/00"
 },
 {
  "id": "E488186-000",
  "name": "雙面針織無袖洋裝",
  "en": "ダブルフェイスニットワンピース",
  "group": "dresses",
  "type": "dress",
  "sleeve": "none",
  "neckline": "crew",
  "silhouette": "straight",
  "fabricText": "棉23% 壓克力21% 聚酯纖維16% 羊毛16% 尼龍13% 嫘縈11% 針織",
  "colors": [
   {
    "name": "深咖啡",
    "hex": "#4a3326"
   },
   {
    "name": "黑",
    "hex": "#1f1f22"
   }
  ],
  "sizes": [
   {
    "size": "S",
    "m": {
     "length": 109.5,
     "shoulder": 33,
     "chest": 81.0,
     "hip": 79
    },
    "body": {
     "bust": [
      77.0,
      83.0
     ],
     "waist": [
      61.0,
      67.0
     ],
     "hips": [
      84.0,
      90.0
     ]
    }
   },
   {
    "size": "M",
    "m": {
     "length": 111,
     "shoulder": 35,
     "chest": 86,
     "hip": 84
    },
    "body": {
     "bust": [
      81.0,
      87.0
     ],
     "waist": [
      65.0,
      71.0
     ],
     "hips": [
      88.0,
      94.0
     ]
    }
   },
   {
    "size": "L",
    "m": {
     "length": 113,
     "shoulder": 38,
     "chest": 92,
     "hip": 90
    },
    "body": {
     "bust": [
      85.0,
      91.0
     ],
     "waist": [
      69.0,
      75.0
     ],
     "hips": [
      92.0,
      98.0
     ]
    }
   },
   {
    "size": "XL",
    "m": {
     "length": 115,
     "shoulder": 41,
     "chest": 98,
     "hip": 96
    },
    "body": {
     "bust": [
      91.0,
      97.0
     ],
     "waist": [
      75.0,
      81.0
     ],
     "hips": [
      98.0,
      104.0
     ]
    }
   },
   {
    "size": "XXL",
    "m": {
     "length": 117,
     "shoulder": 44,
     "chest": 104,
     "hip": 102
    },
    "body": {
     "bust": [
      97.0,
      103.0
     ],
     "waist": [
      81.0,
      87.0
     ],
     "hips": [
      104.0,
      110.0
     ]
    }
   }
  ],
  "sizing": "asia",
  "url": "https://www.uniqlo.com/jp/ja/products/E488186-000/00"
 },
 {
  "id": "E482285-000",
  "name": "麻混打褶長裙",
  "en": "Linen Blend Tuck Long Skirt",
  "group": "skirts",
  "type": "skirt",
  "sleeve": "none",
  "neckline": "crew",
  "silhouette": "aline",
  "fabricText": "棉66% 麻34% 梭織",
  "colors": [
   {
    "name": "米白",
    "hex": "#efe9dc"
   },
   {
    "name": "黑",
    "hex": "#1f1f22"
   },
   {
    "name": "黃",
    "hex": "#e7c75a"
   },
   {
    "name": "海軍藍",
    "hex": "#232f4b"
   }
  ],
  "sizes": [
   {
    "size": "XXS",
    "m": {
     "length": 78,
     "waist": 60,
     "hip": 141.5,
     "hem": 166
    },
    "body": {
     "waist": [
      57.0,
      63.0
     ],
     "hips": [
      83.0,
      89.0
     ]
    }
   },
   {
    "size": "XS",
    "m": {
     "length": 80,
     "waist": 64,
     "hip": 145.5,
     "hem": 170
    },
    "body": {
     "waist": [
      61.0,
      67.0
     ],
     "hips": [
      87.0,
      93.0
     ]
    }
   },
   {
    "size": "S",
    "m": {
     "length": 80,
     "waist": 68,
     "hip": 149.5,
     "hem": 174
    },
    "body": {
     "waist": [
      65.0,
      71.0
     ],
     "hips": [
      91.0,
      97.0
     ]
    }
   },
   {
    "size": "M",
    "m": {
     "length": 80,
     "waist": 72,
     "hip": 153.5,
     "hem": 178
    },
    "body": {
     "waist": [
      69.0,
      75.0
     ],
     "hips": [
      95.0,
      101.0
     ]
    }
   },
   {
    "size": "L",
    "m": {
     "length": 82,
     "waist": 78,
     "hip": 159.5,
     "hem": 184
    },
    "body": {
     "waist": [
      75.0,
      81.0
     ],
     "hips": [
      101.0,
      107.0
     ]
    }
   },
   {
    "size": "XL",
    "m": {
     "length": 82,
     "waist": 84,
     "hip": 165.5,
     "hem": 190
    },
    "body": {
     "waist": [
      81.0,
      87.0
     ],
     "hips": [
      107.0,
      113.0
     ]
    }
   },
   {
    "size": "XXL",
    "m": {
     "length": 84,
     "waist": 90,
     "hip": 171.5,
     "hem": 196
    },
    "body": {
     "waist": [
      87.0,
      93.0
     ],
     "hips": [
      113.0,
      119.0
     ]
    }
   }
  ],
  "sizing": "us",
  "url": "https://www.uniqlo.com/us/en/products/E482285-000/00"
 },
 {
  "id": "E482286-000",
  "name": "層次感長裙",
  "en": "ティアードマキシスカート",
  "group": "skirts",
  "type": "skirt",
  "sleeve": "none",
  "neckline": "crew",
  "silhouette": "aline",
  "fabricText": "棉100% 梭織",
  "colors": [
   {
    "name": "淺藍",
    "hex": "#9fc3e0"
   },
   {
    "name": "白",
    "hex": "#f4f2ee"
   },
   {
    "name": "黑",
    "hex": "#1f1f22"
   }
  ],
  "sizes": [
   {
    "size": "XS",
    "m": {
     "length": 87,
     "waist": 58,
     "hip": 128
    },
    "body": {
     "waist": [
      57.0,
      63.0
     ],
     "hips": [
      80.0,
      86.0
     ]
    }
   },
   {
    "size": "S",
    "m": {
     "length": 89,
     "waist": 62,
     "hip": 134
    },
    "body": {
     "waist": [
      61.0,
      67.0
     ],
     "hips": [
      84.0,
      90.0
     ]
    }
   },
   {
    "size": "M",
    "m": {
     "length": 89,
     "waist": 66,
     "hip": 139.5
    },
    "body": {
     "waist": [
      65.0,
      71.0
     ],
     "hips": [
      88.0,
      94.0
     ]
    }
   },
   {
    "size": "L",
    "m": {
     "length": 91,
     "waist": 70,
     "hip": 145.5
    },
    "body": {
     "waist": [
      69.0,
      75.0
     ],
     "hips": [
      92.0,
      98.0
     ]
    }
   },
   {
    "size": "XL",
    "m": {
     "length": 91,
     "waist": 76,
     "hip": 154
    },
    "body": {
     "waist": [
      75.0,
      81.0
     ],
     "hips": [
      98.0,
      104.0
     ]
    }
   },
   {
    "size": "XXL",
    "m": {
     "length": 91,
     "waist": 82,
     "hip": 163
    },
    "body": {
     "waist": [
      81.0,
      87.0
     ],
     "hips": [
      104.0,
      110.0
     ]
    }
   }
  ],
  "sizing": "asia",
  "url": "https://www.uniqlo.com/jp/ja/products/E482286-000/00"
 },
 {
  "id": "E487996-000",
  "name": "雪紡百褶中長裙",
  "en": "シフォンプリーツミディスカート",
  "group": "skirts",
  "type": "skirt",
  "sleeve": "none",
  "neckline": "crew",
  "silhouette": "aline",
  "fabricText": "聚酯纖維100% 雪紡 梭織",
  "colors": [
   {
    "name": "深咖啡",
    "hex": "#4a3326"
   },
   {
    "name": "黑",
    "hex": "#1f1f22"
   }
  ],
  "sizes": [
   {
    "size": "XS",
    "m": {
     "length": 70,
     "waist": 61,
     "hip": 90.5
    },
    "body": {
     "waist": [
      57.0,
      63.0
     ],
     "hips": [
      80.0,
      86.0
     ]
    }
   },
   {
    "size": "S",
    "m": {
     "length": 72,
     "waist": 65,
     "hip": 95
    },
    "body": {
     "waist": [
      61.0,
      67.0
     ],
     "hips": [
      84.0,
      90.0
     ]
    }
   },
   {
    "size": "M",
    "m": {
     "length": 72,
     "waist": 69,
     "hip": 99.5
    },
    "body": {
     "waist": [
      65.0,
      71.0
     ],
     "hips": [
      88.0,
      94.0
     ]
    }
   },
   {
    "size": "L",
    "m": {
     "length": 74,
     "waist": 73,
     "hip": 104
    },
    "body": {
     "waist": [
      69.0,
      75.0
     ],
     "hips": [
      92.0,
      98.0
     ]
    }
   },
   {
    "size": "XL",
    "m": {
     "length": 74,
     "waist": 79,
     "hip": 111
    },
    "body": {
     "waist": [
      75.0,
      81.0
     ],
     "hips": [
      98.0,
      104.0
     ]
    }
   },
   {
    "size": "XXL",
    "m": {
     "length": 74,
     "waist": 85,
     "hip": 117
    },
    "body": {
     "waist": [
      81.0,
      87.0
     ],
     "hips": [
      104.0,
      110.0
     ]
    }
   }
  ],
  "sizing": "asia",
  "url": "https://www.uniqlo.com/jp/ja/products/E487996-000/00"
 },
 {
  "id": "E487997-000",
  "name": "刷毛針織喇叭長裙",
  "en": "ブラッシュドジャージーフレアスカート",
  "group": "skirts",
  "type": "skirt",
  "sleeve": "none",
  "neckline": "crew",
  "silhouette": "aline",
  "fabricText": "聚酯纖維48% 棉40% 嫘縈12% 針織",
  "colors": [
   {
    "name": "灰",
    "hex": "#9d9c99"
   },
   {
    "name": "深灰",
    "hex": "#55565a"
   },
   {
    "name": "深紫",
    "hex": "#4a3553"
   }
  ],
  "sizes": [
   {
    "size": "XS",
    "m": {
     "length": 76,
     "waist": 59,
     "hip": 92
    },
    "body": {
     "waist": [
      57.0,
      63.0
     ],
     "hips": [
      80.0,
      86.0
     ]
    }
   },
   {
    "size": "S",
    "m": {
     "length": 78,
     "waist": 63,
     "hip": 96.5
    },
    "body": {
     "waist": [
      61.0,
      67.0
     ],
     "hips": [
      84.0,
      90.0
     ]
    }
   },
   {
    "size": "M",
    "m": {
     "length": 78,
     "waist": 67,
     "hip": 102
    },
    "body": {
     "waist": [
      65.0,
      71.0
     ],
     "hips": [
      88.0,
      94.0
     ]
    }
   },
   {
    "size": "L",
    "m": {
     "length": 80,
     "waist": 71,
     "hip": 107.5
    },
    "body": {
     "waist": [
      69.0,
      75.0
     ],
     "hips": [
      92.0,
      98.0
     ]
    }
   },
   {
    "size": "XL",
    "m": {
     "length": 80,
     "waist": 77,
     "hip": 114.5
    },
    "body": {
     "waist": [
      75.0,
      81.0
     ],
     "hips": [
      98.0,
      104.0
     ]
    }
   },
   {
    "size": "XXL",
    "m": {
     "length": 80,
     "waist": 83,
     "hip": 121
    },
    "body": {
     "waist": [
      81.0,
      87.0
     ],
     "hips": [
      104.0,
      110.0
     ]
    }
   }
  ],
  "sizing": "asia",
  "url": "https://www.uniqlo.com/jp/ja/products/E487997-000/00"
 },
 {
  "id": "E487016-000",
  "name": "運動無鋼圈內衣",
  "en": "ワイヤレスブラ/アクティブ",
  "group": "sports",
  "type": "top",
  "sleeve": "none",
  "neckline": "scoop",
  "silhouette": "fitted",
  "fabricText": "尼龍90% 彈性纖維10% 針織",
  "colors": [
   {
    "name": "藍",
    "hex": "#5a7fb3"
   },
   {
    "name": "白",
    "hex": "#f4f2ee"
   },
   {
    "name": "黑",
    "hex": "#1f1f22"
   },
   {
    "name": "酒紅",
    "hex": "#6e2635"
   }
  ],
  "sizes": [
   {
    "size": "XS",
    "m": {
     "chest": 70.0,
     "length": 28.0
    },
    "body": {
     "bust": [
      73.0,
      79.0
     ]
    }
   },
   {
    "size": "S",
    "m": {
     "chest": 74.0,
     "length": 28.8
    },
    "body": {
     "bust": [
      77.0,
      83.0
     ]
    }
   },
   {
    "size": "M",
    "m": {
     "chest": 78.0,
     "length": 29.6
    },
    "body": {
     "bust": [
      81.0,
      87.0
     ]
    }
   },
   {
    "size": "L",
    "m": {
     "chest": 82.0,
     "length": 30.4
    },
    "body": {
     "bust": [
      85.0,
      91.0
     ]
    }
   },
   {
    "size": "XL",
    "m": {
     "chest": 88.0,
     "length": 31.2
    },
    "body": {
     "bust": [
      91.0,
      97.0
     ]
    }
   },
   {
    "size": "XXL",
    "m": {
     "chest": 94.0,
     "length": 32.0
    },
    "body": {
     "bust": [
      97.0,
      103.0
     ]
    }
   }
  ],
  "sizing": "asia",
  "url": "https://www.uniqlo.com/jp/ja/products/E487016-000/00"
 },
 {
  "id": "E483458-000",
  "name": "Ultra Stretch 運動 T 恤",
  "en": "ウルトラストレッチアクティブT",
  "group": "sports",
  "type": "top",
  "sleeve": "short",
  "neckline": "crew",
  "silhouette": "fitted",
  "fabricText": "聚酯纖維86% 彈性纖維14% 針織",
  "colors": [
   {
    "name": "黑",
    "hex": "#1f1f22"
   },
   {
    "name": "白",
    "hex": "#f4f2ee"
   },
   {
    "name": "深灰",
    "hex": "#55565a"
   },
   {
    "name": "粉紅",
    "hex": "#e3a7b4"
   },
   {
    "name": "綠",
    "hex": "#5f7556"
   },
   {
    "name": "藍",
    "hex": "#5a7fb3"
   }
  ],
  "sizes": [
   {
    "size": "XS",
    "m": {
     "length": 46,
     "shoulder": 33,
     "chest": 75.0,
     "sleeveLength": 12.0
    },
    "body": {
     "bust": [
      73.0,
      79.0
     ]
    }
   },
   {
    "size": "S",
    "m": {
     "length": 48,
     "shoulder": 34,
     "chest": 80,
     "sleeveLength": 12.5
    },
    "body": {
     "bust": [
      77.0,
      83.0
     ]
    }
   },
   {
    "size": "M",
    "m": {
     "length": 50,
     "shoulder": 35,
     "chest": 85.0,
     "sleeveLength": 13.0
    },
    "body": {
     "bust": [
      81.0,
      87.0
     ]
    }
   },
   {
    "size": "L",
    "m": {
     "length": 52,
     "shoulder": 36,
     "chest": 90,
     "sleeveLength": 13.5
    },
    "body": {
     "bust": [
      85.0,
      91.0
     ]
    }
   },
   {
    "size": "XL",
    "m": {
     "length": 54,
     "shoulder": 37.5,
     "chest": 96,
     "sleeveLength": 14.2
    },
    "body": {
     "bust": [
      91.0,
      97.0
     ]
    }
   },
   {
    "size": "XXL",
    "m": {
     "length": 54,
     "shoulder": 38.5,
     "chest": 102,
     "sleeveLength": 15.2
    },
    "body": {
     "bust": [
      97.0,
      103.0
     ]
    }
   },
   {
    "size": "3XL",
    "m": {
     "length": 56,
     "shoulder": 39.5,
     "chest": 108,
     "sleeveLength": 16.2
    },
    "body": {
     "bust": [
      103.0,
      109.0
     ]
    }
   }
  ],
  "sizing": "asia",
  "url": "https://www.uniqlo.com/jp/ja/products/E483458-000/00"
 },
 {
  "id": "E483546-000",
  "name": "Ultra Stretch 運動緊身褲",
  "en": "ウルトラストレッチアクティブレギンス",
  "group": "sports",
  "type": "pants",
  "sleeve": "none",
  "neckline": "crew",
  "silhouette": "fitted",
  "fabricText": "尼龍77% 彈性纖維23% 針織",
  "colors": [
   {
    "name": "深咖啡",
    "hex": "#4a3326"
   },
   {
    "name": "深灰",
    "hex": "#55565a"
   },
   {
    "name": "黑",
    "hex": "#1f1f22"
   },
   {
    "name": "酒紅",
    "hex": "#6e2635"
   },
   {
    "name": "綠",
    "hex": "#5f7556"
   },
   {
    "name": "藍",
    "hex": "#5a7fb3"
   }
  ],
  "sizes": [
   {
    "size": "XS",
    "m": {
     "waist": 48,
     "hip": 67,
     "legOpening": 16,
     "thigh": 44,
     "inseam": 59
    },
    "body": {
     "waist": [
      57.0,
      63.0
     ],
     "hips": [
      80.0,
      86.0
     ]
    }
   },
   {
    "size": "S",
    "m": {
     "waist": 52,
     "hip": 71,
     "legOpening": 18,
     "thigh": 47.0,
     "inseam": 60.5
    },
    "body": {
     "waist": [
      61.0,
      67.0
     ],
     "hips": [
      84.0,
      90.0
     ]
    }
   },
   {
    "size": "M",
    "m": {
     "waist": 56,
     "hip": 75,
     "legOpening": 19.0,
     "thigh": 49.0,
     "inseam": 61
    },
    "body": {
     "waist": [
      65.0,
      71.0
     ],
     "hips": [
      88.0,
      94.0
     ]
    }
   },
   {
    "size": "L",
    "m": {
     "waist": 60,
     "hip": 79,
     "legOpening": 20,
     "thigh": 52,
     "inseam": 61
    },
    "body": {
     "waist": [
      69.0,
      75.0
     ],
     "hips": [
      92.0,
      98.0
     ]
    }
   },
   {
    "size": "XL",
    "m": {
     "waist": 66,
     "hip": 85,
     "legOpening": 21.0,
     "thigh": 55.0,
     "inseam": 61
    },
    "body": {
     "waist": [
      75.0,
      81.0
     ],
     "hips": [
      98.0,
      104.0
     ]
    }
   },
   {
    "size": "XXL",
    "m": {
     "waist": 72,
     "hip": 90.5,
     "legOpening": 22,
     "thigh": 59.0,
     "inseam": 61.5
    },
    "body": {
     "waist": [
      81.0,
      87.0
     ],
     "hips": [
      104.0,
      110.0
     ]
    }
   },
   {
    "size": "3XL",
    "m": {
     "waist": 78,
     "hip": 97,
     "legOpening": 23.0,
     "thigh": 63.0,
     "inseam": 62
    },
    "body": {
     "waist": [
      87.0,
      93.0
     ],
     "hips": [
      110.0,
      116.0
     ]
    }
   }
  ],
  "sizing": "asia",
  "url": "https://www.uniqlo.com/jp/ja/products/E483546-000/00"
 },
 {
  "id": "E483296-000",
  "name": "Ultra Stretch 喇叭運動緊身褲",
  "en": "ウルトラストレッチアクティブフレアレギンス",
  "group": "sports",
  "type": "pants",
  "sleeve": "none",
  "neckline": "crew",
  "silhouette": "aline",
  "fabricText": "尼龍77% 彈性纖維23% 針織",
  "colors": [
   {
    "name": "深灰",
    "hex": "#55565a"
   },
   {
    "name": "黑",
    "hex": "#1f1f22"
   },
   {
    "name": "深咖啡",
    "hex": "#4a3326"
   }
  ],
  "sizes": [
   {
    "size": "XS",
    "m": {
     "waist": 48,
     "hip": 68.5,
     "legOpening": 41.0,
     "thigh": 46,
     "inseam": 73
    },
    "body": {
     "waist": [
      57.0,
      63.0
     ],
     "hips": [
      80.0,
      86.0
     ]
    }
   },
   {
    "size": "S",
    "m": {
     "waist": 52,
     "hip": 72.5,
     "legOpening": 43.0,
     "thigh": 49.0,
     "inseam": 74.5
    },
    "body": {
     "waist": [
      61.0,
      67.0
     ],
     "hips": [
      84.0,
      90.0
     ]
    }
   },
   {
    "size": "M",
    "m": {
     "waist": 56,
     "hip": 76.5,
     "legOpening": 44,
     "thigh": 51.0,
     "inseam": 75
    },
    "body": {
     "waist": [
      65.0,
      71.0
     ],
     "hips": [
      88.0,
      94.0
     ]
    }
   },
   {
    "size": "L",
    "m": {
     "waist": 60,
     "hip": 81,
     "legOpening": 45.0,
     "thigh": 54,
     "inseam": 75
    },
    "body": {
     "waist": [
      69.0,
      75.0
     ],
     "hips": [
      92.0,
      98.0
     ]
    }
   },
   {
    "size": "XL",
    "m": {
     "waist": 66,
     "hip": 86.5,
     "legOpening": 47.0,
     "thigh": 57.0,
     "inseam": 75
    },
    "body": {
     "waist": [
      75.0,
      81.0
     ],
     "hips": [
      98.0,
      104.0
     ]
    }
   },
   {
    "size": "XXL",
    "m": {
     "waist": 72,
     "hip": 92.5,
     "legOpening": 50,
     "thigh": 61.0,
     "inseam": 75.5
    },
    "body": {
     "waist": [
      81.0,
      87.0
     ],
     "hips": [
      104.0,
      110.0
     ]
    }
   },
   {
    "size": "3XL",
    "m": {
     "waist": 78,
     "hip": 98.5,
     "legOpening": 52,
     "thigh": 65.0,
     "inseam": 76
    },
    "body": {
     "waist": [
      87.0,
      93.0
     ],
     "hips": [
      110.0,
      116.0
     ]
    }
   }
  ],
  "sizing": "asia",
  "url": "https://www.uniqlo.com/jp/ja/products/E483296-000/00"
 },
 {
  "id": "E483294-000",
  "name": "Ultra Stretch 運動短褲",
  "en": "ウルトラストレッチアクティブショーツ",
  "group": "sports",
  "type": "pants",
  "sleeve": "none",
  "neckline": "crew",
  "silhouette": "straight",
  "fabricText": "聚酯纖維72% 彈性纖維28% 梭織",
  "colors": [
   {
    "name": "深灰",
    "hex": "#55565a"
   },
   {
    "name": "白",
    "hex": "#f4f2ee"
   },
   {
    "name": "黑",
    "hex": "#1f1f22"
   },
   {
    "name": "藍",
    "hex": "#5a7fb3"
   }
  ],
  "sizes": [
   {
    "size": "XS",
    "m": {
     "waist": 51,
     "hip": 91.5,
     "legOpening": 59.0,
     "thigh": 62,
     "inseam": 9
    },
    "body": {
     "waist": [
      57.0,
      63.0
     ],
     "hips": [
      80.0,
      86.0
     ]
    }
   },
   {
    "size": "S",
    "m": {
     "waist": 55,
     "hip": 95.5,
     "legOpening": 62,
     "thigh": 64,
     "inseam": 9
    },
    "body": {
     "waist": [
      61.0,
      67.0
     ],
     "hips": [
      84.0,
      90.0
     ]
    }
   },
   {
    "size": "M",
    "m": {
     "waist": 59,
     "hip": 99.5,
     "legOpening": 64,
     "thigh": 67.0,
     "inseam": 9
    },
    "body": {
     "waist": [
      65.0,
      71.0
     ],
     "hips": [
      88.0,
      94.0
     ]
    }
   },
   {
    "size": "L",
    "m": {
     "waist": 63,
     "hip": 104,
     "legOpening": 67.0,
     "thigh": 70,
     "inseam": 9
    },
    "body": {
     "waist": [
      69.0,
      75.0
     ],
     "hips": [
      92.0,
      98.0
     ]
    }
   },
   {
    "size": "XL",
    "m": {
     "waist": 69,
     "hip": 109.5,
     "legOpening": 70,
     "thigh": 73.0,
     "inseam": 9
    },
    "body": {
     "waist": [
      75.0,
      81.0
     ],
     "hips": [
      98.0,
      104.0
     ]
    }
   },
   {
    "size": "XXL",
    "m": {
     "waist": 75,
     "hip": 115.5,
     "legOpening": 74,
     "thigh": 77.0,
     "inseam": 9
    },
    "body": {
     "waist": [
      81.0,
      87.0
     ],
     "hips": [
      104.0,
      110.0
     ]
    }
   },
   {
    "size": "3XL",
    "m": {
     "waist": 81,
     "hip": 121,
     "legOpening": 78,
     "thigh": 81.0,
     "inseam": 9
    },
    "body": {
     "waist": [
      87.0,
      93.0
     ],
     "hips": [
      110.0,
      116.0
     ]
    }
   }
  ],
  "sizing": "asia",
  "url": "https://www.uniqlo.com/jp/ja/products/E483294-000/00"
 },
 {
  "id": "E483295-000",
  "name": "Ultra Stretch 單車短褲",
  "en": "ウルトラストレッチアクティブバイカーショーツ",
  "group": "sports",
  "type": "pants",
  "sleeve": "none",
  "neckline": "crew",
  "silhouette": "fitted",
  "fabricText": "尼龍77% 彈性纖維23% 針織",
  "colors": [
   {
    "name": "黑",
    "hex": "#1f1f22"
   },
   {
    "name": "深灰",
    "hex": "#55565a"
   },
   {
    "name": "綠",
    "hex": "#5f7556"
   }
  ],
  "sizes": [
   {
    "size": "XS",
    "m": {
     "waist": 48,
     "hip": 68,
     "legOpening": 36,
     "thigh": 45,
     "inseam": 12.5
    },
    "body": {
     "waist": [
      57.0,
      63.0
     ],
     "hips": [
      80.0,
      86.0
     ]
    }
   },
   {
    "size": "S",
    "m": {
     "waist": 52,
     "hip": 72,
     "legOpening": 39.0,
     "thigh": 47.5,
     "inseam": 12.5
    },
    "body": {
     "waist": [
      61.0,
      67.0
     ],
     "hips": [
      84.0,
      90.0
     ]
    }
   },
   {
    "size": "M",
    "m": {
     "waist": 56,
     "hip": 76.5,
     "legOpening": 41.0,
     "thigh": 50,
     "inseam": 12.5
    },
    "body": {
     "waist": [
      65.0,
      71.0
     ],
     "hips": [
      88.0,
      94.0
     ]
    }
   },
   {
    "size": "L",
    "m": {
     "waist": 60,
     "hip": 81,
     "legOpening": 44,
     "thigh": 52.5,
     "inseam": 12.5
    },
    "body": {
     "waist": [
      69.0,
      75.0
     ],
     "hips": [
      92.0,
      98.0
     ]
    }
   },
   {
    "size": "XL",
    "m": {
     "waist": 66,
     "hip": 87,
     "legOpening": 47.0,
     "thigh": 56,
     "inseam": 12.5
    },
    "body": {
     "waist": [
      75.0,
      81.0
     ],
     "hips": [
      98.0,
      104.0
     ]
    }
   },
   {
    "size": "XXL",
    "m": {
     "waist": 72,
     "hip": 93,
     "legOpening": 51.0,
     "thigh": 60,
     "inseam": 12.5
    },
    "body": {
     "waist": [
      81.0,
      87.0
     ],
     "hips": [
      104.0,
      110.0
     ]
    }
   },
   {
    "size": "3XL",
    "m": {
     "waist": 78,
     "hip": 99,
     "legOpening": 55.0,
     "thigh": 64,
     "inseam": 12.5
    },
    "body": {
     "waist": [
      87.0,
      93.0
     ],
     "hips": [
      110.0,
      116.0
     ]
    }
   }
  ],
  "sizing": "asia",
  "url": "https://www.uniqlo.com/jp/ja/products/E483295-000/00"
 },
 {
  "id": "E483282-000",
  "name": "寬版運動褲",
  "en": "Wide Sweatpants",
  "group": "sports",
  "type": "pants",
  "sleeve": "none",
  "neckline": "crew",
  "silhouette": "oversized",
  "fabricText": "棉86% 聚酯纖維14% 針織",
  "colors": [
   {
    "name": "灰",
    "hex": "#9d9c99"
   },
   {
    "name": "黑",
    "hex": "#1f1f22"
   }
  ],
  "sizes": [
   {
    "size": "XXS",
    "m": {
     "waist": 59,
     "hip": 107.5,
     "legOpening": 58,
     "thigh": 70
    },
    "body": {
     "bust": [
      75.0,
      81.0
     ],
     "waist": [
      57.0,
      63.0
     ],
     "hips": [
      83.0,
      89.0
     ]
    }
   },
   {
    "size": "XS",
    "m": {
     "waist": 63,
     "hip": 111,
     "legOpening": 60,
     "thigh": 73.0
    },
    "body": {
     "bust": [
      79.0,
      85.0
     ],
     "waist": [
      61.0,
      67.0
     ],
     "hips": [
      87.0,
      93.0
     ]
    }
   },
   {
    "size": "S",
    "m": {
     "waist": 67,
     "hip": 115,
     "legOpening": 62,
     "thigh": 76
    },
    "body": {
     "bust": [
      83.0,
      89.0
     ],
     "waist": [
      65.0,
      71.0
     ],
     "hips": [
      91.0,
      97.0
     ]
    }
   },
   {
    "size": "M",
    "m": {
     "waist": 71,
     "hip": 119,
     "legOpening": 64,
     "thigh": 78
    },
    "body": {
     "bust": [
      87.0,
      93.0
     ],
     "waist": [
      69.0,
      75.0
     ],
     "hips": [
      95.0,
      101.0
     ]
    }
   },
   {
    "size": "L",
    "m": {
     "waist": 77,
     "hip": 125,
     "legOpening": 66,
     "thigh": 82
    },
    "body": {
     "bust": [
      93.0,
      99.0
     ],
     "waist": [
      75.0,
      81.0
     ],
     "hips": [
      101.0,
      107.0
     ]
    }
   },
   {
    "size": "XL",
    "m": {
     "waist": 83,
     "hip": 130.5,
     "legOpening": 69.0,
     "thigh": 86
    },
    "body": {
     "bust": [
      99.0,
      105.0
     ],
     "waist": [
      81.0,
      87.0
     ],
     "hips": [
      107.0,
      113.0
     ]
    }
   },
   {
    "size": "XXL",
    "m": {
     "waist": 91,
     "hip": 138,
     "legOpening": 72,
     "thigh": 90
    },
    "body": {
     "bust": [
      105.0,
      111.0
     ],
     "waist": [
      87.0,
      93.0
     ],
     "hips": [
      113.0,
      119.0
     ]
    }
   }
  ],
  "sizing": "us",
  "url": "https://www.uniqlo.com/us/en/products/E483282-000/00"
 }
];

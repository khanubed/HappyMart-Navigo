import type { Subcategory } from "@workspace/typescript-config/types"

export const subcategories: Subcategory[] = [
  // Rice & Grains
  { id: "sub-basmati", categoryId: "cat-rice-grains", slug: "basmati-rice", nameEn: "Basmati Rice", nameZh: "印度香米" },
  { id: "sub-sella", categoryId: "cat-rice-grains", slug: "sella-rice", nameEn: "Sella Rice", nameZh: "蒸谷米" },
  { id: "sub-brown-rice", categoryId: "cat-rice-grains", slug: "brown-rice", nameEn: "Brown Rice", nameZh: "糙米" },
  { id: "sub-long-grain", categoryId: "cat-rice-grains", slug: "long-grain-rice", nameEn: "Long Grain Rice", nameZh: "長粒米" },
  { id: "sub-poha", categoryId: "cat-rice-grains", slug: "poha", nameEn: "Poha & Flattened Rice", nameZh: "扁米" },
  { id: "sub-vermicelli", categoryId: "cat-rice-grains", slug: "vermicelli", nameEn: "Vermicelli & Seviyan", nameZh: "細麵線" },

  // Flour & Atta
  { id: "sub-wheat-atta", categoryId: "cat-flour-atta", slug: "wheat-atta", nameEn: "Wheat Atta (Chakki)", nameZh: "全麥麵粉" },
  { id: "sub-maida", categoryId: "cat-flour-atta", slug: "maida", nameEn: "Maida (All Purpose)", nameZh: "通用中筋麵粉" },
  { id: "sub-besan", categoryId: "cat-flour-atta", slug: "besan", nameEn: "Besan (Gram Flour)", nameZh: "鷹嘴豆粉" },
  { id: "sub-rice-flour", categoryId: "cat-flour-atta", slug: "rice-flour", nameEn: "Rice Flour", nameZh: "粘米粉" },
  { id: "sub-millet-flour", categoryId: "cat-flour-atta", slug: "millet-flour", nameEn: "Millet & Ragi Flour", nameZh: "小米與指黍粉" },

  // Lentils & Pulses
  { id: "sub-toor-dal", categoryId: "cat-lentils", slug: "toor-dal", nameEn: "Toor Dal (Arhar)", nameZh: "黃木豆" },
  { id: "sub-chana-dal", categoryId: "cat-lentils", slug: "chana-dal", nameEn: "Chana Dal & Chickpeas", nameZh: "鷹嘴豆及剖豆" },
  { id: "sub-moong-dal", categoryId: "cat-lentils", slug: "moong-dal", nameEn: "Moong Dal (Yellow/Green)", nameZh: "綠豆及剖豆" },
  { id: "sub-masoor-dal", categoryId: "cat-lentils", slug: "masoor-dal", nameEn: "Masoor Dal (Red)", nameZh: "紅扁豆" },
  { id: "sub-urad-dal", categoryId: "cat-lentils", slug: "urad-dal", nameEn: "Urad Dal (Black/White)", nameZh: "黑豆及白扁豆" },
  { id: "sub-mixed-pulses", categoryId: "cat-lentils", slug: "mixed-pulses", nameEn: "Mixed Pulses & Beans", nameZh: "混合豆類" },

  // Spices & Masala
  { id: "sub-whole-spices", categoryId: "cat-spices", slug: "whole-spices", nameEn: "Whole Spices", nameZh: "原粒原味香料" },
  { id: "sub-ground-spices", categoryId: "cat-spices", slug: "ground-spices", nameEn: "Ground Spices", nameZh: "純天然香料粉" },
  { id: "sub-masala-mixes", categoryId: "cat-spices", slug: "masala-mixes", nameEn: "Biryani & Masala Mixes", nameZh: "香料飯及特調混香料" },
  { id: "sub-curry-powders", categoryId: "cat-spices", slug: "curry-powders", nameEn: "Curry Powders", nameZh: "經典咖哩粉" },
  { id: "sub-herbs", categoryId: "cat-spices", slug: "herbs", nameEn: "Kasuri Methi & Herbs", nameZh: "香草及葫蘆巴葉" },

  // Cooking Essentials
  { id: "sub-oils", categoryId: "cat-cooking", slug: "oils", nameEn: "Mustard, Sesame & Cooking Oils", nameZh: "芥末油與食用油" },
  { id: "sub-ghee", categoryId: "cat-cooking", slug: "ghee", nameEn: "Pure Desi Ghee", nameZh: "純印度酥油" },
  { id: "sub-salt-sugar", categoryId: "cat-cooking", slug: "salt-sugar", nameEn: "Rock Salt, Sugar & Jaggery", nameZh: "喜馬拉雅鹽與紅糖" },

  // Snacks & Sweets
  { id: "sub-namkeen", categoryId: "cat-snacks", slug: "namkeen", nameEn: "Namkeen & Savouries", nameZh: "印度鹹脆小吃" },
  { id: "sub-biscuits", categoryId: "cat-snacks", slug: "biscuits", nameEn: "Rusks & Biscuits", nameZh: "酥餅與餅乾" },
  { id: "sub-mithai", categoryId: "cat-snacks", slug: "mithai", nameEn: "Canned Sweets & Mithai", nameZh: "傳統印巴罐裝甜點" },

  // Beverages
  { id: "sub-tea", categoryId: "cat-beverages", slug: "tea", nameEn: "Assam, Chai & Masala Tea", nameZh: "阿薩姆及印度香料茶" },
  { id: "sub-coffee", categoryId: "cat-beverages", slug: "coffee", nameEn: "South Indian Filter Coffee", nameZh: "南印度滴濾咖啡" },
  { id: "sub-syrups", categoryId: "cat-beverages", slug: "syrups", nameEn: "Rooh Afza & Juices", nameZh: "玫瑰露及果汁" },

  // Frozen Foods
  { id: "sub-frozen-bread", categoryId: "cat-frozen", slug: "frozen-bread", nameEn: "Roti, Naan & Parathas", nameZh: "冷凍烤餅與薄餅" },
  { id: "sub-frozen-samosa", categoryId: "cat-frozen", slug: "frozen-snacks", nameEn: "Samosas & Kebabs", nameZh: "冷凍咖哩角與烤肉串" },
  { id: "sub-frozen-paneer", categoryId: "cat-frozen", slug: "frozen-paneer", nameEn: "Paneer & Dairy", nameZh: "冷凍印度奶酪" },

  // Ready To Eat
  { id: "sub-instant-meals", categoryId: "cat-ready-to-eat", slug: "instant-meals", nameEn: "Heat & Eat Curry Packets", nameZh: "即食咖哩加熱餐包" },
  { id: "sub-noodles", categoryId: "cat-ready-to-eat", slug: "noodles", nameEn: "Maggi & Noodles", nameZh: "經典泡麵與麵食" },

  // Dry Fruits & Nuts
  { id: "sub-almonds-cashews", categoryId: "cat-dry-fruits", slug: "almonds-cashews", nameEn: "Almonds, Cashews & Nuts", nameZh: "杏仁、腰果及堅果" },
  { id: "sub-raisins-dates", categoryId: "cat-dry-fruits", slug: "raisins-dates", nameEn: "Premium Dates & Raisins", nameZh: "頂級椰棗與葡萄乾" },

  // Personal Care & Household
  { id: "sub-hair-skin", categoryId: "cat-personal-care", slug: "hair-skin", nameEn: "Ayurvedic Hair Oils & Soaps", nameZh: "草本美髮油與香皂" },
  { id: "sub-cleaning", categoryId: "cat-household", slug: "cleaning", nameEn: "Incense (Agarbatti) & Cleaning", nameZh: "印度線香與清潔用品" },
]

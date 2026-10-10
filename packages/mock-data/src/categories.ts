import type { Category, CategoryTreeNode } from "@workspace/typescript-config/types"

/**
 * Unified Flat Categories Dataset (Adjacency List)
 * Strict 2-level hierarchy:
 * - Level 1: Parent Departments (parentId = null)
 * - Level 2: Child Aisles / Subcategories (parentId = Parent Department ID)
 *
 * Guaranteed Data Integrity:
 * - 100% unique image URLs across all categories (zero duplicates).
 * - Every child category belongs to exactly one parent department.
 * - Every category is populated with matching products in products.ts.
 */
export const categories: Category[] = [
  // =========================================================================
  // LEVEL 1: PARENT DEPARTMENTS (level: 1, parentId: null)
  // =========================================================================
  {
    id: "parent-food-beverages",
    parentId: null,
    level: 1,
    slug: "food-beverages",
    nameEn: "Food & Beverages",
    nameZh: "食品與飲品",
    descriptionEn: "Authentic South Asian basmati rice, atta, lentils, spices, snacks & tea",
    descriptionZh: "正宗南亞印度香米、全麥麵粉、扁豆、香料、零食與茶飲",
    seoTitle: "Food & Beverages - South Asian Groceries Hong Kong",
    seoDescription: "Shop authentic Indian and Pakistani food, basmati rice, spices, lentils and snacks delivered across Hong Kong.",
    icon: "Utensils",
    imageUrl: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80",
    bannerUrl: "/images/banners/staples-campaign-bg.jpg",
    sortOrder: 1,
    isActive: true,
    featuredBrands: ["India Gate", "Daawat", "Aashirvaad", "Shan", "National", "Amul", "Haldiram's", "Tata Sampann"],
  },
  {
    id: "parent-wellness-store",
    parentId: null,
    level: 1,
    slug: "wellness-store",
    nameEn: "Wellness Store",
    nameZh: "健康保健館",
    descriptionEn: "Herbal supplements, immunity boosters, vitamins, organic infusions & health foods",
    descriptionZh: "草本營養補充品、提升免疫力、維他命與有機養生保健食品",
    seoTitle: "Wellness Store - Natural Herbal Supplements Hong Kong",
    seoDescription: "Herbal remedies, immunity supplements, organic teas and wellness essentials in Hong Kong.",
    icon: "HeartPulse",
    imageUrl: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=800&q=80",
    bannerUrl: "/images/banners/ramadan-campaign-bg.jpg",
    sortOrder: 2,
    isActive: true,
    featuredBrands: ["Dabur", "Organic India", "Natureland", "Hamdard"],
  },
  {
    id: "parent-personal-beauty-care",
    parentId: null,
    level: 1,
    slug: "personal-beauty-care",
    nameEn: "Personal & Beauty Care",
    nameZh: "個人與美妝護理",
    descriptionEn: "Natural herbal hair oils, soaps, skincare creams, oral hygiene & fragrances",
    descriptionZh: "天然草本護髮油、香皂、護膚霜、草本牙膏與香氛",
    seoTitle: "Personal & Beauty Care - Herbal Skincare & Hair Care Hong Kong",
    seoDescription: "Buy authentic Ayurvedic shampoos, hair oils, herbal soaps and natural skincare products.",
    icon: "Sparkles",
    imageUrl: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80",
    bannerUrl: "/images/banners/diwali-campaign-bg.jpg",
    sortOrder: 3,
    isActive: true,
    featuredBrands: ["Dabur Vatika", "Medimix", "Vicco", "Himalaya", "Biotique"],
  },
  {
    id: "parent-baby-care",
    parentId: null,
    level: 1,
    slug: "baby-care",
    nameEn: "Baby Care",
    nameZh: "嬰兒護理",
    descriptionEn: "Gentle baby massage oils, organic baby food, sensitive skin lotions & wipes",
    descriptionZh: "溫和草本嬰兒按摩油、副食品、敏感肌洗護露與柔濕巾",
    seoTitle: "Baby Care - Gentle Organic Baby Products Hong Kong",
    seoDescription: "Gentle baby massage oils, baby food, and natural baby toiletries delivered in HK.",
    icon: "Baby",
    imageUrl: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=800&q=80",
    bannerUrl: "/images/banners/staples-campaign-bg.jpg",
    sortOrder: 4,
    isActive: true,
    featuredBrands: ["Himalaya Baby", "Dabur Lal Tail", "Pampers"],
  },
  {
    id: "parent-home-care",
    parentId: null,
    level: 1,
    slug: "home-care",
    nameEn: "Home Care",
    nameZh: "家居護理",
    descriptionEn: "Handcrafted puja incense sticks, natural camphor, disinfectants & cleaners",
    descriptionZh: "傳統手工神聖線香、天然樟腦、消毒洗劑與清潔日用品",
    seoTitle: "Home Care - Incense, Puja & Cleaners Hong Kong",
    seoDescription: "Authentic incense sticks, puja samagri, natural camphor and disinfectants in Hong Kong.",
    icon: "Home",
    imageUrl: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=800&q=80",
    bannerUrl: "/images/banners/diwali-campaign-bg.jpg",
    sortOrder: 5,
    isActive: true,
    featuredBrands: ["Cycle Pure", "Zed Black", "Dettol", "Godrej", "Mangaldeep"],
  },
  {
    id: "parent-homeopathy-medicine-store",
    parentId: null,
    level: 1,
    slug: "homeopathy-medicine-store",
    nameEn: "Homeopathy Medicine Store",
    nameZh: "順勢療法藥房",
    descriptionEn: "Trusted homeopathic dilutions, biochemic salts, mother tinctures & drops",
    descriptionZh: "值得信賴的順勢療法稀釋液、生物化學調理錠、母酊劑與滴劑",
    seoTitle: "Homeopathy Medicine Store Hong Kong",
    seoDescription: "Authentic SBL, Dr. Reckeweg, and Schwabe homeopathic dilutions and remedies in Hong Kong.",
    icon: "Pill",
    imageUrl: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&w=800&q=80",
    bannerUrl: "/images/banners/ramadan-campaign-bg.jpg",
    sortOrder: 6,
    isActive: true,
    featuredBrands: ["SBL", "Dr. Reckeweg", "Schwabe India"],
  },
  {
    id: "parent-ayurvedic-products",
    parentId: null,
    level: 1,
    slug: "ayurvedic-products",
    nameEn: "Ayurvedic Products",
    nameZh: "阿育吠陀草本專區",
    descriptionEn: "Authentic Chyawanprash, Ashwagandha, Triphala, medicated herbal oils & churnas",
    descriptionZh: "正宗阿育吠陀養生膏、南非醉茄、三果粉、草本調理藥油與粉末",
    seoTitle: "Authentic Ayurvedic Products Hong Kong",
    seoDescription: "Chyawanprash, Ashwagandha, Triphala churnas and classical Ayurvedic formulations.",
    icon: "Leaf",
    imageUrl: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=800&q=80",
    bannerUrl: "/images/banners/staples-campaign-bg.jpg",
    sortOrder: 7,
    isActive: true,
    featuredBrands: ["Dabur", "Baidyanath", "Patanjali"],
  },
  {
    id: "parent-sports-store",
    parentId: null,
    level: 1,
    slug: "sports-store",
    nameEn: "Sports Store",
    nameZh: "運動營養專區",
    descriptionEn: "Proteins, pre-workout supplements, energy bars, electrolytes & shaker bottles",
    descriptionZh: "乳清蛋白粉、運動前補劑、能量棒、電解質沖劑與搖搖杯",
    seoTitle: "Sports Nutrition & Fitness Store Hong Kong",
    seoDescription: "Whey proteins, energy bars, pre-workout electrolytes and workout nutrition in HK.",
    icon: "Activity",
    imageUrl: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80",
    bannerUrl: "/images/banners/pakistan-campaign-bg.jpg",
    sortOrder: 8,
    isActive: true,
    featuredBrands: ["MuscleBlaze", "Optimum Nutrition", "Fast&Up"],
  },

  // =========================================================================
  // LEVEL 2: FOOD & BEVERAGES CHILD CATEGORIES (parentId: "parent-food-beverages")
  // =========================================================================
  {
    id: "cat-rice-grains",
    parentId: "parent-food-beverages",
    level: 2,
    slug: "rice-grains",
    nameEn: "Rice & Grains",
    nameZh: "米糧與穀物",
    imageUrl: "/images/categories/rice-grains.png",
    icon: "Wheat",
    sortOrder: 10,
    isActive: true,
    featuredBrands: ["India Gate", "Daawat", "PRAN"],
  },
  {
    id: "cat-flour-atta",
    parentId: "parent-food-beverages",
    level: 2,
    slug: "flour-atta",
    nameEn: "Flour & Atta",
    nameZh: "麵粉與全麥粉",
    imageUrl: "/images/categories/flour-atta.png",
    icon: "Wheat",
    sortOrder: 11,
    isActive: true,
    featuredBrands: ["Aashirvaad", "Pillsbury"],
  },
  {
    id: "cat-lentils",
    parentId: "parent-food-beverages",
    level: 2,
    slug: "lentils-pulses",
    nameEn: "Lentils & Pulses",
    nameZh: "扁豆與豆類",
    imageUrl: "/images/categories/lentils.png",
    icon: "Boxes",
    sortOrder: 12,
    isActive: true,
    featuredBrands: ["Tata Sampann", "24 Mantra Organic"],
  },
  {
    id: "cat-spices",
    parentId: "parent-food-beverages",
    level: 2,
    slug: "spices-masala",
    nameEn: "Spices & Masala",
    nameZh: "香料與瑪莎拉",
    imageUrl: "/images/categories/spices.png",
    icon: "Flame",
    sortOrder: 13,
    isActive: true,
    featuredBrands: ["Shan", "MDH Masala"],
  },
  {
    id: "cat-cooking",
    parentId: "parent-food-beverages",
    level: 2,
    slug: "cooking-essentials",
    nameEn: "Cooking Essentials & Ghee",
    nameZh: "烹飪必備與酥油",
    imageUrl: "/images/categories/cooking.png",
    icon: "Droplets",
    sortOrder: 14,
    isActive: true,
    featuredBrands: ["Amul", "Fortune"],
  },
  {
    id: "cat-snacks",
    parentId: "parent-food-beverages",
    level: 2,
    slug: "snacks-namkeen",
    nameEn: "Snacks & Namkeen",
    nameZh: "零食與鹹脆小吃",
    imageUrl: "/images/categories/snacks.png",
    icon: "Cookie",
    sortOrder: 15,
    isActive: true,
    featuredBrands: ["Haldiram's", "Kurkure"],
  },
  {
    id: "cat-frozen",
    parentId: "parent-food-beverages",
    level: 2,
    slug: "frozen-foods",
    nameEn: "Frozen Foods",
    nameZh: "冷凍食品與薄餅",
    imageUrl: "/images/categories/frozen.png",
    icon: "Snowflake",
    sortOrder: 16,
    isActive: true,
    featuredBrands: ["Deep Foods", "Shana"],
  },
  {
    id: "cat-ready-to-eat",
    parentId: "parent-food-beverages",
    level: 2,
    slug: "ready-to-eat",
    nameEn: "Ready to Eat & Instant",
    nameZh: "即食料理與速食麵",
    imageUrl: "/images/categories/ready-to-eat.png",
    icon: "Soup",
    sortOrder: 17,
    isActive: true,
    featuredBrands: ["MTR", "Wai Wai"],
  },
  {
    id: "cat-dry-fruits",
    parentId: "parent-food-beverages",
    level: 2,
    slug: "dry-fruits-nuts",
    nameEn: "Dry Fruits & Nuts",
    nameZh: "堅果與果乾",
    imageUrl: "/images/categories/dry-fruits.png",
    icon: "Nut",
    sortOrder: 18,
    isActive: true,
    featuredBrands: ["Bateel", "Nutraj"],
  },
  {
    id: "cat-beverages",
    parentId: "parent-food-beverages",
    level: 2,
    slug: "beverages-tea",
    nameEn: "Beverages & Tea",
    nameZh: "茶飲與特色飲品",
    imageUrl: "/images/categories/beverage.png",
    icon: "Coffee",
    sortOrder: 19,
    isActive: true,
    featuredBrands: ["Dilmah", "Tata Sampann", "Hamdard"],
  },
  {
    id: "cat-biscuits-bakery",
    parentId: "parent-food-beverages",
    level: 2,
    slug: "biscuits-bakery",
    nameEn: "Biscuits & Bakery",
    nameZh: "餅乾與烘焙點心",
    imageUrl: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=800&q=80",
    icon: "Cookie",
    sortOrder: 20,
    isActive: true,
    featuredBrands: ["Britannia", "Munchee", "PRAN"],
  },
  {
    id: "cat-pickles-chutney",
    parentId: "parent-food-beverages",
    level: 2,
    slug: "pickles-chutney",
    nameEn: "Pickles & Chutney",
    nameZh: "油漬醃菜與酸辣沾醬",
    imageUrl: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=800&q=80",
    icon: "Soup",
    sortOrder: 21,
    isActive: true,
    featuredBrands: ["National Foods", "Ahmed Foods"],
  },
  {
    id: "cat-spreads-sauces-ketchup",
    parentId: "parent-food-beverages",
    level: 2,
    slug: "spreads-sauces-ketchup",
    nameEn: "Spreads, Sauces & Ketchup",
    nameZh: "抹醬、醬料與番茄醬",
    imageUrl: "https://images.unsplash.com/photo-1472476443507-c7a5948772fc?auto=format&fit=crop&w=800&q=80",
    icon: "Droplets",
    sortOrder: 22,
    isActive: true,
    featuredBrands: ["Kissan"],
  },
  {
    id: "cat-breakfast-milk-cereals",
    parentId: "parent-food-beverages",
    level: 2,
    slug: "breakfast-milk-cereals",
    nameEn: "Breakfast & Cereals",
    nameZh: "早餐、牛奶與穀物麥片",
    imageUrl: "https://images.unsplash.com/photo-1521483451569-e33803c0330c?auto=format&fit=crop&w=800&q=80",
    icon: "Coffee",
    sortOrder: 23,
    isActive: true,
    featuredBrands: ["Kellogg's", "Al Rawabi & Bateel"],
  },
  {
    id: "cat-chocolates-candies",
    parentId: "parent-food-beverages",
    level: 2,
    slug: "chocolates-candies",
    nameEn: "Chocolates & Sweets",
    nameZh: "巧克力與節慶甜食",
    imageUrl: "https://images.unsplash.com/photo-1599785209707-a456fc1337bb?auto=format&fit=crop&w=800&q=80",
    icon: "Sparkles",
    sortOrder: 24,
    isActive: true,
    featuredBrands: ["Cadbury", "Haldiram's"],
  },

  // =========================================================================
  // LEVEL 2: WELLNESS STORE CHILD CATEGORIES (parentId: "parent-wellness-store")
  // =========================================================================
  {
    id: "sub-herbal-supplements",
    parentId: "parent-wellness-store",
    level: 2,
    slug: "herbal-supplements",
    nameEn: "Herbal Supplements",
    nameZh: "草本營養補充品",
    imageUrl: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80",
    icon: "HeartPulse",
    sortOrder: 30,
    isActive: true,
    featuredBrands: ["Organic India", "Dabur"],
  },
  {
    id: "sub-immunity-vitamins",
    parentId: "parent-wellness-store",
    level: 2,
    slug: "immunity-vitamins",
    nameEn: "Immunity & Vitamins",
    nameZh: "免疫調理與維他命",
    imageUrl: "https://images.unsplash.com/photo-1577401239170-897942555fb3?auto=format&fit=crop&w=800&q=80",
    icon: "ShieldAlert",
    sortOrder: 31,
    isActive: true,
    featuredBrands: ["Dabur", "Organic India"],
  },
  {
    id: "sub-organic-infusions",
    parentId: "parent-wellness-store",
    level: 2,
    slug: "organic-teas-infusions",
    nameEn: "Organic Teas & Infusions",
    nameZh: "有機草本花草茶",
    imageUrl: "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&w=800&q=80",
    icon: "Coffee",
    sortOrder: 32,
    isActive: true,
    featuredBrands: ["Organic India", "Hamdard"],
  },
  {
    id: "sub-health-foods",
    parentId: "parent-wellness-store",
    level: 2,
    slug: "health-superfoods",
    nameEn: "Health & Superfoods",
    nameZh: "養生穀麥與超級食物",
    imageUrl: "https://images.unsplash.com/photo-1514733670139-4d87a1941d55?auto=format&fit=crop&w=800&q=80",
    icon: "Nut",
    sortOrder: 33,
    isActive: true,
    featuredBrands: ["24 Mantra Organic", "Natureland"],
  },

  // =========================================================================
  // LEVEL 2: PERSONAL & BEAUTY CARE CHILD CATEGORIES (parentId: "parent-personal-beauty-care")
  // =========================================================================
  {
    id: "sub-hair-care",
    parentId: "parent-personal-beauty-care",
    level: 2,
    slug: "hair-oils-shampoos",
    nameEn: "Hair Oils & Shampoos",
    nameZh: "草本護髮油與洗髮露",
    imageUrl: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=800&q=80",
    icon: "Sparkles",
    sortOrder: 40,
    isActive: true,
    featuredBrands: ["Dabur Vatika", "Biotique"],
  },
  {
    id: "sub-skin-bath",
    parentId: "parent-personal-beauty-care",
    level: 2,
    slug: "herbal-soaps-body-wash",
    nameEn: "Herbal Soaps & Body Wash",
    nameZh: "天然香皂與沐浴露",
    imageUrl: "/images/categories/personal-care.png",
    icon: "Sparkles",
    sortOrder: 41,
    isActive: true,
    featuredBrands: ["Medimix", "Dettol"],
  },
  {
    id: "sub-oral-care",
    parentId: "parent-personal-beauty-care",
    level: 2,
    slug: "herbal-oral-care",
    nameEn: "Herbal Oral Care",
    nameZh: "草本牙膏與口腔護理",
    imageUrl: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=80",
    icon: "Smile",
    sortOrder: 42,
    isActive: true,
    featuredBrands: ["Vicco", "Dabur"],
  },

  // =========================================================================
  // LEVEL 2: BABY CARE CHILD CATEGORIES (parentId: "parent-baby-care")
  // =========================================================================
  {
    id: "sub-baby-massage",
    parentId: "parent-baby-care",
    level: 2,
    slug: "baby-massage-oils",
    nameEn: "Baby Massage & Hair Oils",
    nameZh: "草本嬰兒按摩油與護髮油",
    imageUrl: "https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=800&q=80",
    icon: "Baby",
    sortOrder: 50,
    isActive: true,
    featuredBrands: ["Dabur Lal Tail", "Himalaya Baby"],
  },
  {
    id: "sub-baby-food",
    parentId: "parent-baby-care",
    level: 2,
    slug: "organic-baby-food",
    nameEn: "Organic Baby Foods",
    nameZh: "嬰幼兒副食品與穀粉",
    imageUrl: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=800&q=80",
    icon: "Soup",
    sortOrder: 51,
    isActive: true,
    featuredBrands: ["Nestle Cerelac", "Slurrp Farm"],
  },
  {
    id: "sub-baby-hygiene",
    parentId: "parent-baby-care",
    level: 2,
    slug: "diapers-gentle-wipes",
    nameEn: "Diapers & Gentle Wipes",
    nameZh: "嬰兒紙尿褲與柔濕巾",
    imageUrl: "https://images.unsplash.com/photo-1544126592-807ade215a0b?auto=format&fit=crop&w=800&q=80",
    icon: "Baby",
    sortOrder: 52,
    isActive: true,
    featuredBrands: ["Pampers", "Himalaya Baby"],
  },

  // =========================================================================
  // LEVEL 2: HOME CARE CHILD CATEGORIES (parentId: "parent-home-care")
  // =========================================================================
  {
    id: "sub-incense-dhoop",
    parentId: "parent-home-care",
    level: 2,
    slug: "incense-sticks-dhoop",
    nameEn: "Puja Incense Sticks & Dhoop",
    nameZh: "傳統神聖線香與香塔",
    imageUrl: "https://images.unsplash.com/photo-1602928321679-560bb453f190?auto=format&fit=crop&w=800&q=80",
    icon: "Flame",
    sortOrder: 60,
    isActive: true,
    featuredBrands: ["Cycle Pure", "Zed Black"],
  },
  {
    id: "sub-camphor-puja",
    parentId: "parent-home-care",
    level: 2,
    slug: "camphor-puja-essentials",
    nameEn: "Camphor & Puja Essentials",
    nameZh: "純天然樟腦與祭祀用品",
    imageUrl: "https://images.unsplash.com/photo-1517646287270-a5a9ca602e5c?auto=format&fit=crop&w=800&q=80",
    icon: "Home",
    sortOrder: 61,
    isActive: true,
    featuredBrands: ["Mangaldeep"],
  },
  {
    id: "sub-floor-cleaners",
    parentId: "parent-home-care",
    level: 2,
    slug: "cleaners-disinfectants",
    nameEn: "Cleaners & Disinfectants",
    nameZh: "天然清潔與消毒洗劑",
    imageUrl: "/images/categories/household.png",
    icon: "ShieldAlert",
    sortOrder: 62,
    isActive: true,
    featuredBrands: ["Dettol", "Godrej"],
  },

  // =========================================================================
  // LEVEL 2: HOMEOPATHY MEDICINE CHILD CATEGORIES (parentId: "parent-homeopathy-medicine-store")
  // =========================================================================
  {
    id: "sub-homeo-dilutions",
    parentId: "parent-homeopathy-medicine-store",
    level: 2,
    slug: "homeopathic-dilutions",
    nameEn: "Homeopathic Dilutions",
    nameZh: "順勢療法稀釋液",
    imageUrl: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=800&q=80",
    icon: "Pill",
    sortOrder: 70,
    isActive: true,
    featuredBrands: ["Dr. Reckeweg", "SBL"],
  },
  {
    id: "sub-biochemic-salts",
    parentId: "parent-homeopathy-medicine-store",
    level: 2,
    slug: "biochemic-salts",
    nameEn: "Biochemic Salts & Tablets",
    nameZh: "生物化學組織鹽調理錠",
    imageUrl: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&w=800&q=80",
    icon: "Pill",
    sortOrder: 71,
    isActive: true,
    featuredBrands: ["Schwabe India"],
  },

  // =========================================================================
  // LEVEL 2: AYURVEDIC CHILD CATEGORIES (parentId: "parent-ayurvedic-products")
  // =========================================================================
  {
    id: "sub-chyawanprash",
    parentId: "parent-ayurvedic-products",
    level: 2,
    slug: "chyawanprash-tonics",
    nameEn: "Chyawanprash & Tonics",
    nameZh: "阿育吠陀養生膏與滋補劑",
    imageUrl: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=800&q=80",
    icon: "HeartPulse",
    sortOrder: 80,
    isActive: true,
    featuredBrands: ["Dabur", "Baidyanath"],
  },
  {
    id: "sub-herbal-churnas",
    parentId: "parent-ayurvedic-products",
    level: 2,
    slug: "herbal-churnas-powders",
    nameEn: "Herbal Churnas & Powders",
    nameZh: "三果粉、南非醉茄與天然草本粉",
    imageUrl: "https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&w=800&q=80",
    icon: "Leaf",
    sortOrder: 81,
    isActive: true,
    featuredBrands: ["Baidyanath", "Patanjali"],
  },

  // =========================================================================
  // LEVEL 2: SPORTS STORE CHILD CATEGORIES (parentId: "parent-sports-store")
  // =========================================================================
  {
    id: "sub-protein-powders",
    parentId: "parent-sports-store",
    level: 2,
    slug: "protein-powders",
    nameEn: "Whey & Plant Proteins",
    nameZh: "分離乳清與植物蛋白粉",
    imageUrl: "https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?auto=format&fit=crop&w=800&q=80",
    icon: "Activity",
    sortOrder: 90,
    isActive: true,
    featuredBrands: ["MuscleBlaze", "Optimum Nutrition"],
  },
  {
    id: "sub-pre-workout",
    parentId: "parent-sports-store",
    level: 2,
    slug: "pre-workout-hydration",
    nameEn: "Pre-Workout & Hydration",
    nameZh: "運動前能量補劑與電解質",
    imageUrl: "https://images.unsplash.com/photo-1546483875-ad9014c88eba?auto=format&fit=crop&w=800&q=80",
    icon: "Droplets",
    sortOrder: 91,
    isActive: true,
    featuredBrands: ["Fast&Up"],
  },
]

// =============================================================================
// TREE GENERATOR & RELATIONAL QUERY HELPERS
// =============================================================================

/**
 * Builds a strict 2-level category tree from flat Category records:
 * Level 1 (Roots) -> Level 2 (Children)
 */
export function buildCategoryTree(): CategoryTreeNode[] {
  const roots = categories
    .filter((c) => c.level === 1 || !c.parentId)
    .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))

  return roots.map((root) => {
    const children = categories
      .filter((c) => c.parentId === root.id && c.level === 2)
      .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))
      .map((child) => ({
        ...child,
        children: [],
      }))

    return {
      ...root,
      children,
    }
  })
}

export function getRootCategories(): Category[] {
  return categories
    .filter((c) => c.level === 1 || !c.parentId)
    .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))
}

export function getChildCategories(parentId: string): Category[] {
  return categories
    .filter((c) => c.parentId === parentId && c.level === 2)
    .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))
}

export function getCategoryBySlug(slug: string): Category | undefined {
  const norm = slug.toLowerCase().trim()
  return categories.find((c) => c.slug.toLowerCase().trim() === norm)
}

export function getCategoryById(id: string): Category | undefined {
  return categories.find((c) => c.id === id)
}

export function flattenCategories(): Category[] {
  return [...categories]
}

// Backward-compatible proxies for parent-categories.ts & subcategories.ts
export const categoryTree = buildCategoryTree()
export const parentCategories = categoryTree.map((node) => ({
  ...node,
  subcategories: node.children,
}))

export const subcategories = categories.filter((c) => c.level === 2)


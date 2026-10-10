import type { CategorySeoData } from "@workspace/typescript-config/types"

export const categorySeoRecords: Record<string, CategorySeoData> = {
  // =========================================================================
  // 1. Food & Beverages (Parent Department)
  // =========================================================================
  "food-beverages": {
    categorySlug: "food-beverages",
    headingEn: "Authentic South Asian Groceries & Food in Hong Kong",
    headingZh: "香港正宗南亞食品與優質食材網購指南",
    introEn:
      "Happymart is Hong Kong's dedicated destination for authentic Indian, Pakistani, Bangladeshi, Nepali, and Sri Lankan groceries. From aged Himalayan basmati rice and stone-ground chakki atta to handpicked whole spices, pure cow desi ghee, and comforting chai blends, we import directly from master producers to ensure farm-fresh quality and true culinary authenticity for South Asian families and international food lovers across Hong Kong.",
    introZh:
      "Happymart 為全港家庭精選直採正宗印度、巴基斯坦、孟加拉、尼泊爾及斯里蘭卡食材。無論是陳年喜馬拉雅長粒香米、石磨全麥麵粉，抑或是原粒芳香香料、純天然印度酥油及經典阿薩姆奶茶茶葉，我們均嚴選優質產地海運與空運直抵香港，為喜愛南亞美食的家庭與饕客提供新鮮正宗的道地風味。",
    buyingGuide: [
      {
        id: "bg-pantry-selection",
        headingEn: "Pantry Staples & Cooking Essentials",
        headingZh: "廚房必備基礎食材選購指南",
        contentEn:
          "South Asian cooking centers on uncompromised pantry staples. For daily flatbreads like rotis and chapatis, choose 100% whole wheat chakki atta for soft, fiber-rich dough. For rice dishes, royal aged basmati brings slender grain separation, whereas sella rice holds its shape under pressure cooking. Pair your grains with unpolished toor or moong dals for nutrient-rich, protein-packed everyday curries.",
        contentZh:
          "正宗南亞烹飪的核心在於優質主食。製作傳統烤餅（Roti）時，建議選用100%純全麥石磨麵粉（Chakki Atta），麥香濃郁且富有高膳食纖維；烹調香料飯時，陳年香米能帶來粒粒分明且舒展拉長的米香；煮燉豆湯則首選黃木豆（Toor Dal）或綠豆（Moong Dal），營養豐沛且富含優質植物蛋白。",
      },
      {
        id: "bg-spices-aroma",
        headingEn: "Mastering Spices & Tempering (Tadka)",
        headingZh: "芳香香料與油爆香（Tadka）的調味精髓",
        contentEn:
          "To unlock authentic curries, build flavors in layers: start with whole spices like green cardamom, cloves, and cumin seeds bloomed in hot ghee or mustard oil (tadka), followed by essential ground turmeric, coriander, and Kashmiri chili for rich color and depth without harsh sharpness.",
        contentZh:
          "香料是南亞料理的靈魂。建議先將純天然酥油或芥末油燒熱，加入小荳蔻、丁香及孜然原粒爆香（Tadka），再加入薑黃粉、胡荽粉與溫和提色的喀什米爾紅椒粉慢火翻炒，即可熬煮出香氣馥郁、層次細膩的道地咖哩醬汁。",
      },
    ],
    faqs: [
      {
        id: "faq-fb-delivery",
        questionEn: "How does grocery delivery work across Hong Kong?",
        questionZh: "Happymart 的全港配送服務如何運作？",
        answerEn:
          "Happymart delivers across Hong Kong Island, Kowloon, and the New Territories. Orders over HK$500 qualify for free standard delivery right to your door. Temperature-controlled packaging ensures spices, grains, and pantry goods arrive in pristine condition.",
        answerZh:
          "Happymart 提供涵蓋香港島、九龍及新界各區的送貨服務。單筆訂單購物滿 HK$500 即可享免費送貨到府。我們採用嚴格防潮與安全包裝，確保各國香料、大米及乾貨食材新鮮送達。",
      },
      {
        id: "faq-fb-authenticity",
        questionEn: "Are all products 100% authentic and imported from origin countries?",
        questionZh: "所有在售食材是否均為原產國100%正品進口？",
        answerEn:
          "Yes. We partner directly with verified heritage brands including India Gate, MDH, Shan, National, Aashirvaad, Haldiram's, and Tata to bring genuine origin-certified staples, completely free of middlemen tampering.",
        answerZh:
          "是的。我們與 India Gate、MDH、Shan、National、Aashirvaad、Haldiram's 及 Tata 等知名老字號品牌原廠或授權代理商直接合作，所有商品均具備產地品質認證與合法清關，正品保證。",
      },
      {
        id: "faq-fb-dietary",
        questionEn: "How do I filter for Vegetarian and Halal certified products?",
        questionZh: "如何在網上快速篩選純素食（Veg）或清真認證（Halal）商品？",
        answerEn:
          "You can use our smart filter sidebar on the left side of this page. Simply tick the 'Vegetarian' or 'Halal Certified' checkbox to instantly narrow down products carrying verified dietary certifications.",
        answerZh:
          "您可以利用商品列表頁面左側的篩選工具列，勾選「純素食」或「清真認證」標籤，系統將即時篩選出符合相應飲食認證的商品，購物安心便捷。",
      },
      {
        id: "faq-fb-packsizes",
        questionEn: "Do you offer bulk packaging for families and catering?",
        questionZh: "平台是否提供適合家庭囤貨或餐飲使用的特大包裝？",
        answerEn:
          "Yes. Many of our core pantry products—such as basmati rice, chakki atta, and lentils—are available in economical 5 kg and 10 kg family sacks alongside convenient 500 g and 1 kg household sizes.",
        answerZh:
          "有的。我們多數核心主食（例如印度香米、全麥麵粉及乾豆類）均備有 500g、1kg 家常輕巧包裝，以及 5kg、10kg 經濟家庭特大袋裝，滿足不同家庭與烹飪需求。",
      },
    ],
    relatedCategories: [
      { slug: "staples", nameEn: "Staples & Grains", nameZh: "五穀糧油與主食" },
      { slug: "spices", nameEn: "Spices & Masalas", nameZh: "香料與瑪莎拉" },
      { slug: "beverages", nameEn: "Chai & Beverages", nameZh: "印度茶飲與飲品" },
      { slug: "snacks-namkeen", nameEn: "Snacks & Namkeen", nameZh: "零食與鹹脆小吃" },
    ],
  },

  // =========================================================================
  // 2. Staples & Grains
  // =========================================================================
  staples: {
    categorySlug: "staples",
    headingEn: "Staple Groceries, Grains, Atta & Dals for South Asian Cooking",
    headingZh: "南亞家庭必備核心主食：香米、麵粉、扁豆與糧油",
    introEn:
      "Staples form the bedrock of wholesome South Asian family meals. Happymart stocks Hong Kong's most comprehensive selection of long-grain aged basmati rice, chakki-milled whole wheat atta flour, protein-rich lentils (dals), traditional unrefined cold-pressed mustard oils, and pure desi cow ghee. Whether you are baking daily chapatis or simmering weekend dal makhani, find everything your pantry requires in one convenient supermarket cart.",
    introZh:
      "主食是南亞家庭每一餐溫馨飯菜的基石。Happymart 為香港顧客提供最齊全的特長陳年印度香米、石磨全麥粉、高蛋白豆類、傳統芥末油與純天然印度牛酥油。無論是日常烘焙香軟薄餅，還是熬煮香濃滑順的燉豆咖哩，都能在此一站購齊。",
    buyingGuide: [
      {
        id: "bg-rice-types",
        headingEn: "Choosing the Right Rice: Basmati vs. Sella",
        headingZh: "如何挑選適合的白米：經典香米（Basmati）與蒸谷米（Sella）",
        contentEn:
          "Classic white basmati (aged 2+ years) elongates dramatically when boiled, yielding fluffy non-sticky grains with a floral aroma ideal for royal biryanis. Parboiled sella rice is firmer, making it virtually impossible to overcook and perfect for large family gatherings and pulaos.",
        contentZh:
          "陳化兩年以上的經典印度白香米，煮熟後米粒大幅拉長且乾爽不黏，自帶天然花芳米香，是烹煮皇家香料飯（Biryani）的頂級選擇；而經過蒸穀工藝的 Sella 蒸谷米質地更加緊實耐煮，適合各類燉飯（Pulao）與宴席大鍋料理。",
      },
      {
        id: "bg-atta-flour",
        headingEn: "Stone Ground Chakki Atta for Soft Rotis",
        headingZh: "傳統石磨全麥粉（Chakki Atta）打造鬆軟薄餅",
        contentEn:
          "Traditional chakki atta retains the nutrient-dense wheat bran and germ, giving rotis their characteristic puffed texture and sweet earthy taste. For lighter puris and stuffed parathas, pair whole wheat atta with a spoonful of pure cow ghee during kneading.",
        contentZh:
          "傳統石磨低溫慢磨工藝完好保留了小麥的麥麩與胚芽，能使烤餅在烙烤時自然鼓起澎鬆，口感柔韌且散發天然純麥甜香。揉麵時加入少許純牛酥油，能讓印度脆炸餅（Puri）與餡料薄餅（Paratha）更加酥化香濃。",
      },
    ],
    faqs: [
      {
        id: "faq-staples-storage",
        questionEn: "How should I store rice and flour in Hong Kong's humid weather?",
        questionZh: "在香港潮濕溫暖的天氣下，大米與麵粉應如何妥善保存？",
        answerEn:
          "We recommend transferring bulk bags of rice, atta, and lentils into airtight food-grade storage containers upon arrival. Store them in a cool, dry cupboard away from direct sunlight, or keep smaller portions in the refrigerator during peak summer months to preserve freshness.",
        answerZh:
          "香港氣候潮濕，建議收貨後將大米、麵粉及乾豆及時倒入密封保鮮米箱中，放置於陰涼通風處避免陽光直射。在炎夏潮濕季節，亦可分裝小份置於冰箱冷藏保存以確保持久新鮮。",
      },
      {
        id: "faq-staples-brands",
        questionEn: "Which brands of Basmati rice do you carry?",
        questionZh: "Happymart 提供哪些知名的印度香米品牌？",
        answerEn:
          "We carry top international brands including India Gate (Classic, Feast, Super), Daawat (Ultima, Traditional, Biryani), Kohinoor, and Lal Qilla in 1 kg, 5 kg, and bulk formats.",
        answerZh:
          "我們常備國際知名頂級品牌，包括印度門（India Gate）、大瓦特（Daawat Ultima / Biryani）、Kohinoor 及 Lal Qilla，提供 1kg 家常裝及 5kg 經典家庭裝等多種規格。",
      },
      {
        id: "faq-staples-dal-types",
        questionEn: "What are the most common Indian lentils (dals) and their uses?",
        questionZh: "常見的印度扁豆有哪些？各自有何烹飪用途？",
        answerEn:
          "Toor Dal (yellow split pigeon peas) is the golden standard for sambar and everyday dal tadka. Moong Dal is easy to digest and cooks quickly without soaking. Chana Dal retains a nutty bite in dry fries, while Masoor Dal cooks rapidly into hearty soups and stews.",
        answerZh:
          "黃木豆（Toor Dal）是南印度蔬菜湯（Sambar）和經典油爆豆湯（Dal Tadka）的首選；黃綠剖豆（Moong Dal）質地輕盈易消化、免浸泡即可快煮；鷹嘴豆剖豆（Chana Dal）口感結實自帶堅果香；紅扁豆（Masoor Dal）則烹煮迅速，湯汁濃郁。",
      },
    ],
    relatedCategories: [
      { slug: "food-beverages", nameEn: "All Food & Groceries", nameZh: "全館食品總覽" },
      { slug: "spices", nameEn: "Spices & Masalas", nameZh: "香料與瑪莎拉" },
      { slug: "ready-to-cook-instant-foods", nameEn: "Ready to Cook", nameZh: "即煮即食料理" },
    ],
  },

  // =========================================================================
  // 3. Spices & Masalas
  // =========================================================================
  spices: {
    categorySlug: "spices",
    headingEn: "Authentic Indian & South Asian Spices in Hong Kong",
    headingZh: "香港正宗印度與南亞香料、純天然瑪莎拉調味粉",
    introEn:
      "Nothing defines South Asian culinary heritage like the depth of freshly ground and whole spices. Happymart brings you export-grade spices from India and Pakistan: whole green cardamom pods, Kashmiri saffron, royal cumin, star anise, cinnamon quills, as well as renowned ready-to-use biryani mixes and curry powders from MDH, Shan, Everest, and National.",
    introZh:
      "香料是南亞美食文化的靈魂所在。Happymart 為香港顧客呈獻印度與巴基斯坦出口級純天然香料：原粒綠小荳蔻、喀什米爾藏紅花、皇家小茴香、丁香、肉桂棒，以及 MDH、Shan、Everest 與 National 等傳承數十載的正宗香料飯與經典咖哩調味包。",
    buyingGuide: [
      {
        id: "bg-whole-vs-ground",
        headingEn: "Whole Spices vs. Ground Powders: When to Use Which",
        headingZh: "原粒整香料與磨粉香料的搭配法則",
        contentEn:
          "Whole spices hold volatile essential oils indefinitely until heated in ghee or oil at the start of cooking, providing background aromatics without bitterness. Ground spice powders (coriander, cumin, turmeric) should be added later with pureed onions or tomatoes to thicken and flavor sauces.",
        contentZh:
          "原粒香料能完好鎖住植物天然揮發精油，在烹飪初期用熱油爆香（Tadka）能釋放深層芳香且不易焦苦；而研磨香料粉（如胡荽粉、孜然粉、薑黃粉）則應在洋蔥或番茄醬料炒至出油後加入，令咖哩湯汁香濃黏稠。",
      },
      {
        id: "bg-biryani-mixes",
        headingEn: "Authentic Biryani & Meat Masalas",
        headingZh: "正宗香料飯（Biryani）與肉類料理專用調料",
        contentEn:
          "For foolproof weekend feasts, pre-blended spice packets from Shan and National contain precise ratios of dried plums (alu bukhara), mace, cloves, and bay leaves, taking the guesswork out of Karachi, Sindhi, and Bombay biryanis.",
        contentZh:
          "想在週末輕鬆烹調地道香料飯？Shan 和 National 的特調香料包精準配比了黑棗乾（Alu Bukhara）、肉豆蔻皮、丁香與月桂葉，讓您在家也能輕鬆重現喀拉蚩、信德或孟買街頭的濃郁風味。",
      },
    ],
    faqs: [
      {
        id: "faq-spices-shelf-life",
        questionEn: "How long do whole spices and ground masalas stay fresh?",
        questionZh: "整粒香料與磨碎瑪莎拉粉能保存多久？",
        answerEn:
          "Whole spices retain peak potency for up to 3 years when stored in airtight glass jars away from steam. Ground spices are best used within 9 to 12 months for maximum aroma and color.",
        answerZh:
          "原粒整香料放置在密封玻璃罐中遠離高溫水汽，可保持鮮香長達2-3年；研磨後的香料粉建議在9至12個月內食用完畢，以確保色澤亮麗、香氣濃郁。",
      },
      {
        id: "faq-spices-hotness",
        questionEn: "Are all Indian spices intensely spicy hot?",
        questionZh: "所有印度香料都很辣嗎？",
        answerEn:
          "Not at all. Spices like cumin, coriander, green cardamom, fennel, and turmeric provide warm earthy aromas rather than heat. Heat comes primarily from red chili powder and black pepper, which can always be adjusted to personal taste.",
        answerZh:
          "完全不是。孜然、胡荽、小荳蔻、茴香與薑黃等核心香料主要提供大地芳香與溫暖層次，並無辛辣感。料理的辣度主要取決於紅辣椒粉與黑胡椒的用量，可隨個人口味自由增減。",
      },
    ],
    relatedCategories: [
      { slug: "staples", nameEn: "Rice & Grains", nameZh: "米糧與主食" },
      { slug: "pickles-chutney", nameEn: "Pickles & Chutneys", nameZh: "油漬醃菜與沾醬" },
      { slug: "food-beverages", nameEn: "Food & Beverages", nameZh: "食品與飲品" },
    ],
  },

  // =========================================================================
  // 4. Snacks & Namkeen
  // =========================================================================
  "snacks-namkeen": {
    categorySlug: "snacks-namkeen",
    headingEn: "Crunchy Indian Namkeen, Chips & Savouries in Hong Kong",
    headingZh: "香港正宗印度鹹脆小吃、Namkeen 零食與香脆點心",
    introEn:
      "Crispy, spiced, and utterly addictive, traditional namkeen snacks are the essential accompaniment to an afternoon cup of hot masala chai. Happymart delivers Hong Kong's favorite Haldiram's bhujia, Bikaji ratlami sev, crunchy roasted peanuts, Kurkure, spiced potato chips, and festive mathris straight to your door.",
    introZh:
      "香脆可口、鹹香微辣的傳統 Namkeen 點心是下午茶搭配熱奶茶的靈魂伴侶。Happymart 為香港顧客送上最受歡迎的 Haldiram's 脆麵絲（Bhujia）、Bikaji 特調炸點（Ratlami Sev）、香脆烘焙花生、Kurkure 及特色洋芋片，直送到府享用。",
    buyingGuide: [
      {
        id: "bg-bhujia-sev",
        headingEn: "Aloo Bhujia vs. Bikaneri Bhujia",
        headingZh: "馬鈴薯脆麵（Aloo Bhujia）與經典比卡內爾脆條的差別",
        contentEn:
          "Aloo Bhujia blends mashed potatoes with chickpea flour and mint for a melt-in-the-mouth tangy crunch. Traditional Bikaneri Bhujia uses moth bean flour and freshly crushed black pepper for a sharp, savory bite.",
        contentZh:
          "Aloo Bhujia 巧妙融合了馬鈴薯泥與鷹嘴豆粉，佐以薄荷酸爽香料，入口香脆易化；而傳統 Bikaneri Bhujia 則選用蛾豆粉搭配現磨黑胡椒與生薑，鹹香微嗆，回味無窮。",
      },
    ],
    faqs: [
      {
        id: "faq-namkeen-freshness",
        questionEn: "Are namkeen snacks packaged for maximum crispiness?",
        questionZh: "零食小吃的包裝能否確保脆度與新鮮？",
        answerEn:
          "Yes. All our snacks come in nitrogen-flushed, foil-sealed pouches directly from certified Indian manufacturers, ensuring factory-fresh crispness without grease or sogginess.",
        answerZh:
          "是的。所有零食均採用食品級充氮鋁箔密封防潮袋包裝，由原廠直接進口，開封即享剛出爐般的乾爽酥脆。",
      },
    ],
    relatedCategories: [
      { slug: "beverages", nameEn: "Chai & Teas", nameZh: "印度奶茶與茶飲" },
      { slug: "biscuits-bakery", nameEn: "Biscuits & Bakery", nameZh: "餅乾與烘焙點心" },
      { slug: "food-beverages", nameEn: "Food & Beverages", nameZh: "食品與飲品" },
    ],
  },

  // =========================================================================
  // 5. Chai & Beverages
  // =========================================================================
  beverages: {
    categorySlug: "beverages",
    headingEn: "Authentic Chai, Assam Tea & Refreshing South Asian Drinks",
    headingZh: "香港正宗阿薩姆紅茶、印度香料奶茶與特色消暑飲品",
    introEn:
      "Experience the comfort of genuine street-style chai brewed in your own Hong Kong kitchen. Browse premium CTC black teas from Brooke Bond Red Label, Tata Tea Gold, and Wagh Bakri, along with aromatic South Indian filter coffee decoctions, cooling Rooh Afza rose syrup, and tropical fruit juices.",
    introZh:
      "在香港的家中品味地道濃郁的印度香料奶茶。Happymart 嚴選頂級 CTC 阿薩姆顆粒紅茶，包括紅標（Brooke Bond Red Label）、Tata Tea Gold 及 Wagh Bakri，更有南印度滴濾咖啡粉、夏日消暑 Rooh Afza 玫瑰草本糖漿與熱帶果汁。",
    buyingGuide: [
      {
        id: "bg-ctc-brewing",
        headingEn: "How to Brew Authentic Kadak Masala Chai",
        headingZh: "如何在家煮出香濃地道的 Kadak 印度奶茶",
        contentEn:
          "Use dense CTC tea granules which infuse bold color and tannin into milk. Simmer crushed fresh ginger, green cardamom pods, and a pinch of cinnamon in equal parts water and whole milk before adding tea granules and sugar. Boil until rich and caramel-colored.",
        contentZh:
          "煮奶茶務必使用 CTC 顆粒紅茶，其萃取迅速且茶味濃烈，能與鮮奶完美融合。將拍碎的生薑、小荳蔻及少許肉桂放入等比例水與全脂奶中慢煮沸騰，再投入茶粒與蔗糖，反覆煮沸滾起三次，茶色呈現濃郁焦糖色即可過濾享用。",
      },
    ],
    faqs: [
      {
        id: "faq-ctc-tea",
        questionEn: "What is CTC tea and why is it preferred for chai?",
        questionZh: "什麼是 CTC 茶？為什麼它是煮印度奶茶的最佳選擇？",
        answerEn:
          "CTC stands for 'Crush, Tear, Curl'—a mechanical processing method that turns black tea leaves into uniform dense pellets. It releases deep red liquor and brisk astringency rapidly, standing up bold and rich even when diluted with heavy milk.",
        answerZh:
          "CTC 是指「壓碎、撕裂、捲曲」（Crush, Tear, Curl）的製茶工藝，將茶葉製成緊實的顆粒狀。煮茶時能迅速釋放深紅明亮的茶湯與強勁茶香，即使加入大量全脂牛奶也不會沖淡茶味。",
      },
    ],
    relatedCategories: [
      { slug: "biscuits-bakery", nameEn: "Biscuits & Rusks", nameZh: "餅乾與多士乾" },
      { slug: "snacks-namkeen", nameEn: "Namkeen Snacks", nameZh: "鹹脆小吃點心" },
      { slug: "food-beverages", nameEn: "Food & Beverages", nameZh: "食品與飲品" },
    ],
  },
}

/**
 * Fallback helper to provide clean, contextual SEO content for any category or subcategory
 */
export function getCategorySeoData(categorySlug: string): CategorySeoData {
  const norm = categorySlug.toLowerCase()

  if (categorySeoRecords[norm]) {
    return categorySeoRecords[norm]
  }

  // Smart fallback based on category keywords
  return {
    categorySlug: norm,
    headingEn: `${norm.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())} in Hong Kong`,
    headingZh: `正宗 ${norm.replace(/-/g, " ")} 食品與食材網購`,
    introEn: `Shop authentic, origin-imported ${norm.replace(/-/g, " ")} from trusted heritage brands at Happymart. Delivered directly to your home across Hong Kong with free delivery on orders over HK$500.`,
    introZh: `在 Happymart 選購正宗進口的 ${norm.replace(/-/g, " ")} 及優質食材。滿 HK$500 享免費送貨到府，覆蓋香港島、九龍及新界。`,
    faqs: [
      {
        id: `faq-${norm}-delivery`,
        questionEn: "Does Happymart deliver across Hong Kong?",
        questionZh: "Happymart 是否提供全港送貨服務？",
        answerEn:
          "Yes, we provide door-to-door delivery across Hong Kong Island, Kowloon, and the New Territories, with free delivery on orders over HK$500.",
        answerZh: "是的，我們提供全港送貨到府服務，單筆訂單滿 HK$500 即可享免費送貨。",
      },
      {
        id: `faq-${norm}-origin`,
        questionEn: "Are these products authentic imports?",
        questionZh: "在售商品是否為原裝正品進口？",
        answerEn:
          "All our products are 100% authentic origin imports from certified manufacturers and brand partners in South Asia.",
        answerZh: "所有商品均為 100% 正品進口，由南亞原廠與認證品牌代理直接供貨。",
      },
    ],
    relatedCategories: [
      { slug: "staples", nameEn: "Staples & Grains", nameZh: "五穀糧油與主食" },
      { slug: "spices", nameEn: "Spices & Masalas", nameZh: "香料與瑪莎拉" },
      { slug: "food-beverages", nameEn: "Food & Beverages", nameZh: "食品與飲品" },
    ],
  }
}

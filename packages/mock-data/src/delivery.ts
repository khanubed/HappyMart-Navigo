export interface DeliveryOption {
  type: "standard" | "express" | "pickup"
  nameEn: string
  nameZh: string
  feeCents: number
  freeThresholdCents?: number
  earliestSlotEn: string
  earliestSlotZh: string
  available: boolean
}

export interface DistrictInfo {
  id: string
  nameEn: string
  nameZh: string
  regionEn: string
  regionZh: string
}

export const hongKongDistricts: DistrictInfo[] = [
  // Hong Kong Island
  { id: "central-western", nameEn: "Central & Western", nameZh: "中西區", regionEn: "Hong Kong Island", regionZh: "香港島" },
  { id: "wan-chai", nameEn: "Wan Chai", nameZh: "灣仔區", regionEn: "Hong Kong Island", regionZh: "香港島" },
  { id: "eastern", nameEn: "Eastern", nameZh: "東區", regionEn: "Hong Kong Island", regionZh: "香港島" },
  { id: "southern", nameEn: "Southern", nameZh: "南區", regionEn: "Hong Kong Island", regionZh: "香港島" },

  // Kowloon
  { id: "yau-tsim-mong", nameEn: "Yau Tsim Mong (TST/Mong Kok)", nameZh: "油尖旺區 (尖沙咀/旺角)", regionEn: "Kowloon", regionZh: "九龍" },
  { id: "sham-shui-po", nameEn: "Sham Shui Po", nameZh: "深水埗區", regionEn: "Kowloon", regionZh: "九龍" },
  { id: "kowloon-city", nameEn: "Kowloon City & Hung Hom", nameZh: "九龍城及紅磡", regionEn: "Kowloon", regionZh: "九龍" },
  { id: "wong-tai-sin", nameEn: "Wong Tai Sin", nameZh: "黃大仙區", regionEn: "Kowloon", regionZh: "九龍" },
  { id: "kwun-tong", nameEn: "Kwun Tong & Kowloon Bay", nameZh: "觀塘及九龍灣", regionEn: "Kowloon", regionZh: "九龍" },

  // New Territories
  { id: "sha-tin", nameEn: "Sha Tin & Ma On Shan", nameZh: "沙田及馬鞍山", regionEn: "New Territories", regionZh: "新界" },
  { id: "tsuen-wan", nameEn: "Tsuen Wan", nameZh: "荃灣區", regionEn: "New Territories", regionZh: "新界" },
  { id: "kwai-tsing", nameEn: "Kwai Tsing", nameZh: "葵青區", regionEn: "New Territories", regionZh: "新界" },
  { id: "tuen-mun", nameEn: "Tuen Mun", nameZh: "屯門區", regionEn: "New Territories", regionZh: "新界" },
  { id: "yuen-long", nameEn: "Yuen Long & Tin Shui Wai", nameZh: "元朗及天水圍", regionEn: "New Territories", regionZh: "新界" },
  { id: "north", nameEn: "North (Sheung Shui/Fanling)", nameZh: "北區 (上水/粉嶺)", regionEn: "New Territories", regionZh: "新界" },
  { id: "tai-po", nameEn: "Tai Po", nameZh: "大埔區", regionEn: "New Territories", regionZh: "新界" },
  { id: "sai-kung", nameEn: "Sai Kung & Tseung Kwan O", nameZh: "西貢及將軍澳", regionEn: "New Territories", regionZh: "新界" },
  { id: "islands", nameEn: "Tung Chung & Discovery Bay", nameZh: "東涌及愉景灣", regionEn: "Outlying Islands", regionZh: "離島" },
]

export interface DeliveryAvailabilityResult {
  district: DistrictInfo
  options: DeliveryOption[]
  nextDayCutoff: string
  freeDeliveryThresholdCents: number
}

export function checkDeliveryAvailability(districtIdOrName: string): DeliveryAvailabilityResult {
  const norm = districtIdOrName.toLowerCase().trim()
  const fallbackDistrict: DistrictInfo = hongKongDistricts[0] ?? {
    id: "wan-chai",
    nameEn: "Wan Chai",
    nameZh: "灣仔區",
    regionEn: "Hong Kong Island",
    regionZh: "香港島",
  }
  const district: DistrictInfo =
    hongKongDistricts.find(
      (d) =>
        d.id.toLowerCase() === norm ||
        d.nameEn.toLowerCase() === norm ||
        d.nameZh === norm ||
        d.nameEn.toLowerCase().includes(norm)
    ) ?? fallbackDistrict

  const isRemote = district.id === "islands"

  const options: DeliveryOption[] = [
    {
      type: "standard",
      nameEn: "Standard Scheduled Delivery",
      nameZh: "標準溫控專車送貨",
      feeCents: isRemote ? 5000 : 3000,
      freeThresholdCents: 50000,
      earliestSlotEn: "Tomorrow 10:00 AM – 1:00 PM",
      earliestSlotZh: "翌日上午 10:00 – 下午 1:00",
      available: true,
    },
    {
      type: "express",
      nameEn: "Same-Day 3-Hour Express",
      nameZh: "即日 3 小時極速直送",
      feeCents: 5000,
      freeThresholdCents: undefined,
      earliestSlotEn: isRemote ? "Next-day only for Islands" : "Today 6:00 PM – 9:00 PM",
      earliestSlotZh: isRemote ? "離島區暫僅提供翌日送貨" : "今日下午 6:00 – 晚上 9:00",
      available: !isRemote,
    },
    {
      type: "pickup",
      nameEn: "SF Locker & Convenience Store Pickup",
      nameZh: "順豐智能櫃及便利店自取",
      feeCents: 1500,
      freeThresholdCents: 20000,
      earliestSlotEn: "Tomorrow from 9:00 AM",
      earliestSlotZh: "翌日上午 9:00 起隨時領取",
      available: true,
    },
  ]

  return {
    district,
    options,
    nextDayCutoff: "16:00",
    freeDeliveryThresholdCents: 50000,
  }
}

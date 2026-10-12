/**
 * Happymart Shared Domain Types
 * Exported from @workspace/typescript-config/types
 */

// ==========================================
// 1. Identity & Auth Types
// ==========================================

export type UserRole = 'customer' | 'admin' | 'staff';

export interface User {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  role: UserRole;
  createdAt?: string;
  updatedAt?: string;
}

export interface StaffUser extends User {
  permissions: string[];
}

export type AuthStatus = 'idle' | 'loading' | 'authenticated' | 'guest';

// ==========================================
// 2. Preferences & Localisation
// ==========================================

export type ThemeMode = 'light' | 'dark' | 'system';
export type ThemeId =
  | 'fresh-market'
  | 'market-red'
  | 'urban-blue'
  | 'pantry-earth'
  | 'modern-plum';
export type LanguageLocale = 'en' | 'zh-HK';

// ==========================================
// 3. Catalogue & Product Types
// ==========================================

export interface Category {
  id: string;
  parentId: string | null;
  nameEn: string;
  nameZh: string;
  slug: string;
  imageUrl?: string;
  bannerUrl?: string;
  descriptionEn?: string;
  descriptionZh?: string;
  seoTitle?: string;
  seoDescription?: string;
  sortOrder: number;
  isActive: boolean;
  level: 1 | 2; // max level 2
  // UI helpers & backwards compatibility:
  icon?: string;
  featuredBrands?: string[];
  subcategories?: Category[];
  children?: CategoryTreeNode[];
  displayOrder?: number;
  categoryId?: string;
}

export interface CategoryTreeNode extends Category {
  children: CategoryTreeNode[];
}

export type ParentCategory = CategoryTreeNode;
export type Subcategory = Category;

export interface Brand {
  id: string;
  slug: string;
  name: string;
  nameEn?: string;
  nameZh?: string;
  logoUrl: string;
  countryOfOrigin: string;
  descriptionEn?: string;
  descriptionZh?: string;
  productCount?: number;
  featured?: boolean;
  isActive?: boolean;
  sortOrder?: number;
}

export interface Country {
  id: string;
  code: string;
  nameEn: string;
  nameZh: string;
  flag: string;
  imageUrl: string;
  productCount: number;
  descriptionEn: string;
  descriptionZh: string;
  featuredBrands: string[];
}

export interface ProductVariant {
  id: string;
  productId: string;
  sku: string;
  packSize: string; // e.g. "1 kg", "500 g", "5 pack"
  priceCents: number; // In HKD cents (e.g. 8900 = HK$89)
  mrpCents?: number;
  stockQuantity: number;
  barcode?: string;
  isDefault?: boolean;
}

export type ProductBadge =
  | 'veg'
  | 'non-veg'
  | 'halal'
  | 'new'
  | 'offer'
  | 'low-stock'
  | 'out-of-stock'
  | 'organic'
  | 'frozen'
  | 'bestseller';

export interface ProductNutrition {
  servingSize?: string;
  energy?: string;
  protein?: string;
  fat?: string;
  carbohydrates?: string;
  fiber?: string;
  sodium?: string;
}

export interface ProductReviewItem {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verifiedPurchase: boolean;
}

export interface Product {
  id: string;
  slug: string;
  titleEn: string;
  titleZh: string;
  descriptionEn?: string;
  descriptionZh?: string;
  categoryId: string;
  subcategoryId?: string;
  brandId: string;
  brandName: string;
  brandSlug?: string;
  images: string[];
  badges: ProductBadge[];
  variants: ProductVariant[];
  originCountry: string; // "India", "Pakistan", "Bangladesh", "Nepal", "Sri Lanka", "UAE"
  storageInstructions?: string;
  rating?: number;
  reviewCount?: number;
  isBestSeller?: boolean;
  isNewArrival?: boolean;
  popularityScore?: number;
  isVeg?: boolean;
  isHalal?: boolean;
  tags?: string[];
  ingredients?: string;
  allergens?: string;
  usageInstructions?: string;
  nutrition?: ProductNutrition;
  reviews?: ProductReviewItem[];
  relatedProductIds?: string[];
}

// ==========================================
// 4. Marketing & Banners
// ==========================================

export interface Banner {
  id: string;
  titleEn: string;
  titleZh: string;
  subtitleEn?: string;
  subtitleZh?: string;
  badgeEn?: string;
  badgeZh?: string;
  offerText?: string;
  ctaLabelEn: string;
  ctaLabelZh: string;
  ctaUrl: string;
  imageUrl: string;
  mobileImageUrl?: string;
  tag?: string;
  type: 'hero-main' | 'hero-side' | 'festival' | 'promo';
}

export interface Collection {
  id: string;
  slug: string;
  titleEn: string;
  titleZh: string;
  subtitleEn: string;
  subtitleZh: string;
  badgeEn: string;
  badgeZh: string;
  bannerImageUrl: string;
  ctaLabelEn?: string;
  ctaLabelZh?: string;
  productIds: string[];
  startsAt?: string;
  endsAt?: string;
  isActive?: boolean;
}

// ==========================================
// 5. Cart & Commerce Types
// ==========================================

export interface CartItem {
  variantId: string;
  productId: string;
  title: string;
  brand?: string;
  packSize?: string;
  price: number;
  mrp?: number;
  quantity: number;
  image: string;
  originCountry?: string;
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
  discount: number;
  deliveryFee: number;
  total: number;
  freeDeliveryThreshold?: number;
  freeDeliveryRemaining?: number;
}

// ==========================================
// 6. Orders & Reordering
// ==========================================

export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  items: CartItem[];
  totalCents: number;
  status: 'delivered' | 'processing' | 'out_for_delivery';
  createdAt: string;
  deliveredAt?: string;
}

// ==========================================
// 7. Checkout & Delivery Types
// ==========================================

export type DeliveryType = 'instant' | 'same_day' | 'scheduled';

export interface DeliverySlot {
  id: string;
  deliveryType: DeliveryType;
  date: string;
  startTime: string;
  endTime: string;
  feeCents: number;
  isAvailable: boolean;
  bookedCount?: number;
  capacity?: number;
}

export interface HongKongAddress {
  id?: string;
  region: 'Hong Kong Island' | 'Kowloon' | 'New Territories' | 'Outlying Islands';
  district: string;
  zone?: string;
  building: string;
  tower?: string;
  floor: string;
  unit: string;
  contactName: string;
  contactPhone: string;
  deliveryNotes?: string;
  isDefault?: boolean;
}

export interface GuestContact {
  email?: string;
  phone?: string;
  verified: boolean;
}

export type PaymentStatus = 'idle' | 'processing' | 'success' | 'failed';

export interface CheckoutDraft {
  step: number;
  selectedAddressId: string | null;
  deliveryType: DeliveryType | null;
  slotId: string | null;
  deliveryNotes: string;
  guestContact: GuestContact;
  couponCode: string | null;
  idempotencyKey: string | null;
  paymentStatus: PaymentStatus;
}

// ==========================================
// 8. Generic API Response Envelopes
// ==========================================

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  meta?: {
    page?: number;
    pageSize?: number;
    total?: number;
    totalPages?: number;
    requestId?: string;
  };
}

export interface ApiError {
  code: string;
  message: string;
  fields?: Record<string, string>;
  requestId?: string;
}

// ==========================================
// 9. SEO & Editorial Content Types
// ==========================================

export interface CategoryFaqItem {
  id: string;
  questionEn: string;
  questionZh: string;
  answerEn: string;
  answerZh: string;
}

export interface BuyingGuideSection {
  id: string;
  headingEn: string;
  headingZh: string;
  contentEn: string;
  contentZh: string;
}

export interface RelatedCategoryLink {
  slug: string;
  nameEn: string;
  nameZh: string;
  descriptionEn?: string;
  descriptionZh?: string;
  badge?: string;
}

export interface CategorySeoData {
  categorySlug: string;
  headingEn: string;
  headingZh: string;
  introEn: string;
  introZh: string;
  buyingGuide?: BuyingGuideSection[];
  faqs?: CategoryFaqItem[];
  relatedCategories?: RelatedCategoryLink[];
}


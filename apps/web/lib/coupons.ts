export interface CouponDefinition {
  code: string;
  type: 'percent' | 'fixed' | 'shipping';
  value: number; // percent e.g. 10 or fixed dollars e.g. 20
  minSpend: number;
  isExpired?: boolean;
  descriptionEn: string;
  descriptionZh: string;
}

export const VALID_COUPONS: Record<string, CouponDefinition> = {
  HAPPY10: {
    code: 'HAPPY10',
    type: 'percent',
    value: 10,
    minSpend: 0,
    descriptionEn: '10% off entire order',
    descriptionZh: '全單享 9 折優惠',
  },
  WELCOME20: {
    code: 'WELCOME20',
    type: 'fixed',
    value: 20,
    minSpend: 150,
    descriptionEn: 'HK$20 off (Min spend HK$150)',
    descriptionZh: '立減 HK$20（滿 HK$150 可用）',
  },
  SAVE50: {
    code: 'SAVE50',
    type: 'fixed',
    value: 50,
    minSpend: 400,
    descriptionEn: 'HK$50 off grocery order (Min spend HK$400)',
    descriptionZh: '超市量販立減 HK$50（滿 HK$400 可用）',
  },
  FREESHIP: {
    code: 'FREESHIP',
    type: 'shipping',
    value: 30,
    minSpend: 0,
    descriptionEn: 'Free territory-wide delivery',
    descriptionZh: '全港免費送貨到府',
  },
  EXPIRED2024: {
    code: 'EXPIRED2024',
    type: 'fixed',
    value: 50,
    minSpend: 100,
    isExpired: true,
    descriptionEn: 'Expired 2024 promotion',
    descriptionZh: '已過期的 2024 年促銷',
  },
};

export interface CouponValidationResult {
  isValid: boolean;
  discountCents: number;
  code?: string;
  descriptionEn?: string;
  descriptionZh?: string;
  errorEn?: string;
  errorZh?: string;
}

export function validateCoupon(
  inputCode: string,
  subtotal: number,
  deliveryFee: number = 30
): CouponValidationResult {
  const normalized = inputCode.trim().toUpperCase();

  if (!normalized) {
    return {
      isValid: false,
      discountCents: 0,
      errorEn: 'Please enter a promo code.',
      errorZh: '請輸入優惠碼。',
    };
  }

  const coupon = VALID_COUPONS[normalized];

  if (!coupon) {
    return {
      isValid: false,
      discountCents: 0,
      errorEn: 'Invalid promo code. Please check and try again.',
      errorZh: '無效的優惠碼，請確認後重新輸入。',
    };
  }

  if (coupon.isExpired) {
    return {
      isValid: false,
      discountCents: 0,
      errorEn: 'This promo code has expired.',
      errorZh: '此優惠碼已過期。',
    };
  }

  if (subtotal < coupon.minSpend) {
    return {
      isValid: false,
      discountCents: 0,
      errorEn: `Minimum order value of HK$${coupon.minSpend.toFixed(2)} required for this code.`,
      errorZh: `使用此優惠碼需滿最低消費 HK$${coupon.minSpend.toFixed(2)}。`,
    };
  }

  let discountDollars = 0;
  if (coupon.type === 'percent') {
    discountDollars = (subtotal * coupon.value) / 100;
  } else if (coupon.type === 'fixed') {
    discountDollars = Math.min(coupon.value, subtotal);
  } else if (coupon.type === 'shipping') {
    discountDollars = deliveryFee;
  }

  const discountCents = Math.round(discountDollars * 100);

  return {
    isValid: true,
    code: coupon.code,
    discountCents,
    descriptionEn: coupon.descriptionEn,
    descriptionZh: coupon.descriptionZh,
  };
}

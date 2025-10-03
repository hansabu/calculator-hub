export interface DiscountInput {
  originalPrice: number
  discount1: number // 할인율 1 (%)
  discount2?: number // 할인율 2 (%) - 선택
}

export interface DiscountResult {
  finalPrice: number
  totalDiscount: number
  totalDiscountRate: number
  steps: {
    step: number
    description: string
    price: number
    discount: number
  }[]
}

export function calculateDiscount(input: DiscountInput): DiscountResult {
  const { originalPrice, discount1, discount2 } = input

  const steps: DiscountResult['steps'] = []
  let currentPrice = originalPrice

  // 첫 번째 할인
  const firstDiscountAmount = currentPrice * (discount1 / 100)
  currentPrice = currentPrice - firstDiscountAmount
  steps.push({
    step: 1,
    description: `${discount1}% 할인`,
    price: currentPrice,
    discount: firstDiscountAmount
  })

  // 두 번째 할인 (있는 경우)
  if (discount2 && discount2 > 0) {
    const secondDiscountAmount = currentPrice * (discount2 / 100)
    currentPrice = currentPrice - secondDiscountAmount
    steps.push({
      step: 2,
      description: `${discount2}% 추가 할인`,
      price: currentPrice,
      discount: secondDiscountAmount
    })
  }

  const finalPrice = currentPrice
  const totalDiscount = originalPrice - finalPrice
  const totalDiscountRate = (totalDiscount / originalPrice) * 100

  return {
    finalPrice,
    totalDiscount,
    totalDiscountRate,
    steps
  }
}

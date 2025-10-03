import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { ArrowLeft, Calculator } from 'lucide-react'
import { AdSense } from '@/components/AdSense'
import { calculateDiscount, DiscountResult } from '@/lib/calculators/life/discount'

export default function DiscountCalculator() {
  const [originalPrice, setOriginalPrice] = useState('')
  const [discount1, setDiscount1] = useState('')
  const [discount2, setDiscount2] = useState('')
  const [result, setResult] = useState<DiscountResult | null>(null)

  const handleCalculate = () => {
    const input = {
      originalPrice: parseFloat(originalPrice),
      discount1: parseFloat(discount1),
      discount2: discount2 ? parseFloat(discount2) : undefined
    }

    if (isNaN(input.originalPrice) || isNaN(input.discount1)) {
      alert('원가와 할인율을 올바르게 입력해주세요')
      return
    }

    const calculatedResult = calculateDiscount(input)
    setResult(calculatedResult)
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('ko-KR').format(Math.round(num))
  }

  return (
    <>
      <Head>
        <title>할인 계산기 - 중복할인 계산</title>
        <meta name="description" content="원가와 할인율을 입력하여 최종 가격을 계산해보세요. 중복할인도 지원합니다." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* 상단 배너 광고 */}
        <div className="mb-8 flex justify-center">
          <AdSense
            slot="2247902816"
            style={{ display: 'inline-block', width: '728px', height: '90px' }}
          />
        </div>

        {/* 뒤로가기 */}
        <Link href="/" className="inline-flex items-center gap-2 text-white hover:text-white/80 mb-6 bg-white/10 px-4 py-2 rounded-lg backdrop-blur transition-all">
          <ArrowLeft className="w-5 h-5" />
          메인으로
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <h1 className="text-3xl font-bold mb-6 flex items-center gap-3 text-white drop-shadow-lg">
              <Calculator className="w-8 h-8" />
              할인 계산기
            </h1>

            {/* 입력 폼 */}
            <div className="bg-white/95 backdrop-blur rounded-xl shadow-xl p-6 mb-6 border border-white/20">
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">원가 (원)</label>
                <input
                  type="number"
                  value={originalPrice}
                  onChange={(e) => setOriginalPrice(e.target.value)}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder="예: 100000"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">할인율 1 (%)</label>
                <input
                  type="number"
                  step="0.1"
                  value={discount1}
                  onChange={(e) => setDiscount1(e.target.value)}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder="예: 20"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">할인율 2 (%, 선택사항)</label>
                <input
                  type="number"
                  step="0.1"
                  value={discount2}
                  onChange={(e) => setDiscount2(e.target.value)}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder="예: 10"
                />
              </div>

              <button
                onClick={handleCalculate}
                className="w-full gradient-button text-white py-3 rounded-lg font-semibold shadow-lg"
              >
                계산하기
              </button>
            </div>

            {/* 결과 표시 */}
            {result && (
              <div className="result-card bg-white/95 backdrop-blur rounded-xl shadow-xl p-6 mb-6 border border-white/20">
                <h2 className="text-2xl font-bold mb-4">계산 결과</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-4 rounded-xl shadow-lg">
                    <div className="text-sm text-white/90 mb-1">최종 가격</div>
                    <div className="text-2xl font-bold text-white">{formatNumber(result.finalPrice)}원</div>
                  </div>
                  <div className="bg-gradient-to-br from-red-500 to-red-600 p-4 rounded-xl shadow-lg">
                    <div className="text-sm text-white/90 mb-1">할인 금액</div>
                    <div className="text-2xl font-bold text-white">{formatNumber(result.totalDiscount)}원</div>
                  </div>
                  <div className="bg-gradient-to-br from-green-500 to-green-600 p-4 rounded-xl shadow-lg">
                    <div className="text-sm text-white/90 mb-1">총 할인율</div>
                    <div className="text-2xl font-bold text-white">{result.totalDiscountRate.toFixed(1)}%</div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-3">할인 적용 단계</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between pb-2 border-b">
                      <span>원가</span>
                      <span className="font-semibold">{formatNumber(parseFloat(originalPrice))}원</span>
                    </div>
                    {result.steps.map((step, index) => (
                      <div key={index} className="space-y-1">
                        <div className="flex justify-between text-sm text-gray-600">
                          <span>{step.description}</span>
                          <span className="text-red-600">-{formatNumber(step.discount)}원</span>
                        </div>
                        <div className="flex justify-between">
                          <span>단계 {step.step} 가격</span>
                          <span className="font-semibold">{formatNumber(step.price)}원</span>
                        </div>
                        {index < result.steps.length - 1 && <div className="border-b pt-2"></div>}
                      </div>
                    ))}
                    <div className="border-t pt-3 flex justify-between text-lg font-bold">
                      <span>최종 가격</span>
                      <span className="text-blue-600">{formatNumber(result.finalPrice)}원</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 콘텐츠 사이 광고 */}
            <div className="mt-8 flex justify-center">
              <AdSense
                slot="6343344230"
                format="auto"
                responsive={true}
              />
            </div>
          </div>

          {/* 사이드바 광고 (데스크탑) */}
          <div className="hidden lg:block">
            <div className="sticky top-4">
              <AdSense
                slot="2843731353"
                style={{ display: 'inline-block', width: '300px', height: '300px' }}
              />
            </div>
          </div>
        </div>

        {/* 하단 모바일 광고 */}
        <div className="mt-8 flex justify-center lg:hidden">
          <AdSense
            slot="8263255594"
            style={{ display: 'inline-block', width: '320px', height: '100px' }}
          />
        </div>
      </div>
    </>
  )
}

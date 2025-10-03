import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
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

      <div className="min-h-screen">
        {/* 상단 광고 */}
        <div className="py-6 flex justify-center fade-in">
          <AdSense
            slot="2247902816"
            style={{ display: 'inline-block', width: '728px', height: '90px' }}
          />
        </div>

        {/* 뒤로가기 버튼 */}
        <div className="container mx-auto px-4 max-w-5xl">
          <Link href="/" className="inline-flex items-center gap-2 text-white hover:text-white/80 mb-6 px-4 py-2 bg-white/10 rounded-lg backdrop-blur-sm transition-all">
            <ArrowLeft className="w-5 h-5" />
            <span>메인으로</span>
          </Link>
        </div>

        {/* 메인 컨텐츠 */}
        <main className="container mx-auto px-4 pb-16 max-w-5xl">
          {/* 페이지 헤더 */}
          <header className="text-center mb-12 fade-in">
            <div className="inline-flex items-center gap-3 mb-4">
              <span className="text-5xl">🏷️</span>
              <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
                할인 계산기
              </h1>
            </div>
            <p className="text-lg text-white/80 drop-shadow">
              원가와 할인율을 입력하여 최종 가격을 계산해보세요
            </p>
          </header>

          {/* 입력 폼 카드 */}
          <div className="glass-effect rounded-2xl p-8 mb-8 slide-up">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">계산 정보 입력</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">원가 (원)</label>
                <input
                  type="number"
                  value={originalPrice}
                  onChange={(e) => setOriginalPrice(e.target.value)}
                  className="input-field"
                  placeholder="예: 100000"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">할인율 1 (%)</label>
                <input
                  type="number"
                  step="0.1"
                  value={discount1}
                  onChange={(e) => setDiscount1(e.target.value)}
                  className="input-field"
                  placeholder="예: 20"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">할인율 2 (%, 선택사항)</label>
                <input
                  type="number"
                  step="0.1"
                  value={discount2}
                  onChange={(e) => setDiscount2(e.target.value)}
                  className="input-field"
                  placeholder="예: 10"
                />
              </div>
            </div>

            <button
              onClick={handleCalculate}
              className="btn-primary w-full mt-6"
            >
              계산하기
            </button>
          </div>

          {/* 결과 카드 */}
          {result && (
            <div className="result-card glass-effect rounded-2xl p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">계산 결과</h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="stat-card" style={{"--card-from": "#3b82f6", "--card-to": "#2563eb"} as React.CSSProperties}>
                  <div className="text-sm opacity-90 mb-1">최종 가격</div>
                  <div className="text-3xl font-bold">{formatNumber(result.finalPrice)}원</div>
                </div>
                <div className="stat-card" style={{"--card-from": "#ef4444", "--card-to": "#dc2626"} as React.CSSProperties}>
                  <div className="text-sm opacity-90 mb-1">할인 금액</div>
                  <div className="text-3xl font-bold">{formatNumber(result.totalDiscount)}원</div>
                </div>
                <div className="stat-card" style={{"--card-from": "#10b981", "--card-to": "#059669"} as React.CSSProperties}>
                  <div className="text-sm opacity-90 mb-1">총 할인율</div>
                  <div className="text-3xl font-bold">{result.totalDiscountRate.toFixed(1)}%</div>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-semibold mb-4 text-gray-800">할인 적용 단계</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center pb-3 border-b-2 border-gray-300">
                    <span className="text-gray-700 font-medium">원가</span>
                    <span className="font-semibold text-gray-900">{formatNumber(parseFloat(originalPrice))}원</span>
                  </div>
                  {result.steps.map((step, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center text-sm text-gray-600">
                        <span>{step.description}</span>
                        <span className="text-red-600 font-semibold">-{formatNumber(step.discount)}원</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700">단계 {step.step} 가격</span>
                        <span className="font-semibold text-gray-900">{formatNumber(step.price)}원</span>
                      </div>
                      {index < result.steps.length - 1 && <div className="border-b border-gray-200 pt-2"></div>}
                    </div>
                  ))}
                  <div className="border-t-2 border-gray-300 pt-4 flex justify-between items-center text-lg font-bold">
                    <span className="text-gray-900">최종 가격</span>
                    <span className="text-blue-600">{formatNumber(result.finalPrice)}원</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 중간 광고 */}
          <div className="my-12 flex justify-center">
            <AdSense
              slot="6343344230"
              format="auto"
              responsive={true}
            />
          </div>
        </main>

        {/* 하단 모바일 광고 */}
        <div className="py-8 flex justify-center lg:hidden">
          <AdSense
            slot="8263255594"
            style={{ display: 'inline-block', width: '320px', height: '100px' }}
          />
        </div>

        {/* 푸터 */}
        <footer className="text-center py-8 text-white/60 text-sm">
          <p>© 2025 생활 계산기 허브. All rights reserved.</p>
        </footer>
      </div>
    </>
  )
}

import Head from 'next/head'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { useState } from 'react'
import { AdSense } from '@/components/AdSense'
import { calculateDiscount, DiscountResult } from '@/lib/calculators/life/discount'

export default function DiscountCalculator() {
  const [inputs, setInputs] = useState({
    originalPrice: '',
    discount1: '',
    discount2: ''
  })
  const [result, setResult] = useState<DiscountResult | null>(null)

  const handleCalculate = () => {
    const parsedInput = {
      originalPrice: parseFloat(inputs.originalPrice),
      discount1: parseFloat(inputs.discount1),
      discount2: inputs.discount2 ? parseFloat(inputs.discount2) : undefined
    }

    if (isNaN(parsedInput.originalPrice) || isNaN(parsedInput.discount1)) {
      alert('원가와 할인율을 올바르게 입력해주세요')
      return
    }

    const calculatedResult = calculateDiscount(parsedInput)
    setResult(calculatedResult)
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('ko-KR').format(Math.round(num))
  }

  return (
    <>
      <Head>
        <title>할인 계산기 - 생활 계산기 허브</title>
        <meta name="description" content="원가와 할인율을 입력하여 최종 가격을 계산해보세요. 중복할인도 지원합니다." />
      </Head>

      <div className="min-h-screen pb-12">
        {/* 상단 광고 */}
        <div className="pt-8 pb-12 flex justify-center fade-in">
          <AdSense slot="2247902816" style={{ display: 'inline-block', width: '728px', height: '90px' }} />
        </div>

        {/* 헤더 */}
        <header className="page-header fade-in">
          <Link href="/" className="back-button">
            <ArrowLeft size={20} />
            <span>홈으로</span>
          </Link>
          <h1 className="page-title">🏷️ 할인 계산기</h1>
          <p className="page-subtitle">원가와 할인율을 입력하여 최종 가격을 계산해보세요</p>
        </header>

        {/* 메인 컨텐츠 */}
        <main className="container-custom">
          {/* 입력 카드 */}
          <div className="glass-card mb-12 slide-up">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">입력 정보</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">원가 (원)</label>
                <input
                  type="number"
                  value={inputs.originalPrice}
                  onChange={(e) => setInputs({...inputs, originalPrice: e.target.value})}
                  className="input-field"
                  placeholder="예: 100000"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">할인율 1 (%)</label>
                <input
                  type="number"
                  step="0.1"
                  value={inputs.discount1}
                  onChange={(e) => setInputs({...inputs, discount1: e.target.value})}
                  className="input-field"
                  placeholder="예: 20"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">할인율 2 (%, 선택사항)</label>
                <input
                  type="number"
                  step="0.1"
                  value={inputs.discount2}
                  onChange={(e) => setInputs({...inputs, discount2: e.target.value})}
                  className="input-field"
                  placeholder="예: 10"
                />
              </div>
            </div>

            {/* 계산 버튼 */}
            <button onClick={handleCalculate} className="btn btn-primary w-full mt-6">
              계산하기
            </button>
          </div>

          {/* 결과 카드 */}
          {result && (
            <div className="slide-up" style={{ animationDelay: '0.1s' }}>
              <h2 className="text-2xl font-bold mb-6 text-white">계산 결과</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="result-card result-card-blue">
                  <div className="text-sm text-gray-600 mb-1">최종 가격</div>
                  <div className="text-3xl font-bold text-blue-600">{formatNumber(result.finalPrice)}원</div>
                </div>
                <div className="result-card result-card-purple">
                  <div className="text-sm text-gray-600 mb-1">할인 금액</div>
                  <div className="text-3xl font-bold text-purple-600">{formatNumber(result.totalDiscount)}원</div>
                </div>
                <div className="result-card result-card-pink">
                  <div className="text-sm text-gray-600 mb-1">총 할인율</div>
                  <div className="text-3xl font-bold text-pink-600">{result.totalDiscountRate.toFixed(1)}%</div>
                </div>
              </div>

              {/* 할인 적용 단계 */}
              <div className="glass-card">
                <h3 className="font-semibold mb-4 text-gray-800">할인 적용 단계</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center pb-3 border-b-2 border-gray-300">
                    <span className="text-gray-700 font-medium">원가</span>
                    <span className="font-semibold text-gray-900">{formatNumber(parseFloat(inputs.originalPrice))}원</span>
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
          <div className="pt-16 pb-12">
            <AdSense slot="2247902816" format="auto" responsive={true} />
          </div>
        </main>

        {/* 하단 광고 */}
        <div className="pt-16 pb-12 flex justify-center">
          <AdSense slot="2247902816" format="auto" responsive={true} />
        </div>
      </div>
    </>
  )
}

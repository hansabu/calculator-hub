import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { AdSense } from '@/components/AdSense'
import { calculateBMI, BMIResult } from '@/lib/calculators/health/bmi'

export default function BMICalculator() {
  const [height, setHeight] = useState('')
  const [weight, setWeight] = useState('')
  const [result, setResult] = useState<BMIResult | null>(null)

  const handleCalculate = () => {
    const input = {
      height: parseFloat(height),
      weight: parseFloat(weight)
    }

    if (isNaN(input.height) || isNaN(input.weight)) {
      alert('모든 값을 올바르게 입력해주세요')
      return
    }

    const calculatedResult = calculateBMI(input)
    setResult(calculatedResult)
  }

  const formatNumber = (num: number) => {
    return num.toFixed(1)
  }

  return (
    <>
      <Head>
        <title>BMI 계산기 - 체질량지수 계산</title>
        <meta name="description" content="키와 체중을 입력하여 BMI(체질량지수)를 계산하고 비만도를 확인해보세요." />
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
              <span className="text-5xl">⚖️</span>
              <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
                BMI 계산기
              </h1>
            </div>
            <p className="text-lg text-white/80 drop-shadow">
              체질량지수(BMI)를 계산하고 비만도를 확인해보세요
            </p>
          </header>

          {/* 입력 폼 카드 */}
          <div className="glass-effect rounded-2xl p-8 mb-8 slide-up">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">계산 정보 입력</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">키 (cm)</label>
                <input
                  type="number"
                  step="0.1"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  className="input-field"
                  placeholder="예: 170"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">체중 (kg)</label>
                <input
                  type="number"
                  step="0.1"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="input-field"
                  placeholder="예: 65"
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="stat-card" style={{"--card-from": "#3b82f6", "--card-to": "#2563eb"} as React.CSSProperties}>
                  <div className="text-sm opacity-90 mb-1">BMI 지수</div>
                  <div className="text-4xl font-bold">{formatNumber(result.bmi)}</div>
                </div>
                <div className="stat-card" style={{"--card-from": "#8b5cf6", "--card-to": "#7c3aed"} as React.CSSProperties}>
                  <div className="text-sm opacity-90 mb-1">비만도</div>
                  <div className="text-4xl font-bold">{result.category}</div>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-semibold mb-4 text-gray-800">BMI 기준표</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="text-gray-700">저체중</span>
                    <span className="text-blue-600 font-semibold">18.5 미만</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="text-gray-700">정상</span>
                    <span className="text-green-600 font-semibold">18.5 ~ 23</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="text-gray-700">과체중</span>
                    <span className="text-yellow-600 font-semibold">23 ~ 25</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="text-gray-700">비만</span>
                    <span className="text-orange-600 font-semibold">25 ~ 30</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-700">고도비만</span>
                    <span className="text-red-600 font-semibold">30 이상</span>
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

import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { ArrowLeft, Calculator } from 'lucide-react'
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
              BMI 계산기
            </h1>

            {/* 입력 폼 */}
            <div className="bg-white/95 backdrop-blur rounded-xl shadow-xl p-6 mb-6 border border-white/20">
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">키 (cm)</label>
                <input
                  type="number"
                  step="0.1"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder="예: 170"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">체중 (kg)</label>
                <input
                  type="number"
                  step="0.1"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder="예: 65"
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-4 rounded-xl shadow-lg">
                    <div className="text-sm text-white/90 mb-1">BMI 지수</div>
                    <div className="text-3xl font-bold text-white">{formatNumber(result.bmi)}</div>
                  </div>
                  <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-4 rounded-xl shadow-lg">
                    <div className="text-sm text-white/90 mb-1">비만도</div>
                    <div className="text-3xl font-bold text-white">{result.category}</div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-3">BMI 기준표</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>저체중</span>
                      <span className="text-blue-600 font-medium">18.5 미만</span>
                    </div>
                    <div className="flex justify-between">
                      <span>정상</span>
                      <span className="text-green-600 font-medium">18.5 ~ 23</span>
                    </div>
                    <div className="flex justify-between">
                      <span>과체중</span>
                      <span className="text-yellow-600 font-medium">23 ~ 25</span>
                    </div>
                    <div className="flex justify-between">
                      <span>비만</span>
                      <span className="text-orange-600 font-medium">25 ~ 30</span>
                    </div>
                    <div className="flex justify-between">
                      <span>고도비만</span>
                      <span className="text-red-600 font-medium">30 이상</span>
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

import Head from 'next/head'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { useState } from 'react'
import { AdSense } from '@/components/AdSense'
import { calculateBMI, BMIResult } from '@/lib/calculators/health/bmi'

export default function BMICalculator() {
  const [inputs, setInputs] = useState({
    height: '',
    weight: ''
  })
  const [result, setResult] = useState<BMIResult | null>(null)

  const handleCalculate = () => {
    const parsedInput = {
      height: parseFloat(inputs.height),
      weight: parseFloat(inputs.weight)
    }

    if (isNaN(parsedInput.height) || isNaN(parsedInput.weight)) {
      alert('모든 값을 올바르게 입력해주세요')
      return
    }

    const calculatedResult = calculateBMI(parsedInput)
    setResult(calculatedResult)
  }

  const formatNumber = (num: number) => {
    return num.toFixed(1)
  }

  return (
    <>
      <Head>
        <title>BMI 계산기 - 생활 계산기 허브</title>
        <meta name="description" content="키와 체중을 입력하여 BMI(체질량지수)를 계산하고 비만도를 확인해보세요." />
      </Head>

      <div className="min-h-screen pb-12">
        {/* 상단 광고 */}
        <div className="py-6 flex justify-center fade-in">
          <AdSense slot="2247902816" style={{ display: 'inline-block', width: '728px', height: '90px' }} />
        </div>

        {/* 헤더 */}
        <header className="page-header fade-in">
          <Link href="/" className="back-button">
            <ArrowLeft size={20} />
            <span>홈으로</span>
          </Link>
          <h1 className="page-title">⚖️ BMI 계산기</h1>
          <p className="page-subtitle">체질량지수(BMI)를 계산하고 비만도를 확인해보세요</p>
        </header>

        {/* 메인 컨텐츠 */}
        <main className="container-custom">
          {/* 입력 카드 */}
          <div className="glass-card mb-8 slide-up">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">입력 정보</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">키 (cm)</label>
                <input
                  type="number"
                  step="0.1"
                  value={inputs.height}
                  onChange={(e) => setInputs({...inputs, height: e.target.value})}
                  className="input-field"
                  placeholder="예: 170"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">체중 (kg)</label>
                <input
                  type="number"
                  step="0.1"
                  value={inputs.weight}
                  onChange={(e) => setInputs({...inputs, weight: e.target.value})}
                  className="input-field"
                  placeholder="예: 65"
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="result-card result-card-blue">
                  <div className="text-sm text-gray-600 mb-1">BMI 지수</div>
                  <div className="text-4xl font-bold text-blue-600">{formatNumber(result.bmi)}</div>
                </div>
                <div className="result-card result-card-purple">
                  <div className="text-sm text-gray-600 mb-1">비만도</div>
                  <div className="text-4xl font-bold text-purple-600">{result.category}</div>
                </div>
              </div>

              {/* BMI 기준표 */}
              <div className="glass-card">
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
          <div className="py-12">
            <AdSense slot="2247902816" format="auto" responsive={true} />
          </div>
        </main>

        {/* 하단 광고 */}
        <div className="py-12 flex justify-center">
          <AdSense slot="2247902816" format="auto" responsive={true} />
        </div>
      </div>
    </>
  )
}

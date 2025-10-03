import Head from 'next/head'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { useState } from 'react'
import { AdSense } from '@/components/AdSense'
import { calculateSeverance, SeveranceResult } from '@/lib/calculators/finance/severance'

export default function SeveranceCalculator() {
  const [inputs, setInputs] = useState({
    monthlySalary: '',
    years: '',
    months: ''
  })
  const [result, setResult] = useState<SeveranceResult | null>(null)

  const handleCalculate = () => {
    const parsedInput = {
      monthlySalary: parseFloat(inputs.monthlySalary),
      years: parseInt(inputs.years),
      months: parseInt(inputs.months)
    }

    if (isNaN(parsedInput.monthlySalary) || isNaN(parsedInput.years) || isNaN(parsedInput.months)) {
      alert('모든 값을 올바르게 입력해주세요')
      return
    }

    const calculatedResult = calculateSeverance(parsedInput)
    setResult(calculatedResult)
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('ko-KR').format(Math.round(num))
  }

  return (
    <>
      <Head>
        <title>퇴직금 계산기 - 생활 계산기 허브</title>
        <meta name="description" content="근속 기간에 따른 퇴직금과 소득세를 계산해보세요. 실수령액을 확인할 수 있습니다." />
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
          <h1 className="page-title">🏦 퇴직금 계산기</h1>
          <p className="page-subtitle">근속 기간에 따른 퇴직금과 실수령액을 계산해보세요</p>
        </header>

        {/* 메인 컨텐츠 */}
        <main className="container-custom">
          {/* 입력 카드 */}
          <div className="glass-card mb-12 slide-up">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">입력 정보</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">월급 (원)</label>
                <input
                  type="number"
                  value={inputs.monthlySalary}
                  onChange={(e) => setInputs({...inputs, monthlySalary: e.target.value})}
                  className="input-field"
                  placeholder="예: 3000000"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">근속 년수</label>
                <input
                  type="number"
                  value={inputs.years}
                  onChange={(e) => setInputs({...inputs, years: e.target.value})}
                  className="input-field"
                  placeholder="예: 5"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">근속 개월수 (년 제외)</label>
                <input
                  type="number"
                  value={inputs.months}
                  onChange={(e) => setInputs({...inputs, months: e.target.value})}
                  className="input-field"
                  placeholder="예: 6"
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <div className="result-card result-card-blue">
                  <div className="text-sm text-gray-600 mb-1">퇴직금</div>
                  <div className="text-2xl font-bold text-blue-600">{formatNumber(result.severancePay)}원</div>
                </div>
                <div className="result-card result-card-purple">
                  <div className="text-sm text-gray-600 mb-1">실수령액</div>
                  <div className="text-2xl font-bold text-purple-600">{formatNumber(result.netAmount)}원</div>
                </div>
                <div className="result-card result-card-pink">
                  <div className="text-sm text-gray-600 mb-1">소득세</div>
                  <div className="text-xl font-bold text-pink-600">{formatNumber(result.incomeTax)}원</div>
                </div>
                <div className="result-card result-card-orange">
                  <div className="text-sm text-gray-600 mb-1">지방소득세</div>
                  <div className="text-xl font-bold text-orange-600">{formatNumber(result.localIncomeTax)}원</div>
                </div>
              </div>

              {/* 세금 공제 내역 */}
              <div className="glass-card">
                <div className="text-sm text-gray-600 mb-4 font-semibold">세금 공제 내역</div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">퇴직금</span>
                    <span className="font-semibold text-gray-900">{formatNumber(result.severancePay)}원</span>
                  </div>
                  <div className="flex justify-between items-center text-red-600">
                    <span>- 소득세</span>
                    <span className="font-semibold">{formatNumber(result.incomeTax)}원</span>
                  </div>
                  <div className="flex justify-between items-center text-orange-600">
                    <span>- 지방소득세</span>
                    <span className="font-semibold">{formatNumber(result.localIncomeTax)}원</span>
                  </div>
                  <div className="border-t-2 border-gray-300 pt-4 flex justify-between items-center text-lg font-bold">
                    <span className="text-gray-900">실수령액</span>
                    <span className="text-purple-600">{formatNumber(result.netAmount)}원</span>
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

import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { AdSense } from '@/components/AdSense'
import { calculateSeverance, SeveranceResult } from '@/lib/calculators/finance/severance'

export default function SeveranceCalculator() {
  const [monthlySalary, setMonthlySalary] = useState('')
  const [years, setYears] = useState('')
  const [months, setMonths] = useState('')
  const [result, setResult] = useState<SeveranceResult | null>(null)

  const handleCalculate = () => {
    const input = {
      monthlySalary: parseFloat(monthlySalary),
      years: parseInt(years),
      months: parseInt(months)
    }

    if (isNaN(input.monthlySalary) || isNaN(input.years) || isNaN(input.months)) {
      alert('모든 값을 올바르게 입력해주세요')
      return
    }

    const calculatedResult = calculateSeverance(input)
    setResult(calculatedResult)
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('ko-KR').format(Math.round(num))
  }

  return (
    <>
      <Head>
        <title>퇴직금 계산기 - 퇴직금 세금 계산</title>
        <meta name="description" content="근속 기간에 따른 퇴직금과 소득세를 계산해보세요. 실수령액을 확인할 수 있습니다." />
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
              <span className="text-5xl">🏦</span>
              <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
                퇴직금 계산기
              </h1>
            </div>
            <p className="text-lg text-white/80 drop-shadow">
              근속 기간에 따른 퇴직금과 실수령액을 계산해보세요
            </p>
          </header>

          {/* 입력 폼 카드 */}
          <div className="glass-effect rounded-2xl p-8 mb-8 slide-up">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">계산 정보 입력</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">월급 (원)</label>
                <input
                  type="number"
                  value={monthlySalary}
                  onChange={(e) => setMonthlySalary(e.target.value)}
                  className="input-field"
                  placeholder="예: 3000000"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">근속 년수</label>
                <input
                  type="number"
                  value={years}
                  onChange={(e) => setYears(e.target.value)}
                  className="input-field"
                  placeholder="예: 5"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">근속 개월수 (년 제외)</label>
                <input
                  type="number"
                  value={months}
                  onChange={(e) => setMonths(e.target.value)}
                  className="input-field"
                  placeholder="예: 6"
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

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <div className="stat-card" style={{"--card-from": "#3b82f6", "--card-to": "#2563eb"} as React.CSSProperties}>
                  <div className="text-sm opacity-90 mb-1">퇴직금</div>
                  <div className="text-2xl font-bold">{formatNumber(result.severancePay)}원</div>
                </div>
                <div className="stat-card" style={{"--card-from": "#8b5cf6", "--card-to": "#7c3aed"} as React.CSSProperties}>
                  <div className="text-sm opacity-90 mb-1">실수령액</div>
                  <div className="text-2xl font-bold">{formatNumber(result.netAmount)}원</div>
                </div>
                <div className="stat-card" style={{"--card-from": "#ef4444", "--card-to": "#dc2626"} as React.CSSProperties}>
                  <div className="text-sm opacity-90 mb-1">소득세</div>
                  <div className="text-xl font-bold">{formatNumber(result.incomeTax)}원</div>
                </div>
                <div className="stat-card" style={{"--card-from": "#f59e0b", "--card-to": "#d97706"} as React.CSSProperties}>
                  <div className="text-sm opacity-90 mb-1">지방소득세</div>
                  <div className="text-xl font-bold">{formatNumber(result.localIncomeTax)}원</div>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="text-sm text-gray-600 mb-4 font-semibold">세금 공제 내역</div>
                <div className="space-y-3">
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
                  <div className="border-t-2 border-gray-300 pt-3 flex justify-between items-center text-lg font-bold">
                    <span className="text-gray-900">실수령액</span>
                    <span className="text-purple-600">{formatNumber(result.netAmount)}원</span>
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

import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { ArrowLeft, Calculator } from 'lucide-react'
import { AdSense } from '@/components/AdSense'
import { calculateEqualPrincipalInterest, calculateEqualPrincipal, calculateBulletRepayment, LoanResult } from '@/lib/calculators/finance/loan'

type LoanType = 'equalPrincipalInterest' | 'equalPrincipal' | 'bulletRepayment'

export default function LoanCalculator() {
  const [loanType, setLoanType] = useState<LoanType>('equalPrincipalInterest')
  const [principal, setPrincipal] = useState('')
  const [annualRate, setAnnualRate] = useState('')
  const [months, setMonths] = useState('')
  const [result, setResult] = useState<LoanResult | null>(null)

  const handleCalculate = () => {
    const input = {
      principal: parseFloat(principal),
      annualRate: parseFloat(annualRate),
      months: parseInt(months)
    }

    if (isNaN(input.principal) || isNaN(input.annualRate) || isNaN(input.months)) {
      alert('모든 값을 올바르게 입력해주세요')
      return
    }

    let calculatedResult: LoanResult

    switch (loanType) {
      case 'equalPrincipalInterest':
        calculatedResult = calculateEqualPrincipalInterest(input)
        break
      case 'equalPrincipal':
        calculatedResult = calculateEqualPrincipal(input)
        break
      case 'bulletRepayment':
        calculatedResult = calculateBulletRepayment(input)
        break
    }

    setResult(calculatedResult)
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('ko-KR').format(Math.round(num))
  }

  return (
    <>
      <Head>
        <title>대출 계산기 - 원리금균등, 원금균등, 만기일시상환</title>
        <meta name="description" content="대출 상환 방식별 월 상환액과 총 이자를 계산해보세요. 원리금균등, 원금균등, 만기일시상환 방식을 지원합니다." />
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
              <span className="text-5xl">💰</span>
              <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
                대출 계산기
              </h1>
            </div>
            <p className="text-lg text-white/80 drop-shadow">
              대출 상환 방식별 월 상환액과 총 이자를 계산해보세요
            </p>
          </header>

          {/* 입력 폼 카드 */}
          <div className="glass-effect rounded-2xl p-8 mb-8 slide-up">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">계산 정보 입력</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">상환 방식</label>
                <select
                  value={loanType}
                  onChange={(e) => setLoanType(e.target.value as LoanType)}
                  className="input-field"
                >
                  <option value="equalPrincipalInterest">원리금균등상환</option>
                  <option value="equalPrincipal">원금균등상환</option>
                  <option value="bulletRepayment">만기일시상환</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">대출원금 (원)</label>
                <input
                  type="number"
                  value={principal}
                  onChange={(e) => setPrincipal(e.target.value)}
                  className="input-field"
                  placeholder="예: 100000000"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">연이율 (%)</label>
                <input
                  type="number"
                  step="0.01"
                  value={annualRate}
                  onChange={(e) => setAnnualRate(e.target.value)}
                  className="input-field"
                  placeholder="예: 3.5"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">상환개월수</label>
                <input
                  type="number"
                  value={months}
                  onChange={(e) => setMonths(e.target.value)}
                  className="input-field"
                  placeholder="예: 360"
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
                  <div className="text-sm opacity-90 mb-1">월 상환액</div>
                  <div className="text-3xl font-bold">{formatNumber(result.monthlyPayment)}원</div>
                </div>
                <div className="stat-card" style={{"--card-from": "#10b981", "--card-to": "#059669"} as React.CSSProperties}>
                  <div className="text-sm opacity-90 mb-1">총 상환액</div>
                  <div className="text-3xl font-bold">{formatNumber(result.totalPayment)}원</div>
                </div>
                <div className="stat-card" style={{"--card-from": "#ef4444", "--card-to": "#dc2626"} as React.CSSProperties}>
                  <div className="text-sm opacity-90 mb-1">총 이자</div>
                  <div className="text-3xl font-bold">{formatNumber(result.totalInterest)}원</div>
                </div>
              </div>

              {/* 상환 스케줄 */}
              <h3 className="text-xl font-semibold mb-4 text-gray-800">상환 스케줄</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left">회차</th>
                      <th className="px-4 py-2 text-right">원금</th>
                      <th className="px-4 py-2 text-right">이자</th>
                      <th className="px-4 py-2 text-right">월상환액</th>
                      <th className="px-4 py-2 text-right">잔액</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {result.schedule.slice(0, 12).map((item) => (
                      <tr key={item.month} className="hover:bg-gray-50">
                        <td className="px-4 py-2">{item.month}</td>
                        <td className="px-4 py-2 text-right">{formatNumber(item.principal)}</td>
                        <td className="px-4 py-2 text-right">{formatNumber(item.interest)}</td>
                        <td className="px-4 py-2 text-right">{formatNumber(item.payment)}</td>
                        <td className="px-4 py-2 text-right">{formatNumber(item.balance)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {result.schedule.length > 12 && (
                <p className="text-sm text-gray-500 mt-2 text-center">
                  첫 12개월만 표시 (전체 {result.schedule.length}개월)
                </p>
              )}
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

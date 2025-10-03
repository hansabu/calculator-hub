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

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* 상단 배너 광고 */}
        <div className="mb-8 flex justify-center">
          <AdSense
            slot="2247902816"
            style={{ display: 'inline-block', width: '728px', height: '90px' }}
          />
        </div>

        {/* 뒤로가기 */}
        <Link href="/" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-4">
          <ArrowLeft className="w-5 h-5" />
          메인으로
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
              <Calculator className="w-8 h-8" />
              대출 계산기
            </h1>

            {/* 입력 폼 */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">상환 방식</label>
                <select
                  value={loanType}
                  onChange={(e) => setLoanType(e.target.value as LoanType)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="equalPrincipalInterest">원리금균등상환</option>
                  <option value="equalPrincipal">원금균등상환</option>
                  <option value="bulletRepayment">만기일시상환</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">대출원금 (원)</label>
                <input
                  type="number"
                  value={principal}
                  onChange={(e) => setPrincipal(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="예: 100000000"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">연이율 (%)</label>
                <input
                  type="number"
                  step="0.01"
                  value={annualRate}
                  onChange={(e) => setAnnualRate(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="예: 3.5"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">상환개월수</label>
                <input
                  type="number"
                  value={months}
                  onChange={(e) => setMonths(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="예: 360"
                />
              </div>

              <button
                onClick={handleCalculate}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
              >
                계산하기
              </button>
            </div>

            {/* 결과 표시 */}
            {result && (
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-2xl font-bold mb-4">계산 결과</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">월 상환액</div>
                    <div className="text-2xl font-bold text-blue-600">{formatNumber(result.monthlyPayment)}원</div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">총 상환액</div>
                    <div className="text-2xl font-bold text-green-600">{formatNumber(result.totalPayment)}원</div>
                  </div>
                  <div className="bg-red-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">총 이자</div>
                    <div className="text-2xl font-bold text-red-600">{formatNumber(result.totalInterest)}원</div>
                  </div>
                </div>

                {/* 상환 스케줄 */}
                <h3 className="text-xl font-semibold mb-3">상환 스케줄</h3>
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

import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { ArrowLeft, Calculator } from 'lucide-react'
import { AdSense } from '@/components/AdSense'
import { calculateSimpleInterest, calculateCompoundInterest, SavingsResult } from '@/lib/calculators/finance/savings'

type InterestType = 'simple' | 'compound'

export default function SavingsCalculator() {
  const [interestType, setInterestType] = useState<InterestType>('compound')
  const [monthlyDeposit, setMonthlyDeposit] = useState('')
  const [months, setMonths] = useState('')
  const [annualRate, setAnnualRate] = useState('')
  const [result, setResult] = useState<SavingsResult | null>(null)

  const handleCalculate = () => {
    const input = {
      monthlyDeposit: parseFloat(monthlyDeposit),
      months: parseInt(months),
      annualRate: parseFloat(annualRate),
      interestType
    }

    if (isNaN(input.monthlyDeposit) || isNaN(input.months) || isNaN(input.annualRate)) {
      alert('모든 값을 올바르게 입력해주세요')
      return
    }

    const calculatedResult = interestType === 'simple'
      ? calculateSimpleInterest(input)
      : calculateCompoundInterest(input)

    setResult(calculatedResult)
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('ko-KR').format(Math.round(num))
  }

  return (
    <>
      <Head>
        <title>적금 계산기 - 단리/복리 적금 계산</title>
        <meta name="description" content="단리와 복리 적금의 만기 금액을 계산해보세요. 월 납입액과 이율에 따른 이자를 비교할 수 있습니다." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8 flex justify-center">
          <AdSense
            slot="2247902816"
            style={{ display: 'inline-block', width: '728px', height: '90px' }}
          />
        </div>

        <Link href="/" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-4">
          <ArrowLeft className="w-5 h-5" />
          메인으로
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
              <Calculator className="w-8 h-8" />
              적금 계산기
            </h1>

            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">이자 계산 방식</label>
                <select
                  value={interestType}
                  onChange={(e) => setInterestType(e.target.value as InterestType)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="compound">복리</option>
                  <option value="simple">단리</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">월 납입액 (원)</label>
                <input
                  type="number"
                  value={monthlyDeposit}
                  onChange={(e) => setMonthlyDeposit(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="예: 500000"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">가입 개월수</label>
                <input
                  type="number"
                  value={months}
                  onChange={(e) => setMonths(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="예: 12"
                />
              </div>

              <div className="mb-6">
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

              <button
                onClick={handleCalculate}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
              >
                계산하기
              </button>
            </div>

            {result && (
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-2xl font-bold mb-4">계산 결과</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">총 납입액</div>
                    <div className="text-2xl font-bold text-blue-600">{formatNumber(result.totalDeposit)}원</div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">총 이자</div>
                    <div className="text-2xl font-bold text-green-600">{formatNumber(result.totalInterest)}원</div>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">만기 금액</div>
                    <div className="text-2xl font-bold text-purple-600">{formatNumber(result.finalAmount)}원</div>
                  </div>
                </div>

                <h3 className="text-xl font-semibold mb-3">월별 적립 내역</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-left">회차</th>
                        <th className="px-4 py-2 text-right">납입액</th>
                        <th className="px-4 py-2 text-right">이자</th>
                        <th className="px-4 py-2 text-right">잔액</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {result.monthlyResults.slice(0, 12).map((item) => (
                        <tr key={item.month} className="hover:bg-gray-50">
                          <td className="px-4 py-2">{item.month}</td>
                          <td className="px-4 py-2 text-right">{formatNumber(item.deposit)}</td>
                          <td className="px-4 py-2 text-right">{formatNumber(item.interest)}</td>
                          <td className="px-4 py-2 text-right">{formatNumber(item.balance)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {result.monthlyResults.length > 12 && (
                  <p className="text-sm text-gray-500 mt-2 text-center">
                    첫 12개월만 표시 (전체 {result.monthlyResults.length}개월)
                  </p>
                )}
              </div>
            )}

            <div className="mt-8 flex justify-center">
              <AdSense
                slot="6343344230"
                format="auto"
                responsive={true}
              />
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="sticky top-4">
              <AdSense
                slot="2843731353"
                style={{ display: 'inline-block', width: '300px', height: '300px' }}
              />
            </div>
          </div>
        </div>

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

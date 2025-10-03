import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { ArrowLeft, Calculator } from 'lucide-react'
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
              퇴직금 계산기
            </h1>

            {/* 입력 폼 */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">월급 (원)</label>
                <input
                  type="number"
                  value={monthlySalary}
                  onChange={(e) => setMonthlySalary(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="예: 3000000"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">근속 년수</label>
                <input
                  type="number"
                  value={years}
                  onChange={(e) => setYears(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="예: 5"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">근속 개월수 (년 제외)</label>
                <input
                  type="number"
                  value={months}
                  onChange={(e) => setMonths(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="예: 6"
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">퇴직금</div>
                    <div className="text-2xl font-bold text-blue-600">{formatNumber(result.severancePay)}원</div>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">실수령액</div>
                    <div className="text-2xl font-bold text-purple-600">{formatNumber(result.netAmount)}원</div>
                  </div>
                  <div className="bg-red-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">소득세</div>
                    <div className="text-xl font-bold text-red-600">{formatNumber(result.incomeTax)}원</div>
                  </div>
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">지방소득세</div>
                    <div className="text-xl font-bold text-orange-600">{formatNumber(result.localIncomeTax)}원</div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-600 mb-2">세금 공제 내역</div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>퇴직금</span>
                      <span className="font-semibold">{formatNumber(result.severancePay)}원</span>
                    </div>
                    <div className="flex justify-between text-red-600">
                      <span>- 소득세</span>
                      <span className="font-semibold">{formatNumber(result.incomeTax)}원</span>
                    </div>
                    <div className="flex justify-between text-orange-600">
                      <span>- 지방소득세</span>
                      <span className="font-semibold">{formatNumber(result.localIncomeTax)}원</span>
                    </div>
                    <div className="border-t pt-2 flex justify-between text-lg font-bold">
                      <span>실수령액</span>
                      <span className="text-purple-600">{formatNumber(result.netAmount)}원</span>
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

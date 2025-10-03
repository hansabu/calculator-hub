import Head from 'next/head'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { useState } from 'react'
import { AdSense } from '@/components/AdSense'
import { calculateSimpleInterest, calculateCompoundInterest, SavingsResult } from '@/lib/calculators/finance/savings'

type InterestType = 'simple' | 'compound'

export default function SavingsCalculator() {
  const [inputs, setInputs] = useState({
    interestType: 'compound' as InterestType,
    monthlyDeposit: '',
    months: '',
    annualRate: ''
  })
  const [result, setResult] = useState<SavingsResult | null>(null)

  const handleCalculate = () => {
    const parsedInput = {
      monthlyDeposit: parseFloat(inputs.monthlyDeposit),
      months: parseInt(inputs.months),
      annualRate: parseFloat(inputs.annualRate),
      interestType: inputs.interestType
    }

    if (isNaN(parsedInput.monthlyDeposit) || isNaN(parsedInput.months) || isNaN(parsedInput.annualRate)) {
      alert('모든 값을 올바르게 입력해주세요')
      return
    }

    const calculatedResult = inputs.interestType === 'simple'
      ? calculateSimpleInterest(parsedInput)
      : calculateCompoundInterest(parsedInput)

    setResult(calculatedResult)
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('ko-KR').format(Math.round(num))
  }

  return (
    <>
      <Head>
        <title>적금 계산기 - 생활 계산기 허브</title>
        <meta name="description" content="단리와 복리 적금의 만기 금액을 계산해보세요. 월 납입액과 이율에 따른 이자를 비교할 수 있습니다." />
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
          <h1 className="page-title">💸 적금 계산기</h1>
          <p className="page-subtitle">단리와 복리 적금의 만기 금액을 계산해보세요</p>
        </header>

        {/* 메인 컨텐츠 */}
        <main className="container-custom">
          {/* 입력 카드 */}
          <div className="glass-card mb-12 slide-up">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">입력 정보</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">이자 계산 방식</label>
                <select
                  value={inputs.interestType}
                  onChange={(e) => setInputs({...inputs, interestType: e.target.value as InterestType})}
                  className="input-field"
                >
                  <option value="compound">복리</option>
                  <option value="simple">단리</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">월 납입액 (원)</label>
                <input
                  type="number"
                  value={inputs.monthlyDeposit}
                  onChange={(e) => setInputs({...inputs, monthlyDeposit: e.target.value})}
                  className="input-field"
                  placeholder="예: 500000"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">가입 개월수</label>
                <input
                  type="number"
                  value={inputs.months}
                  onChange={(e) => setInputs({...inputs, months: e.target.value})}
                  className="input-field"
                  placeholder="예: 12"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">연이율 (%)</label>
                <input
                  type="number"
                  step="0.01"
                  value={inputs.annualRate}
                  onChange={(e) => setInputs({...inputs, annualRate: e.target.value})}
                  className="input-field"
                  placeholder="예: 3.5"
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
                  <div className="text-sm text-gray-600 mb-1">총 납입액</div>
                  <div className="text-3xl font-bold text-blue-600">{formatNumber(result.totalDeposit)}원</div>
                </div>
                <div className="result-card result-card-purple">
                  <div className="text-sm text-gray-600 mb-1">총 이자</div>
                  <div className="text-3xl font-bold text-purple-600">{formatNumber(result.totalInterest)}원</div>
                </div>
                <div className="result-card result-card-pink">
                  <div className="text-sm text-gray-600 mb-1">만기 금액</div>
                  <div className="text-3xl font-bold text-pink-600">{formatNumber(result.finalAmount)}원</div>
                </div>
              </div>

              {/* 월별 적립 내역 */}
              <div className="glass-card">
                <h3 className="text-xl font-semibold mb-4 text-gray-900">월별 적립 내역</h3>
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

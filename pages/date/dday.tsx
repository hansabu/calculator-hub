import { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { ArrowLeft, Calculator } from 'lucide-react'
import { AdSense } from '@/components/AdSense'
import { calculateDday, DdayResult } from '@/lib/calculators/date/dday'

export default function DdayCalculator() {
  const [targetDate, setTargetDate] = useState('')
  const [result, setResult] = useState<DdayResult | null>(null)
  const [isLive, setIsLive] = useState(false)

  useEffect(() => {
    if (!isLive || !targetDate) return

    const interval = setInterval(() => {
      handleCalculate()
    }, 1000)

    return () => clearInterval(interval)
  }, [isLive, targetDate])

  const handleCalculate = () => {
    if (!targetDate) {
      alert('목표 날짜를 입력해주세요')
      return
    }

    const target = new Date(targetDate)
    const calculatedResult = calculateDday({ targetDate: target })
    setResult(calculatedResult)
  }

  const handleStartLive = () => {
    handleCalculate()
    setIsLive(true)
  }

  const formatNumber = (num: number) => {
    return num.toString().padStart(2, '0')
  }

  return (
    <>
      <Head>
        <title>D-Day 계산기 - 디데이 계산</title>
        <meta name="description" content="목표 날짜까지 남은 일수를 실시간으로 확인해보세요. 디데이 계산기입니다." />
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
              D-Day 계산기
            </h1>

            {/* 입력 폼 */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">목표 날짜</label>
                <input
                  type="datetime-local"
                  value={targetDate}
                  onChange={(e) => {
                    setTargetDate(e.target.value)
                    setIsLive(false)
                  }}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={handleCalculate}
                  className="bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                >
                  계산하기
                </button>
                <button
                  onClick={handleStartLive}
                  className={`py-3 rounded-lg font-semibold transition-colors ${
                    isLive
                      ? 'bg-red-600 text-white hover:bg-red-700'
                      : 'bg-green-600 text-white hover:bg-green-700'
                  }`}
                >
                  {isLive ? '실시간 중지' : '실시간 시작'}
                </button>
              </div>
            </div>

            {/* 결과 표시 */}
            {result && (
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-2xl font-bold mb-4">계산 결과</h2>

                <div className="mb-6">
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg text-center">
                    <div className="text-sm text-gray-600 mb-2">
                      {result.isPast ? '경과한 날' : '남은 날'}
                    </div>
                    <div className="text-5xl font-bold text-blue-600 mb-2">
                      {result.isPast ? '+' : 'D-'}{Math.abs(result.dday)}
                    </div>
                    <div className="text-sm text-gray-500">
                      {result.isPast ? '지났습니다' : '남았습니다'}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg text-center">
                    <div className="text-sm text-gray-600 mb-1">일</div>
                    <div className="text-3xl font-bold text-blue-600">{formatNumber(result.days)}</div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg text-center">
                    <div className="text-sm text-gray-600 mb-1">시간</div>
                    <div className="text-3xl font-bold text-green-600">{formatNumber(result.hours)}</div>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg text-center">
                    <div className="text-sm text-gray-600 mb-1">분</div>
                    <div className="text-3xl font-bold text-purple-600">{formatNumber(result.minutes)}</div>
                  </div>
                  <div className="bg-orange-50 p-4 rounded-lg text-center">
                    <div className="text-sm text-gray-600 mb-1">초</div>
                    <div className="text-3xl font-bold text-orange-600">{formatNumber(result.seconds)}</div>
                  </div>
                </div>

                {isLive && (
                  <div className="mt-4 text-center">
                    <span className="inline-flex items-center gap-2 text-sm text-green-600">
                      <span className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></span>
                      실시간 업데이트 중
                    </span>
                  </div>
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

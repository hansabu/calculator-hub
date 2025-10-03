import Head from 'next/head'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { useState, useEffect } from 'react'
import { AdSense } from '@/components/AdSense'
import { calculateDday, DdayResult } from '@/lib/calculators/date/dday'

export default function DdayCalculator() {
  const [inputs, setInputs] = useState({
    targetDate: ''
  })
  const [result, setResult] = useState<DdayResult | null>(null)
  const [isLive, setIsLive] = useState(false)

  useEffect(() => {
    if (!isLive || !inputs.targetDate) return

    const interval = setInterval(() => {
      handleCalculate()
    }, 1000)

    return () => clearInterval(interval)
  }, [isLive, inputs.targetDate])

  const handleCalculate = () => {
    if (!inputs.targetDate) {
      alert('목표 날짜를 입력해주세요')
      return
    }

    const target = new Date(inputs.targetDate)
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
        <title>D-Day 계산기 - 생활 계산기 허브</title>
        <meta name="description" content="목표 날짜까지 남은 일수를 실시간으로 확인해보세요. 디데이 계산기입니다." />
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
          <h1 className="page-title">📅 D-Day 계산기</h1>
          <p className="page-subtitle">목표 날짜까지 남은 일수를 실시간으로 확인해보세요</p>
        </header>

        {/* 메인 컨텐츠 */}
        <main className="container-custom">
          {/* 입력 카드 */}
          <div className="glass-card mb-12 slide-up">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">입력 정보</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">목표 날짜</label>
                <input
                  type="datetime-local"
                  value={inputs.targetDate}
                  onChange={(e) => {
                    setInputs({...inputs, targetDate: e.target.value})
                    setIsLive(false)
                  }}
                  className="input-field"
                />
              </div>
            </div>

            {/* 계산 버튼 */}
            <div className="grid grid-cols-2 gap-4 mt-6">
              <button onClick={handleCalculate} className="btn btn-primary">
                계산하기
              </button>
              <button
                onClick={handleStartLive}
                className={`px-6 py-3 rounded-lg font-semibold shadow-lg transition-all ${
                  isLive
                    ? 'bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700'
                    : 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700'
                }`}
              >
                {isLive ? '실시간 중지' : '실시간 시작'}
              </button>
            </div>
          </div>

          {/* 결과 카드 */}
          {result && (
            <div className="slide-up" style={{ animationDelay: '0.1s' }}>
              <h2 className="text-2xl font-bold mb-6 text-white">계산 결과</h2>

              {/* D-Day 표시 */}
              <div className="mb-8">
                <div className="glass-card p-8 text-center border-2 border-purple-300">
                  <div className="text-sm text-gray-600 mb-2 font-medium">
                    {result.isPast ? '경과한 날' : '남은 날'}
                  </div>
                  <div className="text-6xl font-bold text-blue-600 mb-2">
                    {result.isPast ? '+' : 'D-'}{Math.abs(result.dday)}
                  </div>
                  <div className="text-sm text-gray-500">
                    {result.isPast ? '지났습니다' : '남았습니다'}
                  </div>
                </div>
              </div>

              {/* 시간 상세 */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="result-card result-card-blue">
                  <div className="text-sm text-gray-600 mb-1">일</div>
                  <div className="text-4xl font-bold text-blue-600">{formatNumber(result.days)}</div>
                </div>
                <div className="result-card result-card-purple">
                  <div className="text-sm text-gray-600 mb-1">시간</div>
                  <div className="text-4xl font-bold text-purple-600">{formatNumber(result.hours)}</div>
                </div>
                <div className="result-card result-card-pink">
                  <div className="text-sm text-gray-600 mb-1">분</div>
                  <div className="text-4xl font-bold text-pink-600">{formatNumber(result.minutes)}</div>
                </div>
                <div className="result-card result-card-orange">
                  <div className="text-sm text-gray-600 mb-1">초</div>
                  <div className="text-4xl font-bold text-orange-600">{formatNumber(result.seconds)}</div>
                </div>
              </div>

              {isLive && (
                <div className="mt-6 text-center">
                  <span className="inline-flex items-center gap-2 text-sm text-green-600 font-medium bg-white px-4 py-2 rounded-full">
                    <span className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></span>
                    실시간 업데이트 중
                  </span>
                </div>
              )}
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

import { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
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
              <span className="text-5xl">📅</span>
              <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
                D-Day 계산기
              </h1>
            </div>
            <p className="text-lg text-white/80 drop-shadow">
              목표 날짜까지 남은 일수를 실시간으로 확인해보세요
            </p>
          </header>

          {/* 입력 폼 카드 */}
          <div className="glass-effect rounded-2xl p-8 mb-8 slide-up">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">계산 정보 입력</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">목표 날짜</label>
                <input
                  type="datetime-local"
                  value={targetDate}
                  onChange={(e) => {
                    setTargetDate(e.target.value)
                    setIsLive(false)
                  }}
                  className="input-field"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-6">
              <button
                onClick={handleCalculate}
                className="btn-primary"
              >
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
            <div className="result-card glass-effect rounded-2xl p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">계산 결과</h2>

              <div className="mb-8">
                <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 p-8 rounded-xl text-center border-2 border-purple-300">
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

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="stat-card" style={{"--card-from": "#3b82f6", "--card-to": "#2563eb"} as React.CSSProperties}>
                  <div className="text-sm opacity-90 mb-1">일</div>
                  <div className="text-4xl font-bold">{formatNumber(result.days)}</div>
                </div>
                <div className="stat-card" style={{"--card-from": "#10b981", "--card-to": "#059669"} as React.CSSProperties}>
                  <div className="text-sm opacity-90 mb-1">시간</div>
                  <div className="text-4xl font-bold">{formatNumber(result.hours)}</div>
                </div>
                <div className="stat-card" style={{"--card-from": "#8b5cf6", "--card-to": "#7c3aed"} as React.CSSProperties}>
                  <div className="text-sm opacity-90 mb-1">분</div>
                  <div className="text-4xl font-bold">{formatNumber(result.minutes)}</div>
                </div>
                <div className="stat-card" style={{"--card-from": "#f59e0b", "--card-to": "#d97706"} as React.CSSProperties}>
                  <div className="text-sm opacity-90 mb-1">초</div>
                  <div className="text-4xl font-bold">{formatNumber(result.seconds)}</div>
                </div>
              </div>

              {isLive && (
                <div className="mt-6 text-center">
                  <span className="inline-flex items-center gap-2 text-sm text-green-600 font-medium">
                    <span className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></span>
                    실시간 업데이트 중
                  </span>
                </div>
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

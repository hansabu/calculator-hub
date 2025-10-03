import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { AdSense } from '@/components/AdSense'
import { calculateCalorie, CalorieResult } from '@/lib/calculators/health/calorie'

export default function CalorieCalculator() {
  const [gender, setGender] = useState<'male' | 'female'>('male')
  const [age, setAge] = useState('')
  const [height, setHeight] = useState('')
  const [weight, setWeight] = useState('')
  const [activityLevel, setActivityLevel] = useState('1.55')
  const [result, setResult] = useState<CalorieResult | null>(null)

  const handleCalculate = () => {
    const input = {
      gender,
      age: parseInt(age),
      height: parseFloat(height),
      weight: parseFloat(weight),
      activityLevel: parseFloat(activityLevel)
    }

    if (isNaN(input.age) || isNaN(input.height) || isNaN(input.weight) || isNaN(input.activityLevel)) {
      alert('모든 값을 올바르게 입력해주세요')
      return
    }

    const calculatedResult = calculateCalorie(input)
    setResult(calculatedResult)
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('ko-KR').format(Math.round(num))
  }

  return (
    <>
      <Head>
        <title>칼로리 계산기 - 일일 권장 칼로리 계산</title>
        <meta name="description" content="기초대사량과 활동대사량을 계산하여 하루 권장 칼로리를 확인해보세요." />
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
              <span className="text-5xl">🔥</span>
              <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
                칼로리 계산기
              </h1>
            </div>
            <p className="text-lg text-white/80 drop-shadow">
              기초대사량과 활동대사량을 계산하여 하루 권장 칼로리를 확인해보세요
            </p>
          </header>

          {/* 입력 폼 카드 */}
          <div className="glass-effect rounded-2xl p-8 mb-8 slide-up">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">계산 정보 입력</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">성별</label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value as 'male' | 'female')}
                  className="input-field"
                >
                  <option value="male">남성</option>
                  <option value="female">여성</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">나이</label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="input-field"
                  placeholder="예: 30"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">키 (cm)</label>
                <input
                  type="number"
                  step="0.1"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  className="input-field"
                  placeholder="예: 170"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">체중 (kg)</label>
                <input
                  type="number"
                  step="0.1"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="input-field"
                  placeholder="예: 65"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">활동량</label>
                <select
                  value={activityLevel}
                  onChange={(e) => setActivityLevel(e.target.value)}
                  className="input-field"
                >
                  <option value="1.2">거의 활동 없음 (주로 앉아있음)</option>
                  <option value="1.375">가벼운 활동 (주 1-3회 운동)</option>
                  <option value="1.55">보통 활동 (주 3-5회 운동)</option>
                  <option value="1.725">높은 활동 (주 6-7회 운동)</option>
                  <option value="1.9">매우 높은 활동 (육체노동 또는 하루 2회 운동)</option>
                </select>
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
                  <div className="text-sm opacity-90 mb-1">기초대사량</div>
                  <div className="text-2xl font-bold">{formatNumber(result.bmr)} kcal</div>
                </div>
                <div className="stat-card" style={{"--card-from": "#10b981", "--card-to": "#059669"} as React.CSSProperties}>
                  <div className="text-sm opacity-90 mb-1">활동대사량</div>
                  <div className="text-2xl font-bold">{formatNumber(result.tdee)} kcal</div>
                </div>
                <div className="stat-card" style={{"--card-from": "#8b5cf6", "--card-to": "#7c3aed"} as React.CSSProperties}>
                  <div className="text-sm opacity-90 mb-1">권장 칼로리</div>
                  <div className="text-2xl font-bold">{formatNumber(result.recommendedCalorie)} kcal</div>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-semibold mb-4 text-gray-800">칼로리 섭취 가이드</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="text-gray-700">체중 감량 목표</span>
                    <span className="font-semibold text-blue-600">{formatNumber(result.recommendedCalorie * 0.8)} kcal/일</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="text-gray-700">현재 체중 유지</span>
                    <span className="font-semibold text-green-600">{formatNumber(result.recommendedCalorie)} kcal/일</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-700">체중 증가 목표</span>
                    <span className="font-semibold text-purple-600">{formatNumber(result.recommendedCalorie * 1.2)} kcal/일</span>
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

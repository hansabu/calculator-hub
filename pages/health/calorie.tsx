import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { ArrowLeft, Calculator } from 'lucide-react'
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

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* 상단 배너 광고 */}
        <div className="mb-8 flex justify-center">
          <AdSense
            slot="2247902816"
            style={{ display: 'inline-block', width: '728px', height: '90px' }}
          />
        </div>

        {/* 뒤로가기 */}
        <Link href="/" className="inline-flex items-center gap-2 text-white hover:text-white/80 mb-6 bg-white/10 px-4 py-2 rounded-lg backdrop-blur transition-all">
          <ArrowLeft className="w-5 h-5" />
          메인으로
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <h1 className="text-3xl font-bold mb-6 flex items-center gap-3 text-white drop-shadow-lg">
              <Calculator className="w-8 h-8" />
              칼로리 계산기
            </h1>

            {/* 입력 폼 */}
            <div className="bg-white/95 backdrop-blur rounded-xl shadow-xl p-6 mb-6 border border-white/20">
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">성별</label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value as 'male' | 'female')}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                >
                  <option value="male">남성</option>
                  <option value="female">여성</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">나이</label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder="예: 30"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">키 (cm)</label>
                <input
                  type="number"
                  step="0.1"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder="예: 170"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">체중 (kg)</label>
                <input
                  type="number"
                  step="0.1"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder="예: 65"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">활동량</label>
                <select
                  value={activityLevel}
                  onChange={(e) => setActivityLevel(e.target.value)}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                >
                  <option value="1.2">거의 활동 없음 (주로 앉아있음)</option>
                  <option value="1.375">가벼운 활동 (주 1-3회 운동)</option>
                  <option value="1.55">보통 활동 (주 3-5회 운동)</option>
                  <option value="1.725">높은 활동 (주 6-7회 운동)</option>
                  <option value="1.9">매우 높은 활동 (육체노동 또는 하루 2회 운동)</option>
                </select>
              </div>

              <button
                onClick={handleCalculate}
                className="w-full gradient-button text-white py-3 rounded-lg font-semibold shadow-lg"
              >
                계산하기
              </button>
            </div>

            {/* 결과 표시 */}
            {result && (
              <div className="result-card bg-white/95 backdrop-blur rounded-xl shadow-xl p-6 mb-6 border border-white/20">
                <h2 className="text-2xl font-bold mb-4">계산 결과</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-4 rounded-xl shadow-lg">
                    <div className="text-sm text-white/90 mb-1">기초대사량</div>
                    <div className="text-2xl font-bold text-white">{formatNumber(result.bmr)} kcal</div>
                  </div>
                  <div className="bg-gradient-to-br from-green-500 to-green-600 p-4 rounded-xl shadow-lg">
                    <div className="text-sm text-white/90 mb-1">활동대사량</div>
                    <div className="text-2xl font-bold text-white">{formatNumber(result.tdee)} kcal</div>
                  </div>
                  <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-4 rounded-xl shadow-lg">
                    <div className="text-sm text-white/90 mb-1">권장 칼로리</div>
                    <div className="text-2xl font-bold text-white">{formatNumber(result.recommendedCalorie)} kcal</div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-3">칼로리 섭취 가이드</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>체중 감량 목표</span>
                      <span className="font-medium text-blue-600">{formatNumber(result.recommendedCalorie * 0.8)} kcal/일</span>
                    </div>
                    <div className="flex justify-between">
                      <span>현재 체중 유지</span>
                      <span className="font-medium text-green-600">{formatNumber(result.recommendedCalorie)} kcal/일</span>
                    </div>
                    <div className="flex justify-between">
                      <span>체중 증가 목표</span>
                      <span className="font-medium text-purple-600">{formatNumber(result.recommendedCalorie * 1.2)} kcal/일</span>
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

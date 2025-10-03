import Head from 'next/head'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { useState } from 'react'
import { AdSense } from '@/components/AdSense'
import { calculateCalorie, CalorieResult } from '@/lib/calculators/health/calorie'

export default function CalorieCalculator() {
  const [inputs, setInputs] = useState({
    gender: 'male' as 'male' | 'female',
    age: '',
    height: '',
    weight: '',
    activityLevel: '1.55'
  })
  const [result, setResult] = useState<CalorieResult | null>(null)

  const handleCalculate = () => {
    const parsedInput = {
      gender: inputs.gender,
      age: parseInt(inputs.age),
      height: parseFloat(inputs.height),
      weight: parseFloat(inputs.weight),
      activityLevel: parseFloat(inputs.activityLevel)
    }

    if (isNaN(parsedInput.age) || isNaN(parsedInput.height) || isNaN(parsedInput.weight) || isNaN(parsedInput.activityLevel)) {
      alert('모든 값을 올바르게 입력해주세요')
      return
    }

    const calculatedResult = calculateCalorie(parsedInput)
    setResult(calculatedResult)
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('ko-KR').format(Math.round(num))
  }

  return (
    <>
      <Head>
        <title>칼로리 계산기 - 생활 계산기 허브</title>
        <meta name="description" content="기초대사량과 활동대사량을 계산하여 하루 권장 칼로리를 확인해보세요." />
      </Head>

      <div className="min-h-screen pb-12">
        {/* 상단 광고 */}
        <div className="py-6 flex justify-center fade-in">
          <AdSense slot="2247902816" style={{ display: 'inline-block', width: '728px', height: '90px' }} />
        </div>

        {/* 헤더 */}
        <header className="page-header fade-in">
          <Link href="/" className="back-button">
            <ArrowLeft size={20} />
            <span>홈으로</span>
          </Link>
          <h1 className="page-title">🔥 칼로리 계산기</h1>
          <p className="page-subtitle">기초대사량과 활동대사량을 계산하여 하루 권장 칼로리를 확인해보세요</p>
        </header>

        {/* 메인 컨텐츠 */}
        <main className="container-custom">
          {/* 입력 카드 */}
          <div className="glass-card mb-8 slide-up">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">입력 정보</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">성별</label>
                <select
                  value={inputs.gender}
                  onChange={(e) => setInputs({...inputs, gender: e.target.value as 'male' | 'female'})}
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
                  value={inputs.age}
                  onChange={(e) => setInputs({...inputs, age: e.target.value})}
                  className="input-field"
                  placeholder="예: 30"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">키 (cm)</label>
                <input
                  type="number"
                  step="0.1"
                  value={inputs.height}
                  onChange={(e) => setInputs({...inputs, height: e.target.value})}
                  className="input-field"
                  placeholder="예: 170"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">체중 (kg)</label>
                <input
                  type="number"
                  step="0.1"
                  value={inputs.weight}
                  onChange={(e) => setInputs({...inputs, weight: e.target.value})}
                  className="input-field"
                  placeholder="예: 65"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">활동량</label>
                <select
                  value={inputs.activityLevel}
                  onChange={(e) => setInputs({...inputs, activityLevel: e.target.value})}
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
                  <div className="text-sm text-gray-600 mb-1">기초대사량</div>
                  <div className="text-2xl font-bold text-blue-600">{formatNumber(result.bmr)} kcal</div>
                </div>
                <div className="result-card result-card-purple">
                  <div className="text-sm text-gray-600 mb-1">활동대사량</div>
                  <div className="text-2xl font-bold text-purple-600">{formatNumber(result.tdee)} kcal</div>
                </div>
                <div className="result-card result-card-pink">
                  <div className="text-sm text-gray-600 mb-1">권장 칼로리</div>
                  <div className="text-2xl font-bold text-pink-600">{formatNumber(result.recommendedCalorie)} kcal</div>
                </div>
              </div>

              {/* 칼로리 섭취 가이드 */}
              <div className="glass-card">
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
          <div className="py-12">
            <AdSense slot="2247902816" format="auto" responsive={true} />
          </div>
        </main>

        {/* 하단 광고 */}
        <div className="py-12 flex justify-center">
          <AdSense slot="2247902816" format="auto" responsive={true} />
        </div>
      </div>
    </>
  )
}

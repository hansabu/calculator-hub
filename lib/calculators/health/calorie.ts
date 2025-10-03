export interface CalorieInput {
  gender: 'male' | 'female'
  age: number
  height: number // cm
  weight: number // kg
  activityLevel: number // 1.2 ~ 1.9
}

export interface CalorieResult {
  bmr: number // 기초대사량
  tdee: number // 활동대사량
  recommendedCalorie: number // 권장 칼로리
}

export function calculateCalorie(input: CalorieInput): CalorieResult {
  const { gender, age, height, weight, activityLevel } = input

  // Harris-Benedict 공식으로 기초대사량 계산
  let bmr: number
  if (gender === 'male') {
    bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age)
  } else {
    bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age)
  }

  // 활동대사량 = 기초대사량 × 활동지수
  const tdee = bmr * activityLevel

  // 권장 칼로리 (활동대사량 기준)
  const recommendedCalorie = tdee

  return {
    bmr,
    tdee,
    recommendedCalorie
  }
}

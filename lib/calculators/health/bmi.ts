export interface BMIInput {
  height: number // cm
  weight: number // kg
}

export interface BMIResult {
  bmi: number
  category: string
  categoryColor: string
}

export function calculateBMI(input: BMIInput): BMIResult {
  const { height, weight } = input

  // BMI = 체중(kg) / (신장(m) * 신장(m))
  const heightInMeters = height / 100
  const bmi = weight / (heightInMeters * heightInMeters)

  let category = ''
  let categoryColor = ''

  if (bmi < 18.5) {
    category = '저체중'
    categoryColor = 'text-blue-600'
  } else if (bmi < 23) {
    category = '정상'
    categoryColor = 'text-green-600'
  } else if (bmi < 25) {
    category = '과체중'
    categoryColor = 'text-yellow-600'
  } else if (bmi < 30) {
    category = '비만'
    categoryColor = 'text-orange-600'
  } else {
    category = '고도비만'
    categoryColor = 'text-red-600'
  }

  return {
    bmi,
    category,
    categoryColor
  }
}

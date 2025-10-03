export interface DdayInput {
  targetDate: Date
}

export interface DdayResult {
  dday: number
  days: number
  hours: number
  minutes: number
  seconds: number
  isPast: boolean
}

export function calculateDday(input: DdayInput): DdayResult {
  const { targetDate } = input
  const now = new Date()

  // 날짜만 비교하기 위해 시간을 0으로 설정
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const targetStart = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate())

  // D-Day 계산 (날짜 차이)
  const diffTime = targetStart.getTime() - todayStart.getTime()
  const dday = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  // 실제 남은 시간 계산 (현재 시각 기준)
  const totalDiffTime = targetDate.getTime() - now.getTime()
  const isPast = totalDiffTime < 0
  const absDiffTime = Math.abs(totalDiffTime)

  const days = Math.floor(absDiffTime / (1000 * 60 * 60 * 24))
  const hours = Math.floor((absDiffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((absDiffTime % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((absDiffTime % (1000 * 60)) / 1000)

  return {
    dday,
    days,
    hours,
    minutes,
    seconds,
    isPast
  }
}

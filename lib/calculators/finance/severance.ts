export interface SeveranceInput {
  monthlySalary: number
  years: number
  months: number
}

export interface SeveranceResult {
  severancePay: number
  incomeTax: number
  localIncomeTax: number
  netAmount: number
}

export function calculateSeverance(input: SeveranceInput): SeveranceResult {
  const { monthlySalary, years, months } = input

  // 계속근로기간 (일수)
  const totalDays = years * 365 + months * 30

  // 평균임금 (월급 기준)
  const averageWage = monthlySalary

  // 퇴직금 = 평균임금 × 30일 × (재직일수 / 365)
  const severancePay = averageWage * 30 * (totalDays / 365)

  // 근속연수 공제 (환산)
  const workYears = totalDays / 365
  let deduction = 0
  if (workYears <= 5) {
    deduction = workYears * 300000
  } else if (workYears <= 10) {
    deduction = 1500000 + (workYears - 5) * 500000
  } else if (workYears <= 20) {
    deduction = 4000000 + (workYears - 10) * 700000
  } else {
    deduction = 11000000 + (workYears - 20) * 1000000
  }

  // 과세표준
  const taxBase = Math.max(severancePay - deduction, 0)

  // 소득세 계산 (간이세액표 기준)
  let incomeTax = 0
  if (taxBase <= 12000000) {
    incomeTax = taxBase * 0.06
  } else if (taxBase <= 46000000) {
    incomeTax = 720000 + (taxBase - 12000000) * 0.15
  } else if (taxBase <= 88000000) {
    incomeTax = 5820000 + (taxBase - 46000000) * 0.24
  } else if (taxBase <= 150000000) {
    incomeTax = 15900000 + (taxBase - 88000000) * 0.35
  } else {
    incomeTax = 37600000 + (taxBase - 150000000) * 0.38
  }

  // 지방소득세 (소득세의 10%)
  const localIncomeTax = incomeTax * 0.1

  // 실수령액
  const netAmount = severancePay - incomeTax - localIncomeTax

  return {
    severancePay,
    incomeTax,
    localIncomeTax,
    netAmount
  }
}

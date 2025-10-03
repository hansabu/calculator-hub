export interface SavingsInput {
  monthlyDeposit: number
  months: number
  annualRate: number
  interestType: 'simple' | 'compound'
}

export interface SavingsResult {
  totalDeposit: number
  totalInterest: number
  finalAmount: number
  monthlyResults: Array<{
    month: number
    deposit: number
    interest: number
    balance: number
  }>
}

// 단리 적금 계산
export function calculateSimpleInterest(input: SavingsInput): SavingsResult {
  const { monthlyDeposit, months, annualRate } = input
  const monthlyRate = annualRate / 100 / 12

  let totalDeposit = 0
  let totalInterest = 0
  const monthlyResults = []

  for (let month = 1; month <= months; month++) {
    totalDeposit += monthlyDeposit
    const monthsRemaining = months - month + 1
    const interest = monthlyDeposit * monthlyRate * monthsRemaining
    totalInterest += interest

    monthlyResults.push({
      month,
      deposit: monthlyDeposit,
      interest,
      balance: totalDeposit + totalInterest
    })
  }

  return {
    totalDeposit,
    totalInterest,
    finalAmount: totalDeposit + totalInterest,
    monthlyResults
  }
}

// 복리 적금 계산
export function calculateCompoundInterest(input: SavingsInput): SavingsResult {
  const { monthlyDeposit, months, annualRate } = input
  const monthlyRate = annualRate / 100 / 12

  let balance = 0
  let totalDeposit = 0
  const monthlyResults = []

  for (let month = 1; month <= months; month++) {
    balance = balance * (1 + monthlyRate) + monthlyDeposit
    totalDeposit += monthlyDeposit

    monthlyResults.push({
      month,
      deposit: monthlyDeposit,
      interest: balance - totalDeposit,
      balance
    })
  }

  return {
    totalDeposit,
    totalInterest: balance - totalDeposit,
    finalAmount: balance,
    monthlyResults
  }
}

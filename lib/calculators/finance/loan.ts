// 대출 계산기 - 원리금균등상환, 원금균등상환, 만기일시상환
import Decimal from 'decimal.js';

export interface LoanInput {
  principal: number;      // 대출원금
  annualRate: number;     // 연이율 (%)
  months: number;         // 상환개월수
}

export interface MonthlyPayment {
  month: number;
  principal: number;      // 원금
  interest: number;       // 이자
  payment: number;        // 월상환액
  balance: number;        // 잔액
}

export interface LoanResult {
  monthlyPayment: number;        // 월 상환액
  totalPayment: number;          // 총 상환액
  totalInterest: number;         // 총 이자
  schedule: MonthlyPayment[];    // 상환 스케줄
}

/**
 * 원리금균등상환 계산
 * 월 상환액 = 원금 × (월이율 × (1+월이율)^개월수) / ((1+월이율)^개월수 - 1)
 */
export function calculateEqualPrincipalInterest(input: LoanInput): LoanResult {
  const { principal, annualRate, months } = input;

  // Decimal.js로 정밀 계산
  const monthlyRate = new Decimal(annualRate).div(100).div(12);
  const P = new Decimal(principal);

  // (1 + 월이율)^개월수
  const onePlusR = monthlyRate.plus(1);
  const onePlusRPowN = onePlusR.pow(months);

  // 월 상환액 계산
  const monthlyPayment = P.mul(monthlyRate.mul(onePlusRPowN))
    .div(onePlusRPowN.minus(1))
    .toDecimalPlaces(0, Decimal.ROUND_HALF_UP);

  // 상환 스케줄 생성
  const schedule: MonthlyPayment[] = [];
  let balance = P;

  for (let month = 1; month <= months; month++) {
    const interest = balance.mul(monthlyRate).toDecimalPlaces(0, Decimal.ROUND_HALF_UP);
    const principalPmt = monthlyPayment.minus(interest);
    balance = balance.minus(principalPmt);

    // 마지막 달 잔액 보정
    if (month === months && !balance.isZero()) {
      const adjustment = balance;
      balance = new Decimal(0);
      schedule.push({
        month,
        principal: principalPmt.plus(adjustment).toNumber(),
        interest: interest.toNumber(),
        payment: monthlyPayment.plus(adjustment).toNumber(),
        balance: 0
      });
    } else {
      schedule.push({
        month,
        principal: principalPmt.toNumber(),
        interest: interest.toNumber(),
        payment: monthlyPayment.toNumber(),
        balance: balance.toNumber()
      });
    }
  }

  const totalPayment = monthlyPayment.mul(months).toNumber();
  const totalInterest = totalPayment - principal;

  return {
    monthlyPayment: monthlyPayment.toNumber(),
    totalPayment,
    totalInterest,
    schedule
  };
}

/**
 * 원금균등상환 계산
 */
export function calculateEqualPrincipal(input: LoanInput): LoanResult {
  const { principal, annualRate, months } = input;

  const monthlyRate = new Decimal(annualRate).div(100).div(12);
  const P = new Decimal(principal);
  const monthlyPrincipal = P.div(months).toDecimalPlaces(0, Decimal.ROUND_HALF_UP);

  const schedule: MonthlyPayment[] = [];
  let balance = P;
  let totalPayment = new Decimal(0);

  for (let month = 1; month <= months; month++) {
    const interest = balance.mul(monthlyRate).toDecimalPlaces(0, Decimal.ROUND_HALF_UP);
    const payment = monthlyPrincipal.plus(interest);
    balance = balance.minus(monthlyPrincipal);
    totalPayment = totalPayment.plus(payment);

    schedule.push({
      month,
      principal: monthlyPrincipal.toNumber(),
      interest: interest.toNumber(),
      payment: payment.toNumber(),
      balance: balance.toNumber()
    });
  }

  return {
    monthlyPayment: schedule[0].payment, // 첫 달 상환액
    totalPayment: totalPayment.toNumber(),
    totalInterest: totalPayment.toNumber() - principal,
    schedule
  };
}

/**
 * 만기일시상환 계산
 */
export function calculateBulletRepayment(input: LoanInput): LoanResult {
  const { principal, annualRate, months } = input;

  const monthlyRate = new Decimal(annualRate).div(100).div(12);
  const P = new Decimal(principal);

  const schedule: MonthlyPayment[] = [];
  const monthlyInterest = P.mul(monthlyRate).toDecimalPlaces(0, Decimal.ROUND_HALF_UP);

  for (let month = 1; month <= months; month++) {
    if (month < months) {
      // 만기 전: 이자만 납부
      schedule.push({
        month,
        principal: 0,
        interest: monthlyInterest.toNumber(),
        payment: monthlyInterest.toNumber(),
        balance: P.toNumber()
      });
    } else {
      // 만기: 원금 + 이자 납부
      schedule.push({
        month,
        principal: P.toNumber(),
        interest: monthlyInterest.toNumber(),
        payment: P.plus(monthlyInterest).toNumber(),
        balance: 0
      });
    }
  }

  const totalInterest = monthlyInterest.mul(months);
  const totalPayment = P.plus(totalInterest);

  return {
    monthlyPayment: monthlyInterest.toNumber(), // 월 이자
    totalPayment: totalPayment.toNumber(),
    totalInterest: totalInterest.toNumber(),
    schedule
  };
}

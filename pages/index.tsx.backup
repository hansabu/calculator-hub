import Head from 'next/head'
import Link from 'next/link'
import { Calculator, TrendingUp } from 'lucide-react'
import { AdSense } from '@/components/AdSense'

export default function Home() {
  const categories = [
    {
      title: '금융 계산기',
      icon: '💰',
      color: 'blue',
      calculators: [
        {
          name: '대출 계산기',
          desc: '원리금균등/원금균등/만기일시 상환 계산',
          href: '/finance/loan',
          icon: '🏦'
        },
        {
          name: '적금 계산기',
          desc: '단리/복리 적금 만기 금액 계산',
          href: '/finance/savings',
          icon: '💸'
        },
        {
          name: '퇴직금 계산기',
          desc: '평균임금 기반 퇴직금 자동 계산',
          href: '/finance/severance',
          icon: '📊'
        },
      ]
    },
    {
      title: '건강 계산기',
      icon: '❤️',
      color: 'pink',
      calculators: [
        {
          name: 'BMI 계산기',
          desc: '체질량지수 및 비만도 측정',
          href: '/health/bmi',
          icon: '⚖️'
        },
        {
          name: '칼로리 계산기',
          desc: '기초/활동 대사량 계산',
          href: '/health/calorie',
          icon: '🔥'
        },
      ]
    },
    {
      title: '생활 계산기',
      icon: '🏠',
      color: 'purple',
      calculators: [
        {
          name: '할인 계산기',
          desc: '단일/중복 할인 최종 가격 계산',
          href: '/life/discount',
          icon: '🏷️'
        },
      ]
    },
    {
      title: '날짜 계산기',
      icon: '📅',
      color: 'orange',
      calculators: [
        {
          name: 'D-Day 계산기',
          desc: '목표일까지 남은 날짜 계산',
          href: '/date/dday',
          icon: '⏰'
        },
      ]
    }
  ]

  return (
    <>
      <Head>
        <title>생활 계산기 허브 - 대출, 적금, BMI, 퇴직금 계산기</title>
        <meta name="description" content="일상에 필요한 모든 계산기를 한곳에서. 대출, 적금, 퇴직금, BMI, 칼로리, 디데이 등 실용 계산기 제공" />
        <meta name="keywords" content="대출계산기, 적금계산기, BMI계산기, 퇴직금계산기, 칼로리계산기, 디데이계산기, 생활계산기" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {/* 상단 광고 */}
      <div className="pt-8 pb-12 flex justify-center fade-in">
        <AdSense
          slot="2247902816"
          style={{ display: 'inline-block', width: '728px', height: '90px' }}
        />
      </div>

      {/* 헤더 섹션 */}
      <header className="page-header fade-in">
        <div className="badge mb-6">
          <TrendingUp size={16} />
          <span>빠르고 정확한 계산</span>
        </div>

        <h1 className="page-title">
          생활 계산기 허브
        </h1>

        <p className="page-subtitle">
          일상에 필요한 모든 계산을 한곳에서 간편하게
        </p>
      </header>

      {/* 메인 컨텐츠 */}
      <main className="container-custom pb-24">
        {categories.map((category, idx) => (
          <section key={idx} className="mb-32 slide-up" style={{ animationDelay: `${idx * 0.1}s` }}>
            {/* 카테고리 헤더 */}
            <div className="category-header">
              <div className="category-icon">
                {category.icon}
              </div>
              <h2 className="category-title">
                {category.title}
              </h2>
            </div>

            {/* 계산기 그리드 */}
            <div className="grid-calculators">
              {category.calculators.map((calc, calcIdx) => (
                <Link key={calcIdx} href={calc.href} className="calculator-link">
                  <div className="calculator-card">
                    <span className="calculator-icon">{calc.icon}</span>
                    <h3 className="calculator-title">{calc.name}</h3>
                    <p className="calculator-desc">{calc.desc}</p>
                  </div>
                </Link>
              ))}
            </div>

            {/* 중간 광고 (첫 번째 카테고리 이후) */}
            {idx === 0 && (
              <div className="pt-16 pb-8 flex justify-center">
                <AdSense
                  slot="2247902816"
                  format="auto"
                  responsive={true}
                  style={{ display: 'block', textAlign: 'center' }}
                />
              </div>
            )}
          </section>
        ))}

        {/* 하단 광고 */}
        <div className="pt-16 pb-12 flex justify-center">
          <AdSense
            slot="2247902816"
            format="auto"
            responsive={true}
            style={{ display: 'block', textAlign: 'center' }}
          />
        </div>
      </main>

      {/* 푸터 */}
      <footer className="text-center py-12 text-white">
        <div className="container-custom">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Calculator size={24} />
            <span className="text-lg font-semibold">생활 계산기 허브</span>
          </div>
          <p className="text-sm opacity-75">
            © 2025 Calculator Hub. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  )
}

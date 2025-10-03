import Head from 'next/head'
import Link from 'next/link'
import { DollarSign, Heart, Calculator, Calendar, TrendingUp } from 'lucide-react'
import { AdSense } from '@/components/AdSense'

export default function Home() {
  const categories = [
    {
      title: '금융 계산기',
      icon: <DollarSign className="w-6 h-6" />,
      color: 'from-blue-500 to-cyan-500',
      calculators: [
        { name: '대출 계산기', desc: '원리금균등/원금균등 상환 계산', href: '/finance/loan', icon: '💰' },
        { name: '적금 계산기', desc: '단리/복리 적금 만기 금액', href: '/finance/savings', icon: '💸' },
        { name: '퇴직금 계산기', desc: '퇴직금 및 세금 자동 계산', href: '/finance/severance', icon: '🏦' },
      ]
    },
    {
      title: '건강 계산기',
      icon: <Heart className="w-6 h-6" />,
      color: 'from-pink-500 to-rose-500',
      calculators: [
        { name: 'BMI 계산기', desc: '체질량지수 및 비만도 측정', href: '/health/bmi', icon: '⚖️' },
        { name: '칼로리 계산기', desc: '기초/활동 대사량 계산', href: '/health/calorie', icon: '🔥' },
      ]
    },
    {
      title: '생활 계산기',
      icon: <Calculator className="w-6 h-6" />,
      color: 'from-purple-500 to-indigo-500',
      calculators: [
        { name: '할인 계산기', desc: '중복할인 최종 가격 계산', href: '/life/discount', icon: '🏷️' },
      ]
    },
    {
      title: '날짜 계산기',
      icon: <Calendar className="w-6 h-6" />,
      color: 'from-orange-500 to-amber-500',
      calculators: [
        { name: 'D-Day 계산기', desc: '목표일까지 남은 시간', href: '/date/dday', icon: '📅' },
      ]
    }
  ]

  return (
    <>
      <Head>
        <title>생활 계산기 허브 - 대출, 적금, BMI, 퇴직금 계산기</title>
        <meta name="description" content="일상에 필요한 모든 계산기를 한곳에서. 대출, 적금, 퇴직금, BMI, 칼로리, 디데이 등 실용 계산기 제공" />
        <meta name="keywords" content="대출계산기, 적금계산기, BMI계산기, 퇴직금계산기, 칼로리계산기, 디데이계산기" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen">
        {/* 상단 배너 광고 */}
        <div className="py-6 flex justify-center fade-in">
          <AdSense
            slot="2247902816"
            style={{ display: 'inline-block', width: '728px', height: '90px' }}
          />
        </div>

        {/* 헤더 섹션 */}
        <header className="text-center py-12 px-4 fade-in">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-white/20 rounded-full backdrop-blur-sm">
            <TrendingUp className="w-4 h-4 text-white" />
            <span className="text-sm text-white font-medium">매일 업데이트되는 정확한 계산</span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 drop-shadow-2xl">
            생활 계산기 허브
          </h1>

          <p className="text-xl md:text-2xl text-white/90 mb-4 drop-shadow-lg max-w-3xl mx-auto">
            일상에 필요한 모든 계산을 한곳에서 간편하게
          </p>

          <p className="text-base text-white/75 max-w-2xl mx-auto drop-shadow">
            정확하고 빠른 계산으로 더 나은 결정을 내리세요
          </p>
        </header>

        {/* 메인 컨텐츠 */}
        <main className="container mx-auto px-4 pb-16 max-w-7xl">
          {categories.map((category, idx) => (
            <section key={idx} className="mb-16 slide-up" style={{ animationDelay: `${idx * 0.1}s` }}>
              {/* 카테고리 헤더 */}
              <div className="flex items-center justify-center gap-4 mb-8">
                <div className={`category-badge bg-gradient-to-br ${category.color}`}>
                  {category.icon}
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg">
                  {category.title}
                </h2>
              </div>

              {/* 계산기 그리드 */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.calculators.map((calc, calcIdx) => (
                  <Link key={calcIdx} href={calc.href}>
                    <article className="glass-effect rounded-2xl p-8 card-hover cursor-pointer group h-full">
                      <div className="flex items-start gap-4 mb-4">
                        <span className="text-4xl group-hover:scale-110 transition-transform duration-300">
                          {calc.icon}
                        </span>
                        <div className="flex-1">
                          <h3 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-purple-600 transition-colors">
                            {calc.name}
                          </h3>
                          <p className="text-gray-600 leading-relaxed">
                            {calc.desc}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-purple-600 font-semibold mt-4 group-hover:gap-4 transition-all">
                        <span>계산하기</span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            </section>
          ))}

          {/* 중간 광고 */}
          <div className="my-16 flex justify-center">
            <AdSense
              slot="6343344230"
              format="auto"
              responsive={true}
            />
          </div>

          {/* 특징 섹션 */}
          <section className="mt-20 mb-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="glass-effect rounded-2xl p-8 text-center fade-in">
                <div className="text-5xl mb-4">🎯</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">정확한 계산</h3>
                <p className="text-gray-600">최신 공식과 법률을 반영한 정확한 계산 결과</p>
              </div>

              <div className="glass-effect rounded-2xl p-8 text-center fade-in" style={{ animationDelay: '0.1s' }}>
                <div className="text-5xl mb-4">⚡</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">빠른 속도</h3>
                <p className="text-gray-600">복잡한 계산도 즉시 결과 확인 가능</p>
              </div>

              <div className="glass-effect rounded-2xl p-8 text-center fade-in" style={{ animationDelay: '0.2s' }}>
                <div className="text-5xl mb-4">📱</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">모바일 최적화</h3>
                <p className="text-gray-600">모든 기기에서 편리하게 사용 가능</p>
              </div>
            </div>
          </section>
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

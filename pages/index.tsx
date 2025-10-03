import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { Search, DollarSign, Heart, Calculator, Calendar } from 'lucide-react'
import { AdSense } from '@/components/AdSense'

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('')

  const categories = [
    {
      title: '금융 계산기',
      icon: <DollarSign className="w-6 h-6" />,
      calculators: [
        { name: '대출 계산기', desc: '원리금균등/원금균등 상환', href: '/finance/loan' },
        { name: '적금 계산기', desc: '단리/복리 적금 계산', href: '/finance/savings' },
        { name: '퇴직금 계산기', desc: '퇴직금 및 세금 계산', href: '/finance/severance' },
      ]
    },
    {
      title: '건강 계산기',
      icon: <Heart className="w-6 h-6" />,
      calculators: [
        { name: 'BMI 계산기', desc: '체질량지수 및 비만도', href: '/health/bmi' },
        { name: '칼로리 계산기', desc: '기초/활동 대사량', href: '/health/calorie' },
      ]
    },
    {
      title: '생활 계산기',
      icon: <Calculator className="w-6 h-6" />,
      calculators: [
        { name: '할인 계산기', desc: '중복할인 적용', href: '/life/discount' },
      ]
    },
    {
      title: '날짜 계산기',
      icon: <Calendar className="w-6 h-6" />,
      calculators: [
        { name: 'D-Day', desc: '목표일 카운트다운', href: '/date/dday' },
      ]
    }
  ]

  return (
    <>
      <Head>
        <title>생활 계산기 허브 - 대출, 적금, BMI, 퇴직금 계산기</title>
        <meta name="description" content="일상에 필요한 모든 계산기를 한곳에서. 대출, 적금, 퇴직금, BMI, 칼로리, 디데이 등 35개 이상의 실용 계산기 제공" />
        <meta name="keywords" content="대출계산기, 적금계산기, BMI계산기, 퇴직금계산기, 소득세계산기, 디데이계산기, 칼로리계산기" />
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

        {/* 헤더 */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">생활 계산기 허브</h1>
          <p className="text-lg text-gray-600 mb-6">일상에 필요한 모든 계산기를 한곳에서</p>

          {/* 검색창 */}
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="계산기 검색..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            {/* 카테고리별 계산기 */}
            {categories.map((category, idx) => (
              <div key={idx} className="mb-8">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  {category.icon}
                  {category.title}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {category.calculators.map((calc, calcIdx) => (
                    <Link key={calcIdx} href={calc.href}>
                      <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer bg-white">
                        <h3 className="text-xl font-semibold flex items-center gap-2 mb-2">
                          <Calculator className="w-5 h-5" />
                          {calc.name}
                        </h3>
                        <p className="text-gray-600">{calc.desc}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}

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

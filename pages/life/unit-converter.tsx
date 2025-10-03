import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { AdSense } from '@/components/AdSense';

type UnitCategory = 'length' | 'weight' | 'volume' | 'temperature';

interface UnitConversion {
  [key: string]: {
    name: string;
    toBase: (value: number) => number;
    fromBase: (value: number) => number;
  };
}

const conversions: Record<UnitCategory, UnitConversion> = {
  length: {
    mm: { name: '밀리미터', toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
    cm: { name: '센티미터', toBase: (v) => v / 100, fromBase: (v) => v * 100 },
    m: { name: '미터', toBase: (v) => v, fromBase: (v) => v },
    km: { name: '킬로미터', toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
    inch: { name: '인치', toBase: (v) => v * 0.0254, fromBase: (v) => v / 0.0254 },
    ft: { name: '피트', toBase: (v) => v * 0.3048, fromBase: (v) => v / 0.3048 },
    yard: { name: '야드', toBase: (v) => v * 0.9144, fromBase: (v) => v / 0.9144 },
    mile: { name: '마일', toBase: (v) => v * 1609.344, fromBase: (v) => v / 1609.344 },
  },
  weight: {
    mg: { name: '밀리그램', toBase: (v) => v / 1000000, fromBase: (v) => v * 1000000 },
    g: { name: '그램', toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
    kg: { name: '킬로그램', toBase: (v) => v, fromBase: (v) => v },
    t: { name: '톤', toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
    oz: { name: '온스', toBase: (v) => v * 0.0283495, fromBase: (v) => v / 0.0283495 },
    lb: { name: '파운드', toBase: (v) => v * 0.453592, fromBase: (v) => v / 0.453592 },
    don: { name: '돈', toBase: (v) => v * 0.00375, fromBase: (v) => v / 0.00375 },
    geun: { name: '근', toBase: (v) => v * 0.6, fromBase: (v) => v / 0.6 },
  },
  volume: {
    ml: { name: '밀리리터', toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
    l: { name: '리터', toBase: (v) => v, fromBase: (v) => v },
    cc: { name: 'cc', toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
    cup: { name: '컵', toBase: (v) => v * 0.2365882365, fromBase: (v) => v / 0.2365882365 },
    tbsp: { name: '테이블스푼', toBase: (v) => v * 0.0147868, fromBase: (v) => v / 0.0147868 },
    tsp: { name: '티스푼', toBase: (v) => v * 0.00492892, fromBase: (v) => v / 0.00492892 },
    gallon: { name: '갤런', toBase: (v) => v * 3.78541, fromBase: (v) => v / 3.78541 },
    hop: { name: '홉', toBase: (v) => v * 0.18039, fromBase: (v) => v / 0.18039 },
  },
  temperature: {
    c: {
      name: '섭씨',
      toBase: (v) => v,
      fromBase: (v) => v,
    },
    f: {
      name: '화씨',
      toBase: (v) => (v - 32) * 5 / 9,
      fromBase: (v) => (v * 9 / 5) + 32,
    },
    k: {
      name: '켈빈',
      toBase: (v) => v - 273.15,
      fromBase: (v) => v + 273.15,
    },
  },
};

const categoryNames: Record<UnitCategory, string> = {
  length: '길이',
  weight: '무게',
  volume: '부피',
  temperature: '온도',
};

export default function UnitConverter() {
  const [category, setCategory] = useState<UnitCategory>('length');
  const [fromUnit, setFromUnit] = useState('m');
  const [toUnit, setToUnit] = useState('ft');
  const [inputValue, setInputValue] = useState('');
  const [result, setResult] = useState<number | null>(null);

  const handleConvert = () => {
    if (!inputValue || isNaN(Number(inputValue))) return;

    const value = Number(inputValue);
    const fromConversion = conversions[category][fromUnit];
    const toConversion = conversions[category][toUnit];

    if (!fromConversion || !toConversion) return;

    const baseValue = fromConversion.toBase(value);
    const convertedValue = toConversion.fromBase(baseValue);
    setResult(convertedValue);
  };

  const handleCategoryChange = (newCategory: UnitCategory) => {
    setCategory(newCategory);
    const units = Object.keys(conversions[newCategory]);
    setFromUnit(units[0]);
    setToUnit(units[1] || units[0]);
    setInputValue('');
    setResult(null);
  };

  const formatNumber = (num: number) => {
    if (num === 0) return '0';
    if (Math.abs(num) < 0.0001 || Math.abs(num) >= 1000000) {
      return num.toExponential(6);
    }
    return num.toFixed(6).replace(/\.?0+$/, '');
  };

  return (
    <>
      <Head>
        <title>단위 변환기 - 생활 계산기</title>
        <meta name="description" content="길이, 무게, 부피, 온도 등 다양한 단위를 쉽게 변환하세요" />
      </Head>

      <div className="min-h-screen pb-12">
        {/* 상단 광고 */}
        <div className="pt-8 pb-12 flex justify-center fade-in">
          <AdSense slot="2247902816" style={{ display: 'inline-block', width: '728px', height: '90px' }} />
        </div>

        {/* 헤더 */}
        <header className="page-header fade-in">
          <Link href="/" className="back-button">
            <ArrowLeft size={20} />
            <span>홈으로</span>
          </Link>
          <h1 className="page-title">📏 단위 변환기</h1>
          <p className="page-subtitle">길이, 무게, 부피, 온도 등 다양한 단위를 간편하게 변환하세요</p>
        </header>

        {/* 메인 컨텐츠 */}
        <main className="container-custom">

          {/* 카테고리 선택 */}
          <div className="glass-card mb-12 slide-up">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">변환 유형</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {(Object.keys(categoryNames) as UnitCategory[]).map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`px-4 py-6 rounded-xl font-bold text-6xl transition-all ${
                    category === cat
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                      : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-purple-300'
                  }`}
                >
                  {categoryNames[cat]}
                </button>
              ))}
            </div>
          </div>

          {/* 변환 입력 */}
          <div className="glass-card mb-12 slide-up" style={{ animationDelay: '0.1s' }}>
            <div className="grid md:grid-cols-2 gap-20 relative">
              {/* From */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  변환할 단위
                </label>
                <select
                  value={fromUnit}
                  onChange={(e) => setFromUnit(e.target.value)}
                  className="input-field mb-3"
                >
                  {Object.entries(conversions[category]).map(([key, { name }]) => (
                    <option key={key} value={key}>
                      {name}
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  value={inputValue}
                  onChange={(e) => {
                    setInputValue(e.target.value);
                    setResult(null);
                  }}
                  placeholder="값을 입력하세요"
                  className="input-field"
                />
              </div>

              {/* 구분선 */}
              <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gray-300 to-transparent transform -translate-x-1/2"></div>

              {/* To */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  변환될 단위
                </label>
                <select
                  value={toUnit}
                  onChange={(e) => setToUnit(e.target.value)}
                  className="input-field mb-3"
                >
                  {Object.entries(conversions[category]).map(([key, { name }]) => (
                    <option key={key} value={key}>
                      {name}
                    </option>
                  ))}
                </select>
                {result !== null && (
                  <div className="result-card result-card-purple">
                    <div className="text-sm text-gray-600 mb-1">변환 결과</div>
                    <div className="text-3xl font-bold text-purple-600">
                      {formatNumber(result)}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* 변환 버튼 */}
            <button
              onClick={handleConvert}
              className="btn btn-primary w-full mt-6"
            >
              변환하기
            </button>
          </div>

          {/* 자주 사용하는 변환 예시 */}
          <div className="glass-card slide-up" style={{ animationDelay: '0.2s' }}>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              💡 자주 사용하는 변환
            </h3>
            <div className="space-y-2 text-sm text-gray-600">
              {category === 'length' && (
                <>
                  <p>• 1인치 = 2.54cm</p>
                  <p>• 1피트 = 30.48cm</p>
                  <p>• 1마일 = 1.609km</p>
                </>
              )}
              {category === 'weight' && (
                <>
                  <p>• 1근 = 600g</p>
                  <p>• 1돈 = 3.75g</p>
                  <p>• 1파운드 = 453.6g</p>
                </>
              )}
              {category === 'volume' && (
                <>
                  <p>• 1컵 = 236.6ml</p>
                  <p>• 1테이블스푼 = 14.8ml</p>
                  <p>• 1갤런 = 3.785L</p>
                </>
              )}
              {category === 'temperature' && (
                <>
                  <p>• 물의 어는점: 0°C = 32°F = 273.15K</p>
                  <p>• 물의 끓는점: 100°C = 212°F = 373.15K</p>
                  <p>• 체온: 36.5°C = 97.7°F</p>
                </>
              )}
            </div>
          </div>

          {/* 중간 광고 */}
          <div className="pt-16 pb-12">
            <AdSense slot="2247902816" format="auto" responsive={true} />
          </div>
        </main>

        {/* 하단 광고 */}
        <div className="pt-16 pb-12 flex justify-center">
          <AdSense slot="2247902816" format="auto" responsive={true} />
        </div>
      </div>
    </>
  );
}

import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';

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

      <div className="min-h-screen py-12 px-4">
        <div className="max-w-2xl mx-auto">
          {/* 헤더 */}
          <div className="text-center mb-8">
            <Link href="/" className="inline-block mb-4 text-purple-600 hover:text-purple-700 transition-colors">
              ← 홈으로
            </Link>
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              단위 변환기
            </h1>
            <p className="text-gray-600">
              길이, 무게, 부피, 온도 등 다양한 단위를 간편하게 변환하세요
            </p>
          </div>

          {/* 카테고리 선택 */}
          <div className="glass-card mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              변환 유형
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {(Object.keys(categoryNames) as UnitCategory[]).map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`px-4 py-3 rounded-xl font-medium transition-all ${
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
          <div className="glass-card mb-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* From */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  변환할 단위
                </label>
                <select
                  value={fromUnit}
                  onChange={(e) => setFromUnit(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent mb-3"
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
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              {/* To */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  변환될 단위
                </label>
                <select
                  value={toUnit}
                  onChange={(e) => setToUnit(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent mb-3"
                >
                  {Object.entries(conversions[category]).map(([key, { name }]) => (
                    <option key={key} value={key}>
                      {name}
                    </option>
                  ))}
                </select>
                {result !== null && (
                  <div className="w-full px-4 py-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border-2 border-purple-200">
                    <div className="text-2xl font-bold text-purple-600">
                      {formatNumber(result)}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* 변환 버튼 */}
            <button
              onClick={handleConvert}
              className="w-full mt-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-200 hover:scale-[1.02]"
            >
              변환하기
            </button>
          </div>

          {/* 자주 사용하는 변환 예시 */}
          <div className="glass-card">
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
        </div>
      </div>
    </>
  );
}

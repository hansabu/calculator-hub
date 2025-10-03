import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { AdSense } from '@/components/AdSense';

interface City {
  name: string;
  country: string;
  timezone: string;
  offset: number; // UTC 기준 시간 차이 (시간 단위)
}

const cities: City[] = [
  // 아시아
  { name: '서울', country: '대한민국', timezone: 'Asia/Seoul', offset: 9 },
  { name: '도쿄', country: '일본', timezone: 'Asia/Tokyo', offset: 9 },
  { name: '베이징', country: '중국', timezone: 'Asia/Shanghai', offset: 8 },
  { name: '홍콩', country: '중국', timezone: 'Asia/Hong_Kong', offset: 8 },
  { name: '싱가포르', country: '싱가포르', timezone: 'Asia/Singapore', offset: 8 },
  { name: '방콕', country: '태국', timezone: 'Asia/Bangkok', offset: 7 },
  { name: '하노이', country: '베트남', timezone: 'Asia/Ho_Chi_Minh', offset: 7 },
  { name: '델리', country: '인도', timezone: 'Asia/Kolkata', offset: 5.5 },
  { name: '두바이', country: 'UAE', timezone: 'Asia/Dubai', offset: 4 },

  // 유럽
  { name: '런던', country: '영국', timezone: 'Europe/London', offset: 0 },
  { name: '파리', country: '프랑스', timezone: 'Europe/Paris', offset: 1 },
  { name: '베를린', country: '독일', timezone: 'Europe/Berlin', offset: 1 },
  { name: '로마', country: '이탈리아', timezone: 'Europe/Rome', offset: 1 },
  { name: '마드리드', country: '스페인', timezone: 'Europe/Madrid', offset: 1 },
  { name: '암스테르담', country: '네덜란드', timezone: 'Europe/Amsterdam', offset: 1 },
  { name: '모스크바', country: '러시아', timezone: 'Europe/Moscow', offset: 3 },

  // 미주
  { name: '뉴욕', country: '미국', timezone: 'America/New_York', offset: -5 },
  { name: '로스앤젤레스', country: '미국', timezone: 'America/Los_Angeles', offset: -8 },
  { name: '시카고', country: '미국', timezone: 'America/Chicago', offset: -6 },
  { name: '라스베이거스', country: '미국', timezone: 'America/Los_Angeles', offset: -8 },
  { name: '샌프란시스코', country: '미국', timezone: 'America/Los_Angeles', offset: -8 },
  { name: '토론토', country: '캐나다', timezone: 'America/Toronto', offset: -5 },
  { name: '밴쿠버', country: '캐나다', timezone: 'America/Vancouver', offset: -8 },
  { name: '멕시코시티', country: '멕시코', timezone: 'America/Mexico_City', offset: -6 },

  // 오세아니아
  { name: '시드니', country: '호주', timezone: 'Australia/Sydney', offset: 11 },
  { name: '멜버른', country: '호주', timezone: 'Australia/Melbourne', offset: 11 },
  { name: '오클랜드', country: '뉴질랜드', timezone: 'Pacific/Auckland', offset: 13 },
];

export default function TimezoneCalculator() {
  const [selectedCity, setSelectedCity] = useState(cities[0]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [flightHours, setFlightHours] = useState('');
  const [flightMinutes, setFlightMinutes] = useState('');
  const [arrivalTime, setArrivalTime] = useState<Date | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getTimeInCity = (city: City, baseTime: Date = currentTime): Date => {
    const utcTime = baseTime.getTime() + baseTime.getTimezoneOffset() * 60000;
    return new Date(utcTime + city.offset * 3600000);
  };

  const calculateTimeDifference = (city: City): string => {
    const seoulOffset = 9;
    const diff = city.offset - seoulOffset;

    if (diff === 0) return '시차 없음';
    if (diff > 0) return `서울보다 ${diff}시간 빠름`;
    return `서울보다 ${Math.abs(diff)}시간 느림`;
  };

  const calculateArrival = () => {
    if (!flightHours && !flightMinutes) return;

    const hours = parseInt(flightHours || '0');
    const minutes = parseInt(flightMinutes || '0');
    const totalMinutes = hours * 60 + minutes;

    const departure = new Date();
    const arrival = new Date(departure.getTime() + totalMinutes * 60000);
    setArrivalTime(getTimeInCity(selectedCity, arrival));
  };

  const formatTime = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  const formatDate = (date: Date): string => {
    const days = ['일', '월', '화', '수', '목', '금', '토'];
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const dayOfWeek = days[date.getDay()];

    return `${year}년 ${month}월 ${day}일 (${dayOfWeek})`;
  };

  const formatTimeOnly = (date: Date): string => {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${hours}:${minutes}:${seconds}`;
  };

  const cityTime = getTimeInCity(selectedCity);

  return (
    <>
      <Head>
        <title>해외여행 시차 계산기 - 날짜 계산기</title>
        <meta name="description" content="세계 주요 도시의 현재 시간과 시차를 확인하고 비행시간을 고려한 도착시간을 계산하세요" />
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
          <h1 className="page-title">🌍 해외여행 시차 계산기</h1>
          <p className="page-subtitle">세계 주요 도시의 현재 시간과 시차를 확인하세요</p>
        </header>

        {/* 메인 컨텐츠 */}
        <main className="container-custom">

          <div className="grid md:grid-cols-2 gap-6 mb-12 slide-up">
            {/* 서울 시간 */}
            <div className="result-card result-card-blue">
              <div className="text-center">
                <div className="text-sm text-gray-600 mb-2">🇰🇷 서울 (대한민국)</div>
                <div className="text-3xl font-bold text-gray-800 mb-1">
                  {formatTimeOnly(currentTime)}
                </div>
                <div className="text-sm text-gray-500">
                  {formatDate(currentTime)}
                </div>
              </div>
            </div>

            {/* 선택한 도시 시간 */}
            <div className="result-card result-card-purple">
              <div className="text-center">
                <div className="text-sm text-gray-600 mb-2">
                  {selectedCity.name} ({selectedCity.country})
                </div>
                <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-1">
                  {formatTimeOnly(cityTime)}
                </div>
                <div className="text-sm text-gray-500 mb-2">
                  {formatDate(cityTime)}
                </div>
                <div className="text-sm font-medium text-purple-600">
                  {calculateTimeDifference(selectedCity)}
                </div>
              </div>
            </div>
          </div>

          {/* 도시 선택 */}
          <div className="glass-card mb-12 slide-up" style={{ animationDelay: '0.1s' }}>
            <h2 className="text-2xl font-bold mb-6 text-gray-900">도시 선택</h2>
            <select
              value={cities.indexOf(selectedCity)}
              onChange={(e) => {
                setSelectedCity(cities[parseInt(e.target.value)]);
                setArrivalTime(null);
              }}
              className="input-field"
            >
              {cities.map((city, index) => (
                <option key={index} value={index}>
                  {city.name} ({city.country}) - UTC{city.offset >= 0 ? '+' : ''}{city.offset}
                </option>
              ))}
            </select>
          </div>

          {/* 비행시간 계산 */}
          <div className="glass-card mb-12 slide-up" style={{ animationDelay: '0.2s' }}>
            <h2 className="text-2xl font-bold mb-6 text-gray-900">✈️ 도착 시간 계산</h2>
            <div className="grid md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  비행시간 (시간)
                </label>
                <input
                  type="number"
                  value={flightHours}
                  onChange={(e) => setFlightHours(e.target.value)}
                  placeholder="0"
                  min="0"
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  비행시간 (분)
                </label>
                <input
                  type="number"
                  value={flightMinutes}
                  onChange={(e) => setFlightMinutes(e.target.value)}
                  placeholder="0"
                  min="0"
                  max="59"
                  className="input-field"
                />
              </div>
              <div className="flex items-end">
                <button
                  onClick={calculateArrival}
                  className="btn btn-primary w-full"
                >
                  계산하기
                </button>
              </div>
            </div>

            {arrivalTime && (
              <div className="result-card result-card-pink mt-4">
                <div className="text-sm text-gray-600 mb-1">현지 도착 시간</div>
                <div className="text-3xl font-bold text-pink-600">
                  {formatTime(arrivalTime)}
                </div>
              </div>
            )}
          </div>

          {/* 주요 도시 시간 목록 */}
          <div className="glass-card slide-up" style={{ animationDelay: '0.3s' }}>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              🌐 주요 도시 현재 시간
            </h3>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {cities.map((city, index) => {
                const time = getTimeInCity(city);
                return (
                  <div
                    key={index}
                    onClick={() => setSelectedCity(city)}
                    className={`flex justify-between items-center p-3 rounded-lg cursor-pointer transition-all ${
                      selectedCity === city
                        ? 'bg-gradient-to-r from-purple-100 to-pink-100 border-2 border-purple-300'
                        : 'bg-white hover:bg-gray-50 border border-gray-200'
                    }`}
                  >
                    <div>
                      <div className="font-medium text-gray-800">
                        {city.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {city.country}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-gray-800">
                        {formatTimeOnly(time)}
                      </div>
                      <div className="text-xs text-gray-500">
                        UTC{city.offset >= 0 ? '+' : ''}{city.offset}
                      </div>
                    </div>
                  </div>
                );
              })}
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

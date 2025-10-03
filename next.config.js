/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // 정적 HTML 내보내기 (Cloudflare Pages 호환)
  images: {
    unoptimized: true  // Cloudflare Pages에서 이미지 최적화 불가
  },
  trailingSlash: true,
  eslint: {
    ignoreDuringBuilds: true
  }
};

module.exports = nextConfig;

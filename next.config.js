/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export', // 這是最重要的一行，讓 next export 有作用
    images: {
      unoptimized: true // Firebase Hosting 不支援 Image Optimization
    }
  };
  
  module.exports = nextConfig;
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true // 這是為了讓 Firebase Hosting 可顯示圖片，Vercel 可以移除
  },
};

module.exports = nextConfig;
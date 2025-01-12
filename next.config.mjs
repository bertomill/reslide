/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [],
    unoptimized: true
  },
  experimental: {
    optimizeCss: true
  }
}

export default nextConfig 
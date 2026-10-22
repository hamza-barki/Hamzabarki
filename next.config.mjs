/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    qualities: [75, 85, 90, 92],
  },
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
  async redirects() {
    return [
      {
        source: '/projects/hadi-market-pos',
        destination: '/projects/al-madina-pos',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

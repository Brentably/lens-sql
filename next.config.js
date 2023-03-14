/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: false,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/querySql',
        permanent: true,
      }
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ipfs.io',
        port: '',
        pathname: '/ipfs/**',
      },
    ],
  },
}

// module.exports = nextConfig



const nextEnv = require('next-env');
const dotenvLoad = require('dotenv-load');
 
dotenvLoad('.env');

 
const withNextEnv = nextEnv();
 
module.exports = withNextEnv(nextConfig);
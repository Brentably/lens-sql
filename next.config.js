/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: false,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/home',
        permanent: true,
      }
    ]
  }
}

// module.exports = nextConfig



const nextEnv = require('next-env');
const dotenvLoad = require('dotenv-load');
 
dotenvLoad('.env');

 
const withNextEnv = nextEnv();
 
module.exports = withNextEnv(nextConfig);
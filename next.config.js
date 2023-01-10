/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: false,
}

// module.exports = nextConfig



const nextEnv = require('next-env');
const dotenvLoad = require('dotenv-load');
 
dotenvLoad('.env.local');

 
const withNextEnv = nextEnv();
 
module.exports = withNextEnv(nextConfig);
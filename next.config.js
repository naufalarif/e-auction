/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    DATABASE_URL: 'mysql://root:root12345@localhost:3306/ecommerce',
    MYSQL_HOST: 'localhost',
    MYSQL_PORT: 3306,
    MYSQL_DATABASE: 'ecommerce',
    MYSQL_USER: 'root',
    MYSQL_PASSWORD: 'root12345',
    JWT_SECRET: 'secretsss',
    JWT_EXPIRES_IN: '1 day',
    
  }
}

module.exports = nextConfig

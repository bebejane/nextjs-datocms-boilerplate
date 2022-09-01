const withBundleAnalyzer = require('@next/bundle-analyzer')({enabled: process.env.ANALYZE === 'true'})

const sassOptions = {
  includePaths: ['./components', './pages'],
  prependData: `
    @use "sass:math";
    @import "./styles/partials/mediaqueries"; 
    @import "./styles/partials/styles";
    @import "./styles/partials/variables";
    @import "./styles/partials/fonts";
  `
}
const nextOptions = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  devIndicators: {
    buildActivity: false
  },
  experimental: {
    scrollRestoration: true
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(graphql|gql)$/,
      exclude: /node_modules/,
      loader: 'graphql-tag/loader',
    });
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    })
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    })
    config.resolve.fallback = { fs: false, dns:false, net:false };
    return config;
  },
}

const config = { sassOptions, ...nextOptions }
module.exports = withBundleAnalyzer(config);
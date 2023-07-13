/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images : {
    domains: ["tecblic-nft-marketplace.infura-ipfs.io", "infura-ipfs.io"],
    // domains: ['vaibhav-haha.infura-ipfs.io','infura-ipfs.io'],
  },
};

module.exports = nextConfig

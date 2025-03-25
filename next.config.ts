import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      // Add other domains you use here
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com', // if you use Firebase Storage
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com', // if you use Google user photos
      },
    ],
  },
};

export default nextConfig;

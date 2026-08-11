import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images : {
    remotePatterns : [
      {
        protocol: 'https',
        hostname:'www.google.com',
      },{
        protocol: 'https',
        hostname:'covers.openlibrary.org',
      },{
        protocol: 'https',
        hostname:'lh3.googleusercontent.com',
      }
    ]
  }
};

export default nextConfig;

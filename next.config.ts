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
      }
    ]
  }
};

export default nextConfig;

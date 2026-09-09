/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Media is served from a public Cloudflare R2 bucket behind anorcorp.com
    remotePatterns: [{ protocol: "https", hostname: "anorcorp.com", pathname: "/**" }],
  },
};

export default nextConfig;

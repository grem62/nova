/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    qualities: [75, 90, 100],
    formats: ["image/avif", "image/webp"],
  },
  poweredByHeader: false,
  compress: true,
  allowedDevOrigins: [
    "http://localhost:3000",
    "http://192.168.0.31:3000"
  ]
};

export default nextConfig;

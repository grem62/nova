/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: { qualities: [75, 90, 100] },
  allowedDevOrigins: [
    "http://localhost:3000",
    "http://192.168.0.31:3000"
  ]
};

export default nextConfig;

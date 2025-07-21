/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (isServer) {
      // ✅ Prevent bundling googleapis into the client build
      config.externals.push("googleapis");
    }
    return config;
  },
};

export default nextConfig;

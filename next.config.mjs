/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (isServer) {
      // ✅ Don't bundle googleapis for client build
      config.externals.push("googleapis");
    }
    return config;
  },
};

export default nextConfig;

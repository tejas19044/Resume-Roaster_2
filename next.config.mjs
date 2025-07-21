/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (isServer) {
      // ✅ Don't bundle googleapis on the client
      config.externals.push("googleapis");
    }
    return config;
  },
};

export default nextConfig;

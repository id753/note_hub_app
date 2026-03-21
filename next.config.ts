import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "ac.goit.global" },
      { protocol: "https", hostname: "picsum.photos" },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**", // Разрешаем все пути внутри этого домена
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;

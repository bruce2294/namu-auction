import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";
const basePath =
  process.env.NEXT_PUBLIC_BASE_PATH !== undefined
    ? process.env.NEXT_PUBLIC_BASE_PATH
    : isProd
    ? "/namu-auction"
    : "";

const nextConfig: NextConfig = {
  output: "export",
  basePath: basePath,
  assetPrefix: basePath,
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;

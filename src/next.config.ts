import type { NextConfig } from "next";

// src/next.config.js
const repoName = process.env.GITHUB_REPOSITORY?.split("/")[1] || "";

const nextConfig: NextConfig = {
    output: 'export',
    distDir: '../out',
    basePath: repoName ? `/${repoName}` : "",
    assetPrefix: repoName ? `/${repoName}/` : "",
    images: { unoptimized: true },
    trailingSlash: true,    
};

export default nextConfig;

import type { NextConfig } from "next";

const repoName = process.env.GITHUB_REPOSITORY?.split("/")[1] || "";

// src/next.config.js
const nextConfig: NextConfig = {
    output: 'export',
    distDir: 'out',
    basePath: repoName ? `/${repoName}` : "",
    assetPrefix: repoName ? `/${repoName}/` : "",
    images: { unoptimized: true },
    trailingSlash: true,    
};

export default nextConfig;

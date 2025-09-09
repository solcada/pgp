import type { NextConfig } from "next";

const base = process.env.BASE_PATH || '';

const nextConfig: NextConfig = {
    output: 'export',
    distDir: '../out',
    basePath: base,                 // e.g. "/your-repo"
    assetPrefix: base ? `${base}/` : '',
    images: { unoptimized: true },  // needed for static export
    trailingSlash: true,            // avoids 404 on refresh
};

export default nextConfig;

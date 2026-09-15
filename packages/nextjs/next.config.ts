import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  devIndicators: false,
  typescript: {
    ignoreBuildErrors: true,
  },
  turbopack: {
    // @coinbase/cdp-sdk (pulled in transitively by RainbowKit's Base Account
    // connector) dynamically imports these x402 payment packages by literal
    // string, but they're genuinely optional and never installed. Turbopack
    // still tries to statically resolve them at build time, so alias them to
    // an empty stub module instead.
    resolveAlias: {
      "@x402/core": "./stubs/empty-module.ts",
      "@x402/core/client": "./stubs/empty-module.ts",
      "@x402/evm": "./stubs/empty-module.ts",
      "@x402/evm/exact/client": "./stubs/empty-module.ts",
      "@x402/evm/upto/client": "./stubs/empty-module.ts",
      "@x402/svm": "./stubs/empty-module.ts",
      "@x402/svm/exact/client": "./stubs/empty-module.ts",
      "@x402/svm/upto/client": "./stubs/empty-module.ts",
    },
  },
};

const isIpfs = process.env.NEXT_PUBLIC_IPFS_BUILD === "true";

if (isIpfs) {
  nextConfig.output = "export";
  nextConfig.trailingSlash = true;
  nextConfig.images = {
    unoptimized: true,
  };
}

module.exports = nextConfig;

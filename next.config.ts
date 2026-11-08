import type { NextConfig } from 'next';
// Relative on purpose: the @/ alias may not resolve when the config loads
import { OLD_URL_REDIRECTS } from './src/lib/redirects';

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  redirects: async () =>
    OLD_URL_REDIRECTS.map((redirect) => ({ ...redirect, permanent: true })),
};

export default nextConfig;

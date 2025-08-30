import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    devIndicators: false,
    images: {
      dangerouslyAllowSVG: true,
      contentDispositionType: "attachment",
      contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
      minimumCacheTTL: 60,
      remotePatterns: [
        {
          protocol: "https",
          hostname: "**",
        },
      ],
      formats: ["image/webp"],
   
    },
    eslint: {
      ignoreDuringBuilds: true,
    },
    async rewrites() {
    return [
      {
        source: '/api/tips/:path*',
        destination: `${process.env.WINTIPS_DOMAIN}/wp-json/get/tips/:path*`,
      },
    ];
  },
    env: {
      API_DOMAIN: "https://theme.168dev.com",
      WINTIPS_DOMAIN: "https://wintips.com",
      SITE_NAME: "Football Theme"
    },
  };


export default withNextIntl(nextConfig);

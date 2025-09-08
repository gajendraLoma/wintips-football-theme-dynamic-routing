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
 
    env: {
      HOME_URL: "https://theme.168dev.com",
      API: "https://theme.168dev.com",
      WINTIPS_HOME_URL: "https://wintips.com",
      SITE_NAME: "FootballTheme",
      BETNOW_URL: "/bet-now",
    },



  };


export default withNextIntl(nextConfig);
 
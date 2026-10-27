/** @type {import('next').NextConfig} */
const nextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  async redirects() {
    return [
      {
        source: "/product/:slug",
        destination: "/products/:slug",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

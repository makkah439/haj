/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",

  reactStrictMode: true,
  poweredByHeader: false,

  images: {
    unoptimized: true,

    remotePatterns: [
      // Uploaded projects media lives in Vercel Blob storage, not in /public.
      { protocol: "https", hostname: "*.public.blob.vercel-storage.com" },
    ],
  },
};

export default nextConfig;

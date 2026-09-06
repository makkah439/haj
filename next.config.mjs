/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    remotePatterns: [
      // Uploaded projects media lives in Vercel Blob storage, not in /public.
      { protocol: 'https', hostname: '*.public.blob.vercel-storage.com' }
    ]
  }
};

export default nextConfig;

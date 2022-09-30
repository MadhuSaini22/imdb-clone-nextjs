/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["image.tmdb.org","upload.wikimedia.org","t4.ftcdn.net","previews.123rf.com","e7.pngegg.com","as1.ftcdn.net","cdni.iconscout.com","www.pngfind.com","img.lovepik.com","toppng.com","png.pngtree.com"],
  },
};

module.exports = nextConfig;

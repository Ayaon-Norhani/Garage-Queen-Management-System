/** @type {import('next').NextConfig} */
const nextConfig = {
env: {
    // NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: "********",
    // NEXT_PUBLIC_CLOUDINARY_PRESET_NAME:"********"
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME:"dyyqzhpji",
    CLOUDINARY_API_KEY:"413333377126613",
    CLOUDINARY_API_SECRET:"JJ0qmaYRVaJU2kiOFlbKlzC9Sic",
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
      },
    ],
  },
};

export default nextConfig;

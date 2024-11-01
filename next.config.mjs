/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.pinimg.com',
        port: '',
        pathname: '/**', // Esto permite cualquier ruta bajo i.pinimg.com
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com', // Agrega el dominio de Cloudinary
        port: '',
        pathname: '/**', // Esto permite cualquier ruta bajo res.cloudinary.com
      },
    ],
  },
};

export default nextConfig;

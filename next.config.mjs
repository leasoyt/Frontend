/** @type {import('next').NextConfig} */
const nextConfig = {
  env:{
    AUTH0_BASE_URL: process.env.AUTH0_BASE_URL,
    AUTH0_ISSUER_BASE_URL: process.env.AUTH0_ISSUER_BASE_URL,
    AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
    AUTH0_SCOPE: process.env.AUTH0_SCOPE,
  },
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

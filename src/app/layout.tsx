import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
// import Navbar from "@/components/Navbar/Navbar";
import { Inter } from "next/font/google";
import Footer from "@/components/Footer/Footer";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import Navbar from "@/components/Navbar/Navbar";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "800"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Rest0 - Gestión de restaurantes",
  description:
    "Una herramienta avanzada para mejorar la gestión de órdenes en restaurantes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>RestO - Gestión de restaurantes</title>
        <link rel="icon" href="/Rest0Icon.png" type="image/png" />
      </head>
      <UserProvider loginUrl="/foo/api/auth/login" profileUrl="/foo/api/auth/me">
      <body
        className={`${inter.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
       
           <Navbar/> 
          {children}
           <Footer/> 
      </body>
      </UserProvider>
 
    </html>
  );
}

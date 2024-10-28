'use client'
import Footer from '@/components/Footer/Footer';
import NavbarUsuario from '@/components/NavbarUsuario/NavbarUsuario';
import Suggestions from '@/components/Suggestions/Suggestion';
import { CategoryButtonProps, IUserSession, OptionCardProps, PromoCardProps, SuggestionCardProps } from '@/interfaces/Interfaces.types';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const UserView = () => {
  const router = useRouter();
  const [userData, setUserData] = useState<IUserSession | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const aux = JSON.parse(localStorage.getItem("userSession")!);
      setUserData(aux);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!loading) {
      if (!userData?.token) {
        router.push("/login");
      }
    }
  }, [loading, userData, router]);

  if (loading) return <div>Loading...</div>;
  return (
    <>
      <NavbarUsuario />
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center pb-24 pt-24">
        
        <div className="max-w-7xl mx-auto p-4 bg-white w-full">

          {/* Sección de sugerencias */}
          <section className="mb-8 items-center">
            <Suggestions/>
          </section>
        </div>
      </div>
      <Footer/>
    </>
  );
}


// Componente para categorías
function CategoryButton({ name, color }:CategoryButtonProps) {
  return (
    <button className={`p-4 rounded-lg text-white font-semibold ${color}`}>
      {name}
    </button>
  );
}


export default UserView;

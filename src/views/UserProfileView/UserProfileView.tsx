"use client";

import React from "react";
import Image from "next/image";

interface UserProfileProps {
  user: {
    name: string;
    email: string;
    country: string;
    profile_image: string;
  } | null;
}

const UserProfileView: React.FC<UserProfileProps> = ({ user }) => {
  if (!user) {
    return <div className="text-lg font-semibold">No se encontró información del usuario.</div>;
  }

  return (
    <div className="flex flex-col items-center space-y-4">
      <Image
        src={user.profile_image}
        alt="Imagen de perfil"
        width={120}
        height={120}
        className="rounded-full"
        priority
      />
      <p className="text-lg font-semibold text-gray-800">
        <strong>Nombre:</strong> {user.name}
      </p>
      <p className="text-lg font-semibold text-gray-800">
        <strong>Email:</strong> {user.email}
      </p>
      <p className="text-lg font-semibold text-gray-800">
        <strong>País:</strong> {user.country}
      </p>
    </div>
  );
};

export default UserProfileView;


"use client";
import Image from "next/image";
import Link from "next/link";
import DropDownButton from "./DropDownButton";

const NavbarUsuario = () => {

  return (
    <nav className="bg-white p-4">
      <div className="container mx-auto flex justify-between items-center mt-6 max-w-5xl">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/Rest0logo.png"
            alt="Logo"
            width={32}
            height={32}
            className="mr-2"
          />
          <p className="font-extrabold text-[24px] text-black">Rest0</p>
        </Link>

        {/* Profile Dropdown */}
        <DropDownButton showLoginIfNoUser={true}/>
      </div>

      <hr className="w-4/5 mx-auto mt-4 border-2" />
    </nav>
  );
};

export default NavbarUsuario;

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Footer from "@/components/General/Footer/Footer"
import NavbarManager from "@/components/ManagerDash/NavbarManager"
import { useLocalStorage } from "@/helpers/auth-helpers/useLocalStorage";
import { fetchRestaurantData } from "@/helpers/manager/fetch-restaurant-data";
import { IUser } from "@/interfaces/user.interface";
import React from "react";
import { useEffect, useState } from "react"
import { UserRole } from "@/enums/role.enum";
import { AuthErrorHelper } from "@/helpers/errors/auth-error-helper";
import Unauthorized from "@/components/General/Unauthorized/Unauthorized";
import { Pages } from "@/enums/pages.enum";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [restId, setRestId] = useLocalStorage("restaurant", "");
  const [iuser, setUser] = useLocalStorage("userSession", "");
  const user: Partial<IUser> = iuser.user;
  const [isAllowed, setIsAllowed] = useState(true);

  useEffect(() => {

    if (user === null || user === undefined || !(user.role === UserRole.MANAGER)) {
      setIsAllowed(false);

    } else {

      const fetchThis = async () => {
        try {

          const id = await fetchRestaurantData();

          setRestId(id);

        } catch (error: any) {
          AuthErrorHelper(error);

        }
      };

      fetchThis();
    }

  }, [setRestId, user]);

  if (!isAllowed) return (<Unauthorized />);

  return (
    <>
      {isAllowed ?
        <section className="flex flex-col min-h-screen bg-white">
          <div className="top-0">
            <NavbarManager />
          </div>
          <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 bg-white z-0">
            {children}
          </main>
          <Footer />
        </section>
        :
        <Unauthorized redirect={Pages.LOGIN} />
      }
    </>
  );
}
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Footer from "@/components/Footer/Footer"
import NavbarAdmin from "@/components/NavbarAdmin/NavbarAdmin"
import { HttpMessagesEnum } from "@/enums/httpMessages.enum";
import { useLocalStorage } from "@/helpers/auth-helpers/useLocalStorage";
import { ErrorHelper } from "@/helpers/errors/error-helper";
import { fetchRestaurantData } from "@/helpers/manager/fetch-restaurant-data";
import { swalNotifyError } from "@/helpers/swal/swal-notify-error";
import { IUser } from "@/interfaces/user.interface";
import React from "react";
import { useEffect, useState } from "react"
import Unauthorized from "../unauthorized";
import { UserRole } from "@/enums/role.enum";
import { AuthErrorHelper } from "@/helpers/errors/auth-error-helper";
import { Pages } from "@/enums/pages.enum";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [restId, setRestId] = useLocalStorage("restaurant", "");
  const [iuser, setUser] = useLocalStorage("userSession", "");
  const user: Partial<IUser> = iuser.user;
  const [isAllowed, setIsAllowed] = useState(true);

  useEffect(() => {

    if (user === null || user === undefined || !(user.role === UserRole.MANAGER)) {
      setIsAllowed(false);

      swalNotifyError(new ErrorHelper(HttpMessagesEnum.INSUFFICIENT_PERMISSIONS, "")).then((result) => {

        if (result.isConfirmed) {
          window.location.href = Pages.SEARCH;
        }
      });

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

  return (
    <>
      {isAllowed ?
        <section className="flex flex-col min-h-screen bg-white">
          <div className="top-0">
            <NavbarAdmin />
          </div>
          <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 bg-white z-0">
            {children}
          </main>
          <Footer />
        </section>
        :
        <Unauthorized/>
      }
    </>
  );
}
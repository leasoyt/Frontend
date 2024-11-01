/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Footer from "@/components/Footer/Footer"
import NavbarAdmin from "@/components/NavbarAdmin/NavbarAdmin"
import { HttpMessagesEnum } from "@/enums/httpMessages.enum";
import { useLocalStorage } from "@/helpers/auth-helpers/useLocalStorage";
import { ErrorHelper } from "@/helpers/error-helper";
import { fetchRestaurantData } from "@/helpers/manager/fetch-restaurant-data";
import { swalNotifyError } from "@/helpers/swal-notify-error";
import React from "react";
import { useEffect, useState } from "react"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [restId, setRestId] = useLocalStorage("restaurant", "");

  useEffect(() => {

    const fetchThis = async () => {
      try {

        const id = await fetchRestaurantData();

        setRestId(id);

      } catch (error: any) {

        if (error.message === HttpMessagesEnum.INSUFFICIENT_PERMISSIONS) {

          swalNotifyError(new ErrorHelper(HttpMessagesEnum.INSUFFICIENT_PERMISSIONS, "Cerrando sesion")).then((result) => {
            if (result.isConfirmed) {
              window.location.href = "/pageUser";

            }
          });

        } else if (error.message === HttpMessagesEnum.TOKEN_EXPIRED) {

          swalNotifyError(new ErrorHelper(HttpMessagesEnum.TOKEN_EXPIRED, "Cerrando sesion")).then((result) => {
            if (result.isConfirmed) {
              window.location.href = "/login";

            }
          });;

          localStorage.removeItem("userSession");

        } else if (error.message === HttpMessagesEnum.RESTAURANT_NOT_FOUND) {

          swalNotifyError(new ErrorHelper(HttpMessagesEnum.NOT_ALLOWED_HERE, "Cerrando sesion")).then((result) => {
            if (result.isConfirmed) {
              window.location.href = "/pageUser";

            }
          });

        } else if (error.message !== HttpMessagesEnum.UNKNOWN_ERROR) {

          swalNotifyError(error);

        }

      }
    };

    fetchThis();

  }, []);

  return (
    <section className="flex flex-col min-h-screen bg-white">
      <div className="sticky top-0 z-10">
        <NavbarAdmin />
      </div>
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 bg-white">
        {children}
      </main>
      <Footer />
    </section>

  );
}
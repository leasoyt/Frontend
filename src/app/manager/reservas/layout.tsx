import NavbarAdminReservas from "@/components/NavbarAdminReservas/NavbarAdminReservas"

export default function DashboardLayout({
    children, // will be a page or nested layout
  }: {
    children: React.ReactNode
  }) {
  
    return (
      <section className="flex flex-col md:flex-row min-h-screen">
      <div className="bg-white w-full md:w-1/4 p-4 md:p-0">
          <NavbarAdminReservas />
      </div>
      <div className="w-full md:w-3/4 p-4">
          {children}
      </div>
  </section>
  
    )
  }
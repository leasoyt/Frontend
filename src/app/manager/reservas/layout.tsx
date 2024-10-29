import NavbarAdminReservas from "@/components/NavbarAdminReservas/NavbarAdminReservas"

export default function DashboardLayout({
    children, // will be a page or nested layout
  }: {
    children: React.ReactNode
  }) {
  
    return (
      <section className="top-0 flex">
        <NavbarAdminReservas/>
          {children}
      </section>
    )
  }
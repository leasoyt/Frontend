import NavbarAdministracion from "@/components/NavbarAdministracion/NavbarAdministracion"

export default function DashboardLayout({
    children, // will be a page or nested layout
  }: {
    children: React.ReactNode
  }) {
  
    return (
      <section className="sticky top-0 flex">
        <NavbarAdministracion/>
          {children}
      </section>
    )
  }
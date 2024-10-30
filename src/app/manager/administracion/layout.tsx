import NavbarAdministracion from "@/components/NavbarAdministracion/NavbarAdministracion"

export default function DashboardLayout({
    children, // will be a page or nested layout
  }: {
    children: React.ReactNode
  }) {
  
    return (
      <section className="flex">
      <div className="sticky top-0 w-1/4 bg-white shadow-md">
          <NavbarAdministracion />
      </div>
      <div className="w-3/4 p-4">
          {children}
      </div>
  </section>
  
    )
  }
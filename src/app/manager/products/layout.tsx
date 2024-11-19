import NavbarAdminMenu from "@/components/AdminDash/Menu/NavbarAdminMenu"

export default function DashboardLayout({
    children, // will be a page or nested layout
  }: {
    children: React.ReactNode
  }) {

    return (
      <section className="sticky top-0 flex">
        <NavbarAdminMenu/>
          {children}
      </section>
    )
  }
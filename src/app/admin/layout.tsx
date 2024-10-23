import NavbarAdmin from "@/components/NavbarAdmin/NavbarAdmin"

export default function DashboardLayout({
    children, // will be a page or nested layout
  }: {
    children: React.ReactNode
  }) {
  
    return (
      <section className="sticky top-0">
        <NavbarAdmin/>
          {children}
      </section>
    )
  }
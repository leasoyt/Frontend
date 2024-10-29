import Footer from "@/components/Footer/Footer"
import NavbarAdmin from "@/components/NavbarAdmin/NavbarAdmin"

export default function DashboardLayout({
    children, // will be a page or nested layout
  }: {
    children: React.ReactNode
  }) {
  
    return (
      <section className="top-0 flex flex-col min-h-screen">
        <NavbarAdmin/>
          {children}
        <Footer/>
      </section>
    )
  }
import Footer from "@/components/Footer/Footer"
import NavbarAdmin from "@/components/NavbarAdmin/NavbarAdmin"

export default function DashboardLayout({
    children, // will be a page or nested layout
  }: {
    children: React.ReactNode
  }) {
  
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
    
    )
  }
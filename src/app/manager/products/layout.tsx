import MenuSidebar from "@/components/ManagerDash/Menu/MenuSidebar"

export default function DashboardLayout({
    children, // will be a page or nested layout
  }: {
    children: React.ReactNode
  }) {

    return (
      <section className="sticky top-0 flex">
        <MenuSidebar/>
          {children}
      </section>
    )
  }
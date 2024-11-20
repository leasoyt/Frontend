import SideBarSubscription from "@/components/ManagerDash/Subscription/SideBarSubscription"

export default function DashboardLayout({
    children, // will be a page or nested layout
  }: {
    children: React.ReactNode
  }) {
  
    return (
      <section className="sticky top-0 flex">
        <SideBarSubscription/>
          {children}
      </section>
    )
  }
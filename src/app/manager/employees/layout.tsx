import WaitersSideBar from "@/components/ManagerDash/Waiters/WaitersSideBar";

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col md:flex-row min-h-screen">
      <div className=" sticky top-0 z-10">
        <WaitersSideBar />
      </div>
      {children}
    </section>
  );
}

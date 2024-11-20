import ReservationsSideBar from "@/components/ManagerDash/Reservation/ReservationsSideBar"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {

  return (
    <section className="flex flex-col md:flex-row min-h-screen">
      <div className="bg-white w-full md:w-1/4 p-4 md:p-0">
        <ReservationsSideBar />
      </div>
      {children}
    </section>

  )
}
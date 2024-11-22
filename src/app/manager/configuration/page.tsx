import ConfigView from "@/views/ManagerDashViews/Configuration/ConfigView";

export default function ManagerConfigurationLayout() {

  return (
    <div className="sticky top-0 flex">
      <div className=" sticky top-0 z-10">
        <ConfigView />
      </div>
    </div>
  )
}
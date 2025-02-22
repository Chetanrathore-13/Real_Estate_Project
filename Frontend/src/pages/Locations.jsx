import LocationManager from "../pages/LocationManager"

const Locations = () => {
  return (
    <div className="main__container flex h-screen">
        <div className="sidebar bg-red-500 basis-[15%] min-w-[15%]">sidebar</div>
        <div className="main__content--holder bg-gray-100 basis-full overflow-y-scroll p-3">
            <LocationManager />
        </div>
    </div>
  )
}

export default Locations

import React from 'react'

const ReservationsSideBar = () => {
    return (
        <div className="ml-6 mt-1 w-full max-w-xs sm:max-w-sm md:max-w-md bg-white border border-gray-300 rounded-lg shadow-lg z-10">
            <div className='bg-slate-700 flex justify-center'>
                <h1 className='text-white italic font-semibold mt-2 mb-2'>Reservas</h1>
            </div>
            <ul className="py-2 block px-4 py-2 text-gray-800">
                {/* <li>
                    <Link href="/manager/reservas/reservas" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                        Reservas
                    </Link>
                </li>
                <li>
                    <Link href="/manager/reservas/new" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                        Nueva Reserva
                    </Link>
                </li> */}
            </ul>
        </div>

    )
}

export default ReservationsSideBar
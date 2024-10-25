import Link from 'next/link'
import React from 'react'

const NavbarAdminOrdenes = () => {
  return (
    <div className="ml-6 mt-1 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
        <div className='bg-slate-700 flex justify-center'>
            <h1 className='text-white italic font-semibold mt-2 mb-2'>Ordenes</h1>
        </div>
        <ul className="py-2">
            <li>
                <Link href="/admin/ordenes/ordenes" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                    Ordenes
                </Link>
            </li>
            <li>
                <Link href="/admin/ordenes/new" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                    Nueva Orden
                </Link>
            </li>
        </ul>
    </div>
  )
}

export default NavbarAdminOrdenes
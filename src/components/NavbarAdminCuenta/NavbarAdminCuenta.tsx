import Link from 'next/link'
import React from 'react'

const NavbarAdminCuenta = () => {
  return (
    <div className="ml-6 mt-1 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
        <div className='bg-slate-700 flex justify-center'>
            <h1 className='text-white italic font-semibold mt-2 mb-2'>MI CUENTA</h1>
        </div>
        <ul className="py-2">
            <li>
                <Link href="/manager/cuenta/pagos" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                    Pagos
                </Link>
            </li>
            <li>
                <Link href="/manager/cuenta/planes" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                    Planes
                </Link>
            </li>
        </ul>
    </div>
  )
}

export default NavbarAdminCuenta
import Link from 'next/link'
import React from 'react'

const NavbarAdministracion = () => {
  return (
    <div className="ml-2 sm:ml-6 mt-1 w-full sm:w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
      <div className='bg-slate-700 flex justify-center px-4 py-2'>
        <h1 className='text-white italic font-semibold'>ADMINISTRACION</h1>
      </div>
      <ul className="py-2">
        <li>
          <Link
            href="/manager/administracion/meseros"
            className="block px-4 py-2 text-gray-800 hover:bg-gray-200 transition-colors duration-200"
          >
            Meseros
          </Link>
        </li>
      </ul>
    </div>

  )
}

export default NavbarAdministracion
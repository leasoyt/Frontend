import Link from 'next/link'
import React from 'react'

const NavbarAdminMenu = () => {
  return (
    <div className="ml-6 mt-1 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
        <div className='bg-slate-700 flex justify-center'>
            <h1 className='text-white italic font-semibold mt-2 mb-2'>Productos</h1>
        </div>
        <ul className="py-2">
            <li>
                <Link href="/admin/productos/bebidas" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                    Bebidas
                </Link>
            </li>
            <li>
                <Link href="/admin/productos/cafeteria" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                    Cafeteria
                </Link>
            </li>
            <li>
                <Link href="/admin/productos/platos" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                    Platos Principales
                </Link>
            </li>
            <li>
                <Link href="/admin/productos/postres" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                    Postres
                </Link>
            </li>
            <li>
                <Link href="/admin/productos/new" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                    Nuevo Producto
                </Link>
            </li>
        </ul>
    </div>
  )
}

export default NavbarAdminMenu
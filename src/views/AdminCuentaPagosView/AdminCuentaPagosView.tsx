import Link from 'next/link'
import React from 'react'

const AdminCuentaPagosView = () => {
  return (
    <div className="mr-5 mt-1 w-[80%] bg-white border border-gray-300 rounded-lg shadow-lg z-10">
        <div className='bg-slate-700 flex justify-center'>
            <h1 className='text-white italic font-semibold mt-2 mb-2'>PAGOS</h1>
        </div>
        <div className='flex p-5 justify-normal'>
            <div>
                <h2 className='text-black italic font-semibold'>TU PLAN DE REST0</h2>
            </div>
            <div className='border border-gray-300 p-3 ml-8 text-black'>
                <div className='border border-gray-300 p-2 mb-3'>
                    <h2 className='text-lg italic text-gray-500 '>Estas probando gratis el Plan Pro</h2>
                </div>
                <div className='mb-5'>
                    <p className='italic text-base font-semibold mb-3'>Elige el plan que necesites para tu negocio</p>
                    <p className='italic text-sm'>Realiza tu primer pago y continua usando Rest0</p>
                </div>
                <div className='flex justify-end'>
                    <Link href="/admin/cuenta/planes">
                       <button type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Elegir mi plan</button>
                    </Link>
                </div>
            </div>
        </div>
        <div className='flex p-5 justify-normal'>
            <div>
                <h2 className='text-black italic font-semibold'>HISTORIAL DE PAGOS</h2>
            </div>
            <div className='border border-gray-300 p-3 ml-8'>
                <div className='mb-5'>
                    <p className='italic text-base font-semibold mb-3 text-black'>Detalle de tus transacciones</p>
                    <p className='italic text-sm text-black'>Aquí verás todos los pagos que realizaste en Rest0 desde el 23/10/24.</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default AdminCuentaPagosView
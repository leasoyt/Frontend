import NewProductForm from '@/components/NewProductForm/NewProductForm'
import Image from 'next/image'
import React from 'react'

const NewProductView = () => {
  return (
    <div className="mr-5 mt-1 w-[80%] bg-white border border-gray-300 rounded-lg shadow-lg z-10">
        <div className='bg-slate-700 flex justify-center'>
            <h1 className='text-white italic font-semibold mt-2 mb-2'></h1>
        </div>
        <div className='bg-slate-100 flex items-center p-1 w-[95%] m-auto'>
          <Image
            src="https://svgsilh.com/svg/27323.svg" 
            alt="Logo"
            width={35} 
            height={35} 
            className="ml-2" 
          />
          <p className='italic ml-4'>Nuevo producto</p>
        </div>
        <NewProductForm/>
    </div>
  )
}

export default NewProductView
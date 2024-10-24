import React from 'react'

const NewProductForm = () => {
  return (
    <div className='p-3 bg-gray-200'>
        <h1 className='italic'>Detalles</h1>
        <form action="">
            <div className='p-1'>
                <label htmlFor="">Nombre:</label>
                <input
                  name='name' 
                  type="text"
                  className="border border-gray-300 p-1 italic ml-7" 
                //   value={}
                //   onChange={}
                />
            </div>
            <div className='p-1'>
                <label htmlFor="">Precio:</label>
                <input
                  name='price' 
                  type="number"
                  className="border border-gray-300 p-1 italic ml-10" 
                //   value={}
                //   onChange={}
                />
            </div>
            <div className='p-1'>
                <label htmlFor="">Categoria:</label>
                <input
                  name='image' 
                  type="string"
                  className="border border-gray-300 p-1 italic ml-4" 
                //   value={}
                //   onChange={}
                />
            </div>
            <div className='p-1 flex items-center'>
                <label htmlFor="">Imagen:</label>
                <input
                  name='image' 
                  type="string"
                  placeholder='Url'
                  className="border border-gray-300 p-1 italic ml-8" 
                //   value={}
                //   onChange={}
                />
                <p className='ml-2 text-lg'>o</p>
                <input
              type="file"
              accept="image/*"
              className="w-full border-gray-300 rounded-r-md shadow-sm p-2 "
            />
            </div>
            <div className='p-1 flex items-center'>
                <label htmlFor="">Descripción:</label>
                <textarea
                  placeholder="Descripción del producto"
                  maxLength={500}
                  className="w-[80%] border-gray-300 rounded-md shadow-sm p-2  text-black"
                />
            </div>
            <div className='flex justify-items-start p-2'>
                <button type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-3 py-1.5 me-2 mb-2 ml-3 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Agregar Producto</button>
            </div>
        </form>
    </div>
  )
}

export default NewProductForm
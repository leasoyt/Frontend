import React from 'react'

const NewMeseroForm = () => {
  return (
    <div className='p-3 bg-gray-200'>
        <h1 className='italic font-bold text-lg'>Registrar mesero</h1>
        <h1 className='italic'>Informacion:</h1>
        <form action="">
            <div className='p-1'>
                <label htmlFor="">Nombre:</label>
                <input
                  id='name'
                  name='name' 
                  type="text"
                  className="border border-gray-300 p-1 italic ml-24" 
                //   value={}
                //   onChange={}
                />
            </div>
            <div className='p-1'>
                <label htmlFor="">Email:</label>
                <input
                  id='email'
                  name='email' 
                  type="email"
                  className="border border-gray-300 p-1 italic ml-28" 
                //   value={}
                //   onChange={}
                />
            </div>
            <div className='p-1'>
                <label htmlFor="">Telefono:</label>
                <input
                  id='phono'
                  name='phone' 
                  type="number"
                  className="border border-gray-300 p-1 italic ml-24" 
                //   value={}
                //   onChange={}
                />
            </div>
            <div className='p-1'>
                <label htmlFor="">Contraseña:</label>
                <input
                  id="password"
                  name='id' 
                  type="password"
                  className="border border-gray-300 p-1 italic ml-20" 
                //   value={}
                //   onChange={}
                />
            </div>
            <div className='p-1'>
                <label htmlFor="">Confirmar Contraseña:</label>
                <input
                  id="password"
                  name='id' 
                  type="password"
                  className="border border-gray-300 p-1 italic ml-1" 
                //   value={}
                //   onChange={}
                />
            </div>
            <div className='flex justify-items-start p-2'>
                <button type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-3 py-1.5 me-2 mb-2 ml-3 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Registrar</button>
            </div>
        </form>
    </div>
  )
}

export default NewMeseroForm
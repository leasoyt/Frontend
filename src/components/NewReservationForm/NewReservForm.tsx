import React, { useState } from 'react'

const NewReservForm: React.FC = () => {
  // const {reservData, setReservData} = useState()

  return (
    <div className='p-3 bg-gray-200'>
        <h1 className='italic'>Detalles</h1>
        <form action="">
            <div className='p-1'>
                <label htmlFor="">Fecha:</label>
                <input
                  name='date' 
                  type="datetime-local"
                  className="border border-gray-300 p-1 italic ml-7" 
                //   value={}
                //   onChange={}
                />
            </div>
            <div className='p-1'>
                <label htmlFor="">Acientos:</label>
                <input
                  name='id' 
                  type="number"
                  className="border border-gray-300 p-1 italic ml-9" 
                //   value={}
                //   onChange={}
                />
            </div>
            <div className='flex justify-items-start p-2'>
                <button type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-3 py-1.5 me-2 mb-2 ml-3 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Agregar Reservacion</button>
            </div>
        </form>
    </div>
  )
}

export default NewReservForm
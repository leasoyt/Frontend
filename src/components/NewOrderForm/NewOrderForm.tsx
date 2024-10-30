import React from 'react'

const NewOrderForm = () => {
  return (
    <div className="p-4 bg-gray-200 max-w-md mx-auto">
  <h1 className="italic text-lg font-semibold text-black text-center mb-4">Detalles</h1>
  <form action="">
    <div className="p-2 flex items-center">
      <label className="text-black w-24">Fecha:</label>
      <input
        name="date"
        type="date"
        className="border border-gray-300 p-2 rounded-md italic text-black w-full"
      />
    </div>
    <div className="p-2 flex items-center">
      <label className="text-black w-24">Mesa:</label>
      <input
        name="id"
        type="number"
        className="border border-gray-300 p-2 rounded-md italic text-black w-full"
      />
    </div>
    <div className="p-2 flex items-center">
      <label className="text-black w-24">Id mesero:</label>
      <input
        name="id"
        type="number"
        className="border border-gray-300 p-2 rounded-md italic text-black w-full"
      />
    </div>
    <div className="flex justify-center p-2">
      <button
        type="button"
        className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
      >
        Agregar Orden
      </button>
    </div>
  </form>
</div>

  )
}

export default NewOrderForm
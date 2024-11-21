import Checkout from '@/components/Checkout/Checkout';
import Link from 'next/link';
import React from 'react';

const ManagerPlansView = () => {
  return (
    <div className="mr-5 mt-1 w-[80%] bg-white border border-gray-300 rounded-lg shadow-lg z-10">
      <div className='bg-slate-700 flex justify-center'>
        <h1 className='text-white italic font-semibold mt-2 mb-2'>PLANES</h1>
      </div>
      <div className='flex p-5 justify-normal'>
        
        <div className='border border-gray-300 p-3 ml-8'>
          <div className='mb-5'>
            <p className='italic text-base font-semibold mb-2 text-black'>Escoge el plan que desees</p>
            <p className='italic text-sm text-black'>Selecciona un plan de acuerdo a las funcionalidades que necesites:</p>
          </div>
          
          <div >
            <Checkout />
          </div>
         
        </div>
      </div>
    </div>
  );
}

export default ManagerPlansView;

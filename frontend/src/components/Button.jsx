import React from 'react';
export default function Button({children}) {
   return (
      <button className='py-4 px-9 bg-green-700 rounded-2xl border-none text-lg text-white cursor-pointer'>
         {children}
      </button>
   )
}
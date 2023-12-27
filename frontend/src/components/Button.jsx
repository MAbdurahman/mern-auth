import React from 'react';
import {useNavigate} from "react-router-dom";

export default function Button({children}) {
   const navigate = useNavigate();

   function handleClick() {
      navigate('/profile');
   }

   return (
      <button onClick={handleClick}
                   className='bg-gray-200 hover:bg-gray-300 py-4 px-8 rounded-md border-none uppercase font-bold text-lg text-logo-blue cursor-pointer'>
         {children}
      </button>
   )
}
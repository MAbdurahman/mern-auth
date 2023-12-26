import React from 'react';
import {useNavigate} from "react-router-dom";

export default function Button({children}) {
   const navigate = useNavigate();

   function handleClick() {
      navigate('/profile');
   }

   return (
      <button onClick={handleClick}
              className='py-4 px-8 bg-white hover:bg-gray-400 rounded-md border-none uppercase font-bold text-lg text-logo-blue cursor-pointer'>
         {children}
      </button>
   )
}
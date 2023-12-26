import {Link} from "react-router-dom";
import {useSelector} from 'react-redux';
import {useState} from 'react';

export default function Navbar() {
   const {currentUser} = useSelector((state) => state.user);
   const [open,setOpen]=useState(false);

   function handleClick() {
      setOpen(!open);
   }
   return (
      <div className='bg-slate-200 shadow-md fixed z-20 w-full top-0 left-0'>
         {/*<div className='flex justify-between items-center max-w-6xl mx-auto p-3'>*/}

         <div className='md:flex items-center justify-between bg-slate-200 py-4 max-w-6xl mx-auto md:px-10 px-7'>
            {/*<Link to='/'>
               <h1 className='font-bold font-worksans text-lg'>Auth App</h1>
            </Link>*/}
            <div className='font-bold text-2xl cursor-pointer flex items-center font-worksans text-gray-800'>
               <img className="w-12" src="https://res.cloudinary.com/mdbdrrhm/image/upload/v1703531559/logo_kmf4ea.png"
                    alt="logo"/>
               Auth App
            </div>
            <div onClick={() => setOpen(!open)} className='text-3xl absolute right-8 top-6 cursor-pointer md:hidden'>
               <ion-icon name={open ? 'close' : 'menu'}></ion-icon>
            </div>
            {/*<ul className='flex gap-4 font-semibold font-worksans uppercase tracking-wide'>*/}
            <ul className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-slate-200 md:z-auto z-[-1] left-0 
               w-full md:w-auto md:pl-0 pl-9 transition-all duration-300 ease-in ${open ? 'top-20 ' : 'top-[-490px]'}`}>
               <Link to='/' className='text-gray-800 hover:text-gray-400 duration-500'>
                  <li onClick={handleClick} className='md:ml-8 text-xl md:my-0 my-7 text-gray-900 font-worksans font-semibold hover:text-gray-400 duration-500'>Home</li>
               </Link>

               <Link to='/about' className='text-gray-800 hover:text-gray-400 duration-500'>
                  <li onClick={handleClick} className='md:ml-8 text-xl md:my-0 my-7 text-gray-900 font-worksans font-semibold hover:text-gray-400 duration-500'>About</li>
               </Link>
               <Link to='/profile' className='text-gray-800 hover:text-gray-400 duration-500'>
                  {currentUser ? (
                     <img onClick={handleClick} src={currentUser.profilePicture} alt='profile' className='h-7 w-7 rounded-full object-cover'/>
                  ) : (
                     <li onClick={handleClick} className='md:ml-8 text-xl md:my-0 my-7 text-gray-900 font-worksans font-semibold hover:text-gray-400 duration-500'>Sign In</li>
                  )}
               </Link>
            </ul>
         </div>
      </div>
   )
}
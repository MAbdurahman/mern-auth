import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
export function SignUpPage() {
   const [formData, setFormData] = useState({});
   const [error, setError] = useState(false);
   const [loading, setLoading] = useState(false);
   const navigate = useNavigate();

   function handleChange(e) {
      console.log('handleChange', e.target.value)
   }

   function handleSubmit(e) {
      e.preventDefault();
      console.log('handleSubmit')
   }
   return (
      <div className='p-3 max-w-lg mx-auto'>
         <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
         <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
            <input
               type='text'
               placeholder='Username'
               id='username'
               className='bg-slate-100 p-3 rounded-lg'
               onChange={handleChange}
            />
            <input
               type='email'
               placeholder='Email'
               id='email'
               className='bg-slate-100 p-3 rounded-lg'
               onChange={handleChange}
            />
            <input
               type='password'
               placeholder='Password'
               id='password'
               className='bg-slate-100 p-3 rounded-lg'
               onChange={handleChange}
            />
            <button
               disabled={loading}
               className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
            >
               {loading ? 'Loading...' : 'Sign Up'}
            </button>
         </form>
         <div className='flex gap-2 mt-5'>
            <p>Have an account?</p>
            <Link to='/sign-in'>
               <span className='text-blue-500'>Sign in</span>
            </Link>
         </div>
         <p className='text-red-700 mt-5'>{error && 'Something went wrong!'}</p>
      </div>
   );
}
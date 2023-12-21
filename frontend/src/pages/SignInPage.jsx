import {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';

export function SignInPage() {
   const [formData, setFormData] = useState({});
   const [error, setError] = useState(null);
   const [loading, setLoading] = useState(false);
   const navigate = useNavigate();

   function handleChange(e) {
      setFormData({...formData, [e.target.id]: e.target.value});
   }

   async function handleSubmit(e) {
      e.preventDefault();

      try {
         setLoading(true);
         setError(false);

         const res = await fetch('/api/v1.0/auth/sign-in', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
         });
         const data = await res.json();

         setLoading(false);
         if (data.success === false) {
            setError(true);
            setTimeout(()=> {
               setError(null);
            }, 3000)
            return;
         }
         navigate('/');

      } catch (error) {
         setLoading(false);
         setError(true);

         setTimeout(() => {
            setError(null);
         }, 3000);
      }
   }

   return (
      <div className='p-3 max-w-lg mx-auto'>
         <h2 className='text-3xl text-center font-semibold my-7'>Sign In</h2>
         <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
            <input
               type='email'
               placeholder='Email'
               id='email'
               autoComplete="off"
               className='bg-slate-100 p-3 rounded-lg'
               onChange={handleChange}
            />
            <input
               type='password'
               placeholder='Password'
               id='password'
               autoComplete="off"
               className='bg-slate-100 p-3 rounded-lg'
               onChange={handleChange}
            />
            <button
               type='submit'
               disabled={loading}
               className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
            >
               {loading ? 'Loading...' : 'Sign In'}
            </button>
         </form>
         <div className='flex gap-2 mt-5'>
            <p>Do not have an account?</p>
            <Link to='/sign-up'>
               <span className='text-blue-500'>Sign up</span>
            </Link>
         </div>
         <p className='text-red-700 mt-5'>{error && 'Internal Server Error!'}</p>
      </div>
   );
}
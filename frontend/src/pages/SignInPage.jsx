import {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {
   signInFailure,
   signInStart,
   signInSuccess,
   clearError
} from '../redux/user/userSlice.js';
import {useDispatch, useSelector} from 'react-redux';
import OAuthButton from '../components/OAuthButton.jsx';

export default function SignInPage() {
   const [formData, setFormData] = useState({});
   const {loading, error} = useSelector((state) => state.user);

   const navigate = useNavigate();
   const dispatch = useDispatch()

   function handleChange(e) {
      setFormData({...formData, [e.target.id]: e.target.value});
   }

   async function handleSubmit(e) {
      e.preventDefault();

      try {
         dispatch(signInStart());

         const res = await fetch('/api/v1.0/auth/sign-in', {
            method: 'POST', headers: {
               'Content-Type': 'application/json',
            }, body: JSON.stringify(formData),
         });
         const data = await res.json();

         if (data.success === false) {
            dispatch(signInFailure(data.message));
            return;
            setTimeout(() => {
               dispatch(clearError());

            }, 5000);
         }

         dispatch(signInSuccess(data))
         navigate('/');

      }
      catch (err) {
         dispatch(signInFailure(err.message));

      }
   }

   return (<div className="p-3 m-16 max-w-lg mx-auto">
         <h2
            className="text-2xl text-center uppercase font-semibold my-7 font-worksans">Sign
            In</h2>
         <form onSubmit={handleSubmit} className="flex flex-col gap-4 font-worksans">
            <input
               type="email"
               placeholder="Email"
               id="email"
               autoComplete="off"
               className="bg-slate-100 p-3 rounded-lg font-worksans"
               onChange={handleChange}
            />
            <input
               type="password"
               placeholder="Password"
               id="password"
               autoComplete="off"
               className="bg-slate-100 p-3 rounded-lg font-worksans"
               onChange={handleChange}
            />
            <button
               type="submit"
               disabled={loading}
               className="bg-logo-blue text-white font-worksans font-semibold p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
            >
               {loading ? 'Loading...' : 'Sign In'}
            </button>
            <OAuthButton/>
         </form>
         <div className="flex gap-2 font-worksans font-semibold mt-5">
            <p>Do not have an account?</p>
            <Link to="/sign-up">
               <span
                  className="text-logo-blue font-worksans font-semibold">Sign Up</span>
            </Link>
         </div>
         <p className="text-red-700 font-worksans font-semibold mt-5">{error ? error || 'Internal Server Error!' : ''}</p>
      </div>);
}
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import {app} from '../firebase.js';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signInSuccess } from "../redux/user/userSlice.js";

export function OAuth() {
   const dispatch = useDispatch();
   const navigate = useNavigate();
   async function handleClick() {
      try {
         const provider = new GoogleAuthProvider();
         const auth = getAuth(app);

         const result = await signInWithPopup(auth, provider);
         const res = await fetch('/api/v1.0/auth/sign-in-with-google', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({
               name: result.user.displayName,
               email: result.user.email,
               photo: result.user.photoURL,
            }),
         });

         const data = await res.json();
         dispatch(signInSuccess(data));
         navigate('/');

      } catch (err) {
         console.log('Cannot sign in with Google', err.message);
      }
   }

   return (
      <button
         type='button'
         onClick={handleClick}
         className='bg-red-700 text-white rounded-lg p-3 uppercase hover:opacity-95'
      >
         Continue with google
      </button>
   )
}
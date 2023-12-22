import { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function ProfilePage() {
   const fileRef = useRef(null);
   const [image, setImage] = useState(undefined);
   const [imagePercent, setImagePercent] = useState(0);
   const [imageError, setImageError] = useState(false);
   const [formData, setFormData] = useState({});
   const [updateSuccess, setUpdateSuccess] = useState(false);

   const { currentUser, loading, error } = useSelector((state) => state.user);
   const dispatch = useDispatch();

   function handleChange(e) {

   }

   async function handleSubmit(e) {

   }

   async function handleDeleteUser() {

   }

   async function handleSignOut() {

   }

   return (
      <div className='p-3 max-w-lg mx-auto'>
         <h2 className='text-3xl font-semibold text-center my-7'>Profile</h2>
         <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
            <input
               type='file'
               ref={fileRef}
               hidden
               accept='image/*'
               onChange={(e) => setImage(e.target.files[0])}
            />
            {/*
      firebase storage rules:
      allow read;
      allow write: if
      request.resource.size < 2 * 1024 * 1024 &&
      request.resource.contentType.matches('image/.*') */}
            <img
               src={formData.profilePicture || currentUser.profilePicture}
               alt='profile'
               className='h-24 w-24 self-center cursor-pointer rounded-full object-cover mt-2'
               onClick={() => fileRef.current.click()}
            />
            <p className='text-sm self-center'>
               {imageError ? (
                  <span className='text-red-700'>
              Error uploading image (file size must be less than 2 MB)
            </span>
               ) : imagePercent > 0 && imagePercent < 100 ? (
                  <span className='text-slate-700'>{`Uploading: ${imagePercent} %`}</span>
               ) : imagePercent === 100 ? (
                  <span className='text-green-700'>Image uploaded successfully</span>
               ) : (
                  ''
               )}
            </p>
            <input
               defaultValue={currentUser.username}
               type='text'
               id='username'
               placeholder='Username'
               className='bg-slate-100 rounded-lg p-3'
               onChange={handleChange}
            />
            <input
               defaultValue={currentUser.email}
               type='email'
               id='email'
               placeholder='Email'
               className='bg-slate-100 rounded-lg p-3'
               onChange={handleChange}
            />
            <input
               type='password'
               id='password'
               placeholder='Password'
               className='bg-slate-100 rounded-lg p-3'
               onChange={handleChange}
            />
            <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
               {loading ? 'Loading...' : 'Update Profile'}
            </button>
         </form>
         <div className='flex justify-between mt-5'>
        <span
           onClick={handleDeleteUser}
           className='text-red-700 cursor-pointer'
        >
          Delete Account
        </span>
            <span onClick={handleSignOut} className='text-red-700 cursor-pointer'>
          Sign out
        </span>
         </div>
         <p className='text-red-700 mt-5'>{error ? error.message || 'Internal Server Error!' : ''}</p>
         <p className='text-green-700 mt-5'>
            {/*{updateSuccess && 'User is updated successfully!'}*/}
         </p>
      </div>
   )
}
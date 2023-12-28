import {useRef, useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
   getDownloadURL, getStorage, ref, uploadBytesResumable,
} from 'firebase/storage';
import {app} from '../firebase';
import {
   updateUserStart,
   updateUserSuccess,
   updateUserFailure,
   deleteUserStart,
   deleteUserSuccess,
   deleteUserFailure,
   signOutUserStart,
   signOutUserSuccess,
   signOutUserFailure
} from '../redux/user/userSlice.js'

export default function ProfilePage() {
   const fileRef = useRef(null);
   const [image, setImage] = useState(undefined);
   const [imagePercent, setImagePercent] = useState(0);
   const [imageError, setImageError] = useState(false);
   const [formData, setFormData] = useState({});
   const [updateSuccess, setUpdateSuccess] = useState(false);

   const {currentUser, loading, error} = useSelector((state) => state.user);
   const dispatch = useDispatch();

   useEffect(() => {
      if (image) {
         handleFileUpload(image);
      }
   }, [image]);

   async function handleFileUpload(image) {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + image.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, image);

      uploadTask.on('state_changed', (snapshot) => {
         const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
         setImagePercent(Math.round(progress));
      }, (error) => {
         setImageError(true);
      }, () => {
         getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => setFormData({
            ...formData, profilePicture: downloadURL
         }));
      });
   }

   function handleChange(e) {
      setFormData({...formData, [e.target.id]: e.target.value});
   }

   async function handleSubmit(e) {
      e.preventDefault();
      try {
         dispatch(updateUserStart());
         const res = await fetch(`/api/v1.0/user/update-user/${currentUser._id}`, {
            method: 'PUT', headers: {
               'Content-Type': 'application/json',
            }, body: JSON.stringify(formData),
         });

         const data = await res.json();
         if (data.success === false) {
            dispatch(updateUserFailure(data.message));
            return;
         }

         dispatch(updateUserSuccess(data));
         setUpdateSuccess(true);
         setTimeout(() => {
            setUpdateSuccess(false)
         }, 5000);

      }
      catch (err) {
         dispatch(updateUserFailure(err.message));
      }
   }

   async function handleDeleteUser() {
      try {
         dispatch(deleteUserStart());
         const res = await fetch(`/api/v1.0/user/delete-user/${currentUser._id}`, {
            method: 'DELETE',
         });
         const data = await res.json();
         if (data.success === false) {
            dispatch(deleteUserFailure(data.message));
            return;
         }
         dispatch(deleteUserSuccess(data));

      }
      catch (err) {
         dispatch(deleteUserFailure(err.message));
      }
   }

   async function handleSignOut() {
      try {
         dispatch(signOutUserStart());
         const res = await fetch('/api/v1.0/auth/sign-out');
         const data = await res.json();
         if (data.success === false) {
            dispatch(signOutUserFailure(data.message));
            return;

         }
         dispatch(signOutUserSuccess(data));
      }
      catch (err) {
         dispatch(signOutUserFailure(err.message));
      }
   }

   return (<div className="p-3 pt-20 max-w-lg mx-auto">
         <h2
            className="text-3xl font-semibold font-worksans text-center my-7">{currentUser.username} Profile</h2>
         <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
               type="file"
               ref={fileRef}
               hidden
               accept="image/*"
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
               alt="profile"
               className="h-24 w-24 self-center cursor-pointer rounded-full object-cover mt-2"
               onClick={() => fileRef.current.click()}
            />
            <p className="text-sm self-center">
               {imageError ? (<span className="text-red-700 font-bold tracking-wide">
              Error uploading image (file size must be less than 2 MB)
            </span>) : imagePercent > 0 && imagePercent < 100 ? (<span
                     className="text-slate-700 font-bold tracking-wide">{`Uploading: ${imagePercent} %`}</span>) : imagePercent === 100 ? (
                  <span className="text-green-700 font-bold tracking-wide">Image uploaded successfully</span>) : ('')}
            </p>
            <input
               defaultValue={currentUser.username}
               type="text"
               id="username"
               placeholder="Username"
               className="bg-slate-100 rounded-lg p-3 font-worksans"
               onChange={handleChange}
            />
            <input
               defaultValue={currentUser.email}
               type="email"
               id="email"
               placeholder="Email"
               className="bg-slate-100 rounded-lg p-3 font-worksans"
               onChange={handleChange}
            />
            <input
               type="password"
               id="password"
               placeholder="Password"
               className="bg-slate-100 rounded-lg p-3 font-worksans"
               onChange={handleChange}
            />
            <button
               className="bg-logo-blue text-white font-worksans font-semibold tracking-wide p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
               {loading ? 'Loading...' : 'Update Profile'}
            </button>
         </form>
         <div className="flex justify-between mt-5">
            <span
               onClick={handleDeleteUser}
               className="text-red-700 tracking-wide font-worksans font-semibold cursor-pointer"
            >
               Delete Account
            </span>
            <span onClick={handleSignOut}
                  className="text-logo-blue tracking-wide font-worksans font-semibold cursor-pointer"
            >
               Sign Out
            </span>
         </div>
         <p className="text-red-700 tracking-wide font-worksans font-bold mt-5">{error ? error || 'Internal Server Error!' : ''}</p>
         <p className="text-green-700 tracking-wide font-worksans font-bold mt-5">
            {updateSuccess && 'User updated successfully!'}
         </p>
      </div>)
}
import {useNavigate} from "react-router-dom";

export default function NotFoundPage() {
   const navigate = useNavigate();

   function handleClick() {
      navigate('/')
   }

   return (
      <div className='flex flex-col justify-center mt-32 px-4 py-12 max-w-2xl mx-auto '>
         <div className="flex flex-col justify-center text-center mb-8">
            <h2 className="font-worksans font-bold text-blue-950 text-9xl">404</h2>
            <p className="text-4xl font-worksans font-semibold">
               Page Not Found
            </p>
         </div>
         <div className="text-center ">
            <button
               onClick={handleClick}
               className="font-worksans font-semibold bg-slate-600 hover:bg-slate-950 text-white py-2 px-4 rounded">Back
               To Home
            </button>
         </div>
      </div>
   )
}
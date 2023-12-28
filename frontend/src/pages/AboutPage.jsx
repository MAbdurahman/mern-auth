import {Link} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';

export default function AboutPage() {
   const navigate = useNavigate();

   function handleClick() {
      navigate('/profile');
   }

   return (<div className="px-8 py-8 mt-24 mx-auto max-w-6xl">
      <h2
         className="text-3xl font-worksans font-extrabold mb-4 text-gray-900">About Us
      </h2>
      <section className="grid grid-cols-1 gap-0 md:grid-cols-2 md:gap-4">
         <div>
            <p className="mb-4 text-slate-700 text-lg font-worksans">
               This is a MERN (MongoDB, Express, React, Node.js) stack application
               with
               authentication. It allows users to sign up, sign in, and sign out.
               Also,
               it provides users the ability to update their profile, which is a
               protected
               route for authenticated users.
            </p>
            <p className="mb-4 text-gray-900 text-lg font-worksans">
               The front-end of the application is built with React and uses React
               Router for client-side routing. The back-end is built with Node.js and
               Express, and uses MongoDB as the database. Authentication is implemented
               using JSON Web Tokens (JWT).
            </p>
         </div>
         <p className="mb-6 text-gray-900 text-lg font-worksans">
            This application is intended as a starting point for building full-stack
            web applications with authentication using the MERN stack. Feel free to
            use it as a template for your own projects!
         </p>
      </section>
      <section
         className="flex flex-row justify-items-center items-start mx-auto lg:mx-0">
         <button onClick={handleClick}
                 className="bg-logo-blue hover:bg-logo-blue-2 py-4 px-8 font-worksans
                 rounded-md border-none uppercase font-semibold text-lg text-gray-100
                 cursor-pointer">
            Learn more
         </button>
      </section>
   </div>)
}
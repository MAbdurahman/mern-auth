import Button from '../components/Button.jsx';

export default function HomePage() {

   return (<div
         className="flex flex-col justify-center items-center bg-logo-blue w-full h-screen">
         <h1 className="mb-5 text-5xl text-white font-extrabold">Auth App</h1>
         <h2
            className="mb-7 px-2 text-2xl text-center text-gray-300 font-medium">Keep
            your profile information in one secure
            location,<br/> accessible to you everywhere</h2>
         <Button>Start Now</Button>
      </div>)
}
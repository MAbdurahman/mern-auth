import { BrowserRouter, Routes, Route } from "react-router-dom";
import {Navbar} from "./components/Navbar.jsx";
import {HomePage} from "./pages/HomePage.jsx";
import {AboutPage} from "./pages/AboutPage.jsx";
import {SignInPage} from "./pages/SignInPage.jsx";
import {SignUpPage} from "./pages/SignUpPage.jsx";
import {ProfilePage} from "./pages/ProfilePage.jsx";
import {NotFoundPage} from "./pages/NotFoundPage.jsx";

export default function App() {

   return (
      <BrowserRouter>
         <Navbar />
         <Routes>
            <Route path={'/'} element={<HomePage/>} />
            <Route path={'/about'} element={<AboutPage/>} />
            <Route path={'/sign-in'} element={<SignInPage/>} />
            <Route path={'/sign-up'} element={<SignUpPage/>} />
            <Route path={'/profile'} element={<ProfilePage/>} />
            <Route path={'/*'} element={<NotFoundPage/>} />
         </Routes>
      </BrowserRouter>

   );
}
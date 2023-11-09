import { Route, Routes } from "react-router-dom";
import LoginPage from './pages/loginpage/loginPage';
import SignupPage from './pages/signuppage/signupPage';
import HomeRoutes from "./navigation/homeRoutes";
import PageNotFound from "./pages/pagenotfound/pageNotFound";
import StartPage from "./pages/startpage/startpage";
import Admin from "./admin/Admin";
import Accounts from "./admin/Accounts";
import Appointment from "./admin/Appointment";



function App() {

  return (
    <Routes>
      <Route path="/" element={<StartPage/>}/>
      <Route path='/login' element={<LoginPage />} />
      <Route path='/sign-up' element={<SignupPage />} />
      <Route path='/home/*' element={<HomeRoutes />} />
      <Route path="/admin" element={<Admin/>}></Route>
      <Route path="/admin/account" element={<Accounts/>}></Route>
      <Route path="/admin/appointment" element={<Appointment/>}></Route>
      <Route path="*" element={<PageNotFound/>}/>
    </Routes>
  );
}

export default App;

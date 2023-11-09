import MyNavbar from "../components/MyNavbar/MyNavbar";
import CreateAppointmentPage from "../pages/appointmentspage/createAppointmentPage";
import SeeAppointmentPage from "../pages/appointmentspage/seeAppointmentPage";
import { Route, Routes, } from "react-router-dom";
import HomePage from "../pages/homepage/homePage";
import ServicePage from "../pages/servicePage/servicePage";
import AboutPage from "../pages/aboutpage/aboutPage";
import { useAuth } from "../context/AuthContext";
import PageNotAuthorized from "../pages/pagenotauthorized/pageNotAuthorized";
function HomeRoutes() {
  const { authenticated } = useAuth(); 

  if (!authenticated) {
    alert("You need to login first!")
    return <PageNotAuthorized/>;
  }
  return (
    <>
      <MyNavbar />
      <main className="p-3 bg-secondary">
        <Routes>
          <Route index element={<HomePage/> } />
          <Route path='/services' element={<ServicePage/>} />
          <Route path='/about' element={<AboutPage />} />
          <Route path='/create-appointments' element={<CreateAppointmentPage />} />
          <Route path='/appointments' element={<SeeAppointmentPage />} />
        </Routes>
      </main>
    </>
  );
}

export default HomeRoutes;
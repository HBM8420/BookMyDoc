import React, { useContext } from "react";
import { Routes, Route, useLocation} from "react-router-dom";

import Navbar from "./components/Navbar";
import AdminNavbar from './admin/components/AdminNavbar.jsx';
import Footer from "./components/Footer";
import Sidebar from "./admin/components/Sidebar";

import Home from "./pages/Home";
import Doctors from "./pages/Doctors";
import Login from "./pages/Login";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Appointment from "./pages/Appointment";
import MyAppointments from "./pages/MyAppointments";
import MyProfile from "./pages/MyProfile";

import AdminLogin from "./admin/pages/AdminLogin";
import Dashboard from "./admin/pages/Admin/Dashboard";
import AddDoctor from "./admin/pages/Admin/AddDoctor";
import DoctorsList from "./admin/pages/Admin/DoctorsList";
import AllAppointments from "./admin/pages/Admin/AllApointments";

import DoctorDashboard from "./admin/pages/Doctor/DoctorDashboard";
import DoctorAppointments from "./admin/pages/Doctor/DoctorAppointments";
import DoctorProfile from "./admin/pages/Doctor/DoctorProfile";

import { ToastContainer } from "react-toastify";
import { AdminContext } from "./admin/context/AdminContext";
import { DoctorContext } from "./admin/context/DoctorContext";

const App = () => {
  const location = useLocation();
  const { aToken } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext);

const isAdminRoute = location.pathname === "/admin" || location.pathname.startsWith("/admin/");
 const isDoctorRoute = location.pathname.startsWith("/doctor/");

  const showSidebarLayout = isAdminRoute || isDoctorRoute;

  // Auth protected routes
  if (showSidebarLayout && !(aToken || dToken)) {
    return (
      <>
        <AdminLogin />
        <ToastContainer />
      </>
    );
  }

  return (
    <div className="mx-4 sm:mx-[10%]">
      <ToastContainer />
      {showSidebarLayout ? (
        <div className="bg-[#F8F9FD]">
          <AdminNavbar />
          <div className="flex items-start">
            <Sidebar />
            <Routes>
              {/* Admin Routes */}
              <Route path="/admin" element={<Dashboard />} />
              <Route path="/admin/admin-dashboard" element={<Dashboard />} />
              <Route path="/admin/add-doctor" element={<AddDoctor />} />
              <Route path="/admin/doctor-list" element={<DoctorsList />} />
              <Route path="/admin/all-appointments" element={<AllAppointments/>} />

              {/* Doctor Routes */}
              <Route path="/doctor/doctor-dashboard" element={<DoctorDashboard />} />
              <Route path="/doctor/doctor-appointments" element={<DoctorAppointments />} />
              <Route path="/doctor/doctor-profile" element={<DoctorProfile />} />
            </Routes>
          </div>
        </div>
      ) : (
        <>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/doctors" element={<Doctors />} />
            <Route path="/alldoctors" element={<Doctors />} />
            <Route path="/doctors/:speciality" element={<Doctors />} />
            <Route path="/login" element={<Login />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/appointment/:docId" element={<Appointment />} />
            <Route path="/my-appointments" element={<MyAppointments />} />
            <Route path="/my-profile" element={<MyProfile />} />
          </Routes>
          <Footer />
        </>
      )}
    </div>
  );
};

export default App;

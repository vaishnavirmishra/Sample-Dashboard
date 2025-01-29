import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./dashboard/Dashboard";
import User from "./components/pages/users/Users";
import AddUsers from "./components/pages/users/AddUser";
import EditUser from "./components/pages/users/EditUser";
import Partners from "./components/pages/partners/Partners";
import EditPartner from "./components/pages/partners/EditPartner";
import Appointments from "./components/pages/appointments/Appointments";
import Disputes from "./components/pages/dispute resolution/Disputes";
import Chats from "./components/pages/dispute resolution/Chats";
import Report from "./components/pages/report/Report";
import PrivateRoute from "./components/pages/auth/PrivateRoute";
import Sign from "./components/pages/auth/Login";
import axios from "axios";

axios.defaults.withCredentials = true;

function App() {
  return (
    <div>
      <Router>
        <Routes>
          {/* Default redirection to /signin */}
          <Route path="/signin" element={<Sign />} />
          <Route path="/" element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/student" element={<User />} />
            <Route path="/student/add" element={<AddUsers />} />
            <Route path="/student/edit/:id" element={<EditUser />} />
            <Route path="/teachers" element={<Partners />} />
            <Route path="/teachers/edit/:id" element={<EditPartner />} />
            <Route path="/subjects" element={<Appointments />} />
            <Route path="/dispute-resolution" element={<Disputes />} />
            <Route path="/disputes/chats" element={<Chats />} />
            <Route path="/reports" element={<Report />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

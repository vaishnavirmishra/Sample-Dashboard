import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./dashboard/Dashboard";
import User from "./components/pages/users/Users";
import AddUsers from "./components/pages/users/AddUser";
import EditUser from "./components/pages/users/EditUser";
import Partners from "./components/pages/partners/Partners";
import EditPartner from "./components/pages/partners/EditPartner";
import Appointments from "./components/pages/appointments/Appointments";
import Payments from "./components/pages/payments/Payments";
import Disputes from "./components/pages/dispute resolution/Disputes";
import Chats from "./components/pages/dispute resolution/Chats";
import Feedback from "./components/pages/feedback/Feedbacks";
import Report from "./components/pages/report/Report";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          {/* Default redirection to /signin */}
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/user" element={<User />} />
          <Route path="/user/add" element={<AddUsers />} />
          <Route path="/user/edit/:id" element={<EditUser />} />
          <Route path="/partners" element={<Partners />} />
          <Route path="/partners/edit/:id" element={<EditPartner />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/payments" element={<Payments />} />
          <Route path="/dispute-resolution" element={<Disputes />} />
          <Route path="/disputes/chats" element={<Chats />} />
          <Route path="/feedbacks" element={<Feedback />} />
          <Route path="/reports" element={<Report />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

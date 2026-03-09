import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import AboutNew from "./components/AboutNew";
import TeamHalfCircle from "./components/TeamHalfCircle";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Organise from "./components/Organise";
import Profile from "./components/Profile";
import CalenderPage from "./pages/calender";
import OrganizeEvent from "./components/OrganizeEvent";
import EventDetails from "./components/EventDetails";

function App() {
  return (
    <div className="text-white font-urbanist overflow-x-hidden">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element={<AboutNew />} />
        <Route path="/test" element={<AboutNew />} />
        <Route path="/test1" element={<TeamHalfCircle />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/calender" element={<CalenderPage />} />
        <Route path="/organize" element={<OrganizeEvent />} />
        {/* Event detail — supports both /event/:id and legacy /event?id=... */}
        <Route path="/event/:id" element={<EventDetails />} />
        <Route path="/event" element={<EventDetails />} />
      </Routes>
    </div>
  );
}

export default App;

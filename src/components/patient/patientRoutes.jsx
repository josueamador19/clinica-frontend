import React from "react";
import { Routes, Route } from "react-router-dom";
import PatientDashboard from "./PatientDashboard";
import ScheduleAppointment from "./ScheduleAppointment";
import UpcomingAppointments from "./UpcomingAppointments";

const PatientRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<PatientDashboard />} />
      <Route path="schedule" element={<ScheduleAppointment />} />
      <Route path="upcoming" element={<UpcomingAppointments />} />
    </Routes>
  );
};

export default PatientRoutes;

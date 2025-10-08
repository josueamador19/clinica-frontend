import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import PrivateRoute from "./routes/PrivateRoute";
import PatientRoutes from "./components/patient/patientRoutes";
import MedicoDashboard from "./components/medico/MedicoDashboard";

// 
// import AdminDashboard from "./components/admin/AdminDashboard";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Private Routes para Paciente */}
        <Route 
          path="/patient/*"
          element={
            <PrivateRoute allowedRoles={["abc856dd-ba5f-41ae-8dea-27aa29f8ab47"]}>
              <PatientRoutes />
            </PrivateRoute>
          }
        />
        {/* Private Routes para Médico */}
        <Route 
          path="/medico/*"
          element={
            <PrivateRoute allowedRoles={["5770e7d5-c449-4094-bbe1-fd52ee6fe75f"]}>
              <MedicoDashboard />
            </PrivateRoute>
          }
        /> 
      </Routes>
        {/* Private Routes para Admin */}
        {/* <Route 
          path="/admin/*"
          element={
            <PrivateRoute allowedRoles={["b20c6894-e11b-41aa-864a-b642b94682c1"]}>
              <AdminDashboard />
            </PrivateRoute>
          }
        /> */}


    </Router>
  );
}

export default App;

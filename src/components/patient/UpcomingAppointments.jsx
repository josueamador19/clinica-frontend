import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import AppointmentCard from "./AppointmentCard";

const UpcomingAppointments = () => {
  const { user } = useContext(AuthContext);
  const [citas, setCitas] = useState([]);
  const backendUrl = "http://localhost:8000";

  useEffect(() => {
    const fetchCitas = async () => {
      try {
        const res = await axios.get(`${backendUrl}/citas`);
        // Filtrar solo las del paciente logueado
        const futureCitas = res.data.filter(c => c.paciente_id === user.id);
        setCitas(futureCitas);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCitas();
  }, [user.id]);

  return (
    <div className="container mt-5">
      <h2>Citas Futuras</h2>
      {citas.length === 0 && <p>No tienes citas programadas.</p>}
      {citas.map(cita => (
        <AppointmentCard key={cita.id} cita={cita} />
      ))}
    </div>
  );
};

export default UpcomingAppointments;

import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

const ScheduleAppointment = () => {
  const { user } = useContext(AuthContext);
  const [sucursales, setSucursales] = useState([]);
  const [medicos, setMedicos] = useState([]);
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [sucursal, setSucursal] = useState("");
  const [medico, setMedico] = useState("");
  const [message, setMessage] = useState("");

  const backendUrl = "http://localhost:8000";

  useEffect(() => {
    // Cargar sucursales
    axios.get(`${backendUrl}/sucursales`)
      .then(res => setSucursales(res.data))
      .catch(err => console.error("Error al cargar sucursales:", err));

    // Cargar médicos filtrando por rol_id de médico
    axios.get(`${backendUrl}/medicos`)
      .then(res => setMedicos(res.data))
      .catch(err => console.error("Error al cargar médicos:", err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const formData = new FormData();
      formData.append("paciente_id", user.id);
      formData.append("medico_id", medico);
      formData.append("sucursal_id", sucursal);
      formData.append("fecha", fecha);
      formData.append("hora", hora);

      const res = await axios.post(`${backendUrl}/citas`, formData);
      setMessage("Cita agendada correctamente!");
      setFecha("");
      setHora("");
      setSucursal("");
      setMedico("");
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.error || "Error al agendar cita");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Agendar Cita</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Sucursal</label>
          <select
            className="form-control"
            value={sucursal}
            onChange={(e) => setSucursal(e.target.value)}
            required
          >
            <option value="">Selecciona una sucursal</option>
            {sucursales.map((s) => (
              <option key={s.id} value={s.id}>{s.nombre}</option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label>Médico</label>
          <select
            className="form-control"
            value={medico}
            onChange={(e) => setMedico(e.target.value)}
            required
          >
            <option value="">Selecciona un médico</option>
            {medicos.length > 0 ? (
              medicos.map((m) => (
                <option key={m.id} value={m.id}>{m.nombre}</option>
              ))
            ) : (
              <option disabled>No hay médicos disponibles</option>
            )}
          </select>
        </div>

        <div className="mb-3">
          <label>Fecha</label>
          <input
            type="date"
            className="form-control"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label>Hora</label>
          <input
            type="time"
            className="form-control"
            value={hora}
            onChange={(e) => setHora(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">Agendar</button>
      </form>

      {message && <p className="mt-3">{message}</p>}
    </div>
  );
};

export default ScheduleAppointment;

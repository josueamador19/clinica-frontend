import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CalendarDays, Clock, User, Stethoscope } from "lucide-react";
import axios from "axios";
import { Modal, Button, Form, Spinner, Alert } from "react-bootstrap";

const AdminAppointments = () => {
  const [citas, setCitas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [citaSeleccionada, setCitaSeleccionada] = useState(null);
  const [medicos, setMedicos] = useState([]);
  const [sucursales, setSucursales] = useState([]);
  const [horasDisponibles, setHorasDisponibles] = useState([]);
  const [formData, setFormData] = useState({
    medico_id: "",
    sucursal_id: "",
    fecha: "",
    hora: "",
  });

  // Filtros
  const [filterPaciente, setFilterPaciente] = useState("");
  const [filterMedico, setFilterMedico] = useState("");
  const [filterSucursal, setFilterSucursal] = useState("");

  const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [citasRes, medicosRes] = await Promise.all([
          axios.get(`${backendUrl}/citas/todas`),
          axios.get(`${backendUrl}/medicos`),
        ]);
        setCitas(citasRes.data);
        setMedicos(medicosRes.data);

        // Extraer sucursales únicas
        const sucursalesUnicas = [
          ...new Map(
            citasRes.data.map((c) => [c.sucursal, { id: c.sucursal, nombre: c.sucursal }])
          ).values(),
        ];
        setSucursales(sucursalesUnicas);
      } catch (err) {
        console.error("Error al obtener datos:", err);
        setError(err.response?.data?.error || "No se pudieron cargar los datos");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleShowModal = (cita) => {
    setCitaSeleccionada(cita);
    setFormData({
      medico_id: cita.medico_id,
      sucursal_id: "",
      fecha: cita.fecha,
      hora: "",
    });
    setHorasDisponibles([]);
    setShowModal(true);

    // Obtener horas disponibles al abrir modal
    fetchDisponibilidad(cita.medico_id, cita.fecha);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCitaSeleccionada(null);
    setFormData({ medico_id: "", sucursal_id: "", fecha: "", hora: "" });
    setHorasDisponibles([]);
  };

  const fetchDisponibilidad = async (medico_id, fecha) => {
    if (!medico_id || !fecha) {
      setHorasDisponibles([]);
      return;
    }

    try {
      const res = await axios.get(`${backendUrl}/admin/medicos/${medico_id}/disponibilidad`, {
        params: { fecha },
      });

      setHorasDisponibles(res.data);
    } catch (err) {
      console.error("Error al obtener disponibilidad admin:", err);
      setHorasDisponibles([]);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newFormData = { ...formData, [name]: value };
    setFormData(newFormData);

    if (name === "medico_id" || name === "fecha") {
      fetchDisponibilidad(
        name === "medico_id" ? value : newFormData.medico_id,
        name === "fecha" ? value : newFormData.fecha
      );
      setFormData({ ...newFormData, sucursal_id: "", hora: "" });
    }

    if (name === "sucursal_id") {
      setFormData({ ...newFormData, hora: "" });
    }
  };

  const handleReagendar = async () => {
    if (!formData.fecha || !formData.hora || !formData.sucursal_id || !formData.medico_id) {
      alert("Por favor seleccione médico, sucursal, fecha y hora.");
      return;
    }

    try {
      // Convertir hora a formato HH:MM:SS
      const horaFormateada = formData.hora.includes(":") ? formData.hora + ":00" : formData.hora;

      const res = await axios.patch(
        `${backendUrl}/citas/${citaSeleccionada.id}/reagendar`,
        null,
        {
          params: {
            fecha: formData.fecha,
            hora: horaFormateada,
            sucursal_id: formData.sucursal_id,
          },
        }
      );

      setCitas((prev) =>
        prev.map((c) => (c.id === citaSeleccionada.id ? res.data.cita : c))
      );

      handleCloseModal();
      alert("✅ Cita reagendada correctamente");
    } catch (err) {
      console.error("Error al reagendar cita:", err);
      alert(err.response?.data?.error || "No se pudo reagendar la cita");
    }
  };

  const handleCancel = async (citaId) => {
    if (!window.confirm("¿Seguro que deseas cancelar esta cita?")) return;
    try {
      await axios.patch(`${backendUrl}/citas/${citaId}/cancelar`);
      setCitas((prev) =>
        prev.map((c) => (c.id === citaId ? { ...c, estado: "cancelada" } : c))
      );
    } catch (err) {
      console.error("Error al cancelar cita:", err);
      alert("No se pudo cancelar la cita. Intenta de nuevo.");
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-2">Cargando citas...</p>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="danger" className="mt-4 text-center">
        <strong>Error:</strong> {error}
      </Alert>
    );
  }

  // Filtrado de citas
  const citasFiltradas = citas.filter(
    (cita) =>
      (filterPaciente ? cita.paciente === filterPaciente : true) &&
      (filterMedico ? cita.medico === filterMedico : true) &&
      (filterSucursal ? cita.sucursal === filterSucursal : true)
  );

  const pacientesUnicos = [...new Set(citas.map((c) => c.paciente))];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <h4 className="text-primary fw-bold mb-4 d-flex align-items-center gap-2">
        <CalendarDays size={22} />
        Gestión de Citas
      </h4>

      {/* Filtros */}
      <div className="row mb-4">
        <div className="col-md-4 mb-2">
          <select
            className="form-control"
            value={filterPaciente}
            onChange={(e) => setFilterPaciente(e.target.value)}
          >
            <option value="">Todos los pacientes</option>
            {pacientesUnicos.map((p, i) => (
              <option key={i} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-4 mb-2">
          <select
            className="form-control"
            value={filterMedico}
            onChange={(e) => setFilterMedico(e.target.value)}
          >
            <option value="">Todos los médicos</option>
            {medicos.map((m) => (
              <option key={m.id} value={m.id}>
                {m.nombre}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-4 mb-2">
          <select
            className="form-control"
            value={filterSucursal}
            onChange={(e) => setFilterSucursal(e.target.value)}
          >
            <option value="">Todas las sucursales</option>
            {sucursales.map((s) => (
              <option key={s.id} value={s.id}>
                {s.nombre}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Listado de citas */}
      <div className="row">
        {citasFiltradas.map((cita) => (
          <div key={cita.id} className="col-md-6 mb-4">
            <div className="card shadow-sm border-0 rounded-4">
              <div className="card-body">
                <h5 className="card-title text-secondary fw-bold mb-3">
                  Cita #{cita.id}
                </h5>
                <p className="mb-1">
                  <User size={16} className="me-2 text-primary" />
                  <strong>Paciente:</strong> {cita.paciente}
                </p>
                <p className="mb-1">
                  <Stethoscope size={16} className="me-2 text-success" />
                  <strong>Médico:</strong> {cita.medico}
                </p>
                <p className="mb-1">
                  <Clock size={16} className="me-2 text-info" />
                  <strong>Sucursal:</strong> {cita.sucursal}
                </p>
                <p className="mb-1">
                  <Clock size={16} className="me-2 text-info" />
                  <strong>Horario:</strong> {cita.fecha_formateada} - {cita.hora}
                </p>

                <span
                  className={`badge ${
                    cita.estado === "pendiente"
                      ? "bg-warning text-dark"
                      : cita.estado === "completada"
                      ? "bg-success"
                      : "bg-danger"
                  } mt-2`}
                >
                  {cita.estado}
                </span>

                <div className="mt-3 d-flex gap-2">
                  <Button
                    variant="outline-primary"
                    size="sm"
                    className="rounded-pill"
                    onClick={() => handleShowModal(cita)}
                  >
                    Reagendar
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    className="rounded-pill"
                    onClick={() => handleCancel(cita.id)}
                  >
                    Cancelar
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal para reagendar */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Reagendar Cita</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-2">
              <Form.Label>Médico</Form.Label>
              <Form.Select
                name="medico_id"
                value={formData.medico_id}
                onChange={handleChange}
              >
                <option value="">Selecciona un médico</option>
                {medicos.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.nombre}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Fecha</Form.Label>
              <Form.Control
                type="date"
                name="fecha"
                value={formData.fecha}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Sucursal</Form.Label>
              <Form.Select
                name="sucursal_id"
                value={formData.sucursal_id}
                onChange={handleChange}
              >
                <option value="">Selecciona una sucursal</option>
                {horasDisponibles.map((d, i) => (
                  <option key={i} value={d.sucursal_id}>
                    {d.sucursal_nombre}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Hora</Form.Label>
              <Form.Select
                name="hora"
                value={formData.hora}
                onChange={handleChange}
              >
                <option value="">Selecciona una hora</option>
                {horasDisponibles
                  .filter((d) => d.sucursal_id === formData.sucursal_id)
                  .flatMap((d) => d.horas_disponibles)
                  .map((h, i) => (
                    <option key={i} value={h}>
                      {h}
                    </option>
                  ))}
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleReagendar}>
            Reagendar
          </Button>
        </Modal.Footer>
      </Modal>
    </motion.div>
  );
};

export default AdminAppointments;

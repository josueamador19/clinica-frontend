import React from "react";

const AppointmentCard = ({ cita }) => {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <p><strong>Fecha:</strong> {cita.fecha}</p>
        <p><strong>Hora:</strong> {cita.hora}</p>
        <p><strong>Médico:</strong> {cita.medico_id}</p>
        <p><strong>Sucursal:</strong> {cita.sucursal_id}</p>
        <p><strong>Estado:</strong> {cita.estado}</p>
        {cita.comentarios && <p><strong>Comentarios:</strong> {cita.comentarios}</p>}
      </div>
    </div>
  );
};

export default AppointmentCard;

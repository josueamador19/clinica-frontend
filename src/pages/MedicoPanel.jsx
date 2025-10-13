import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import MedicoUpcomingAppointments from "../components/medico/MedicoUpcomingAppointments";
import MedicoHistoryAppointments from "../components/medico/MedicoHistoryAppointments";

const MedicoPanel = () => {
    const { user } = useContext(AuthContext);
    const [vista, setVista] = useState("pendientes");

    // Paleta de colores: azul oscuro y verde
    const colors = {
        primary: "#0d6efd", // azul
        secondary: "#6c757d", // gris
        success: "#198754", // verde
        danger: "#dc3545", // rojo
        warning: "#ffc107", // amarillo
        background: "#f8f9fa", // fondo general
    };

    return (
        <div
            className="min-vh-100 p-4"
            style={{
                backgroundColor: colors.background,
                fontFamily: "Arial, sans-serif",
            }}
        >
            <div className="container">
                <h2 className="mb-4" style={{ color: colors.primary }}>
                    Bienvenido, Dr. {user.nombre}
                </h2>

                {/* Botones de cambio de vista */}
                <div className="mb-4 d-flex flex-wrap gap-2">
                    <button
                        className={`btn ${vista === "pendientes" ? "btn-primary" : "btn-outline-primary"}`}
                        onClick={() => setVista("pendientes")}
                    >
                        Citas Pendientes
                    </button>
                    <button
                        className={`btn ${vista === "historial" ? "btn-success" : "btn-outline-success"}`}
                        onClick={() => setVista("historial")}
                    >
                        Historial de Citas
                    </button>
                </div>

                {/* Contenido dinámico según la vista */}
                <div>
                    {vista === "pendientes" && <MedicoUpcomingAppointments medicoId={user.id} />}
                    {vista === "historial" && <MedicoHistoryAppointments medicoId={user.id} />}
                </div>
            </div>
        </div>
    );
};

export default MedicoPanel;

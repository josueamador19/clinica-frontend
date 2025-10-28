import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import MedicoUpcomingAppointments from "../components/medico/MedicoUpcomingAppointments";
import MedicoHistoryAppointments from "../components/medico/MedicoHistoryAppointments";
import { useNavigate } from "react-router-dom";

const MedicoPanel = () => {
    const { user, logout } = useContext(AuthContext);
    const [vista, setVista] = useState("pendientes");
    const navigate = useNavigate();

    // Redirige al login si no hay usuario
    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [user, navigate]);

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    // Paleta de colores
    const colors = {
        primary: "#0d6efd",
        success: "#198754",
        background: "#f8f9fa",
    };

    return (
        <div
            className="min-vh-100 p-4"
            style={{
                backgroundColor: colors.background,
                fontFamily: "Arial, sans-serif",
            }}
        >
            {/* Encabezado */}
            <div className="container d-flex justify-content-between align-items-center mb-4">
                <h2 className="mb-0" style={{ color: colors.primary }}>
                    Bienvenido, Dr. {user?.nombre}
                </h2>
                <button className="btn btn-outline-danger" onClick={handleLogout}>
                    Cerrar Sesión
                </button>
            </div>

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

            {/* Contenido dinámico */}
            <div>
                {vista === "pendientes" && user && (
                    <MedicoUpcomingAppointments medicoId={user.id} />
                )}
                {vista === "historial" && user && (
                    <MedicoHistoryAppointments medicoId={user.id} />
                )}
            </div>
        </div>
    );
};

export default MedicoPanel;

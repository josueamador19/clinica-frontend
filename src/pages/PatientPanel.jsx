import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import ScheduleAppointment from "../components/patient/ScheduleAppointment";
import UpcomingAppointments from "../components/patient/UpcomingAppointments";
import { useNavigate } from "react-router-dom";

const PatientPanel = () => {
    const { user, logout } = useContext(AuthContext);
    const [view, setView] = useState("dashboard");
    const navigate = useNavigate();

    // Redirige al login si no hay usuario
    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [user, navigate]);

    const handleBack = () => setView("dashboard");

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    const cardStyle = {
        backgroundColor: "#ffffff",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        padding: "30px",
        maxWidth: "600px",
        margin: "40px auto",
    };

    const headerStyle = {
        color: "#2c3e50",
        marginBottom: "20px",
        textAlign: "center",
    };

    const buttonStyle = {
        width: "100%",
        padding: "10px",
        marginBottom: "10px",
        borderRadius: "8px",
        fontWeight: "600",
    };

    return (
        <div style={{ minHeight: "100vh", backgroundColor: "#f1f3f6", padding: "20px" }}>
            {/* Encabezado con botón de cierre de sesión */}
            <div className="container d-flex justify-content-between align-items-center mb-3">
                <h4 className="text-dark mb-0">Panel del Paciente</h4>
                <button className="btn btn-outline-danger" onClick={handleLogout}>
                    Cerrar Sesión
                </button>
            </div>

            {view === "dashboard" && (
                <div style={cardStyle}>
                    <h2 style={headerStyle}>¡Bienvenido, {user?.nombre}!</h2>
                    <div className="d-flex flex-column">
                        <button
                            className="btn btn-primary"
                            style={{
                                ...buttonStyle,
                                backgroundColor: "#4e73df",
                                borderColor: "#4e73df",
                            }}
                            onClick={() => setView("schedule")}
                        >
                            Agendar Cita
                        </button>
                        <button
                            className="btn btn-secondary"
                            style={{
                                ...buttonStyle,
                                backgroundColor: "#1cc88a",
                                borderColor: "#1cc88a",
                                color: "#fff",
                            }}
                            onClick={() => setView("history")}
                        >
                            Ver Historial de Citas
                        </button>
                    </div>
                </div>
            )}

            {view === "schedule" && user && (
                <div style={cardStyle}>
                    <button
                        className="btn btn-outline-secondary mb-3"
                        onClick={handleBack}
                        style={{ borderRadius: "8px" }}
                    >
                        ← Volver
                    </button>
                    <ScheduleAppointment />
                </div>
            )}

            {view === "history" && user && (
                <div style={cardStyle}>
                    <button
                        className="btn btn-outline-secondary mb-3"
                        onClick={handleBack}
                        style={{ borderRadius: "8px" }}
                    >
                        ← Volver
                    </button>
                    <UpcomingAppointments />
                </div>
            )}
        </div>
    );
};

export default PatientPanel;

import React, { useState, useContext, useEffect } from "react";
import { motion } from "framer-motion";
import { CalendarDays, Users, Stethoscope, LogOut } from "lucide-react";
import AdminCitas from "../components/admin/AdminAppointments";
import AdminPacientes from "../components/admin/AdminPatients";
import AdminMedicos from "../components/admin/AdminMedicos";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

const AdminPanel = () => {
    const [vista, setVista] = useState("citas");
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    // Redirige al login si no hay sesión
    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [user, navigate]);

    const renderVista = () => {
        switch (vista) {
            case "citas":
                return <AdminCitas />;
            case "pacientes":
                return <AdminPacientes />;
            case "medicos":
                return <AdminMedicos />;
            default:
                return <AdminCitas />;
        }
    };

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <div
            className="min-vh-100 d-flex flex-column"
            style={{
                background: "linear-gradient(135deg, #e3f2fd 0%, #f8f9fa 100%)",
            }}
        >
            {/* Encabezado */}
            <motion.div
                className="container bg-white shadow rounded-4 p-4 mt-4"
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
                    <div className="d-flex align-items-center gap-3">
                        {user && user.foto_url && (
                            <img
                                src={user.foto_url}
                                alt="Perfil"
                                className="rounded-circle"
                                style={{ width: 50, height: 50, objectFit: "cover" }}
                            />
                        )}
                        <h2 className="text-primary fw-bold mb-0">
                            {user ? `Bienvenido, ${user.nombre}` : "Panel de Administración"}
                        </h2>
                    </div>

                    <div className="d-flex align-items-center gap-3 mt-3 mt-md-0">
                        <div className="btn-group me-2" role="group">
                            <button
                                className={`btn ${vista === "citas" ? "btn-primary text-white" : "btn-outline-primary"
                                    } rounded-pill px-4 me-2 d-flex align-items-center gap-2`}
                                onClick={() => setVista("citas")}
                            >
                                <CalendarDays size={18} />
                                Citas
                            </button>
                            <button
                                className={`btn ${vista === "pacientes" ? "btn-success text-white" : "btn-outline-success"
                                    } rounded-pill px-4 me-2 d-flex align-items-center gap-2`}
                                onClick={() => setVista("pacientes")}
                            >
                                <Users size={18} />
                                Pacientes
                            </button>
                            <button
                                className={`btn ${vista === "medicos" ? "btn-info text-white" : "btn-outline-info"
                                    } rounded-pill px-4 d-flex align-items-center gap-2`}
                                onClick={() => setVista("medicos")}
                            >
                                <Stethoscope size={18} />
                                Médicos
                            </button>
                        </div>

                        <Button
                            variant="outline-danger"
                            className="rounded-pill d-flex align-items-center gap-2"
                            onClick={handleLogout}
                        >
                            <LogOut size={18} />
                            Cerrar sesión
                        </Button>
                    </div>
                </div>
            </motion.div>

            {/* Contenido */}
            <motion.div
                className="container bg-white rounded-4 shadow p-4 mt-4 mb-5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                {renderVista()}
            </motion.div>
        </div>
    );
};

export default AdminPanel;

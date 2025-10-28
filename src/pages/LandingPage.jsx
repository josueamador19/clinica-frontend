import React, { useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";

const LandingPage = () => {
    const [showDoctors, setShowDoctors] = useState(false);
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchDoctors = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${backendUrl}/medicos`);
            if (!response.ok) throw new Error("Error al obtener los médicos");
            const data = await response.json();
            setDoctors(data); 
        } catch (error) {
            console.error("Error al obtener los médicos:", error);
            setDoctors([]);
        } finally {
            setLoading(false);
            setShowDoctors(true);
        }
    };

    const cardStyle = {
        backgroundColor: "#ffffff",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        padding: "40px",
        maxWidth: "700px",
        margin: "50px auto",
        textAlign: "center",
        color: "#2c3e50",
    };

    const buttonPrimary = {
        width: "100%",
        padding: "12px",
        borderRadius: "8px",
        fontWeight: "600",
        backgroundColor: "#4e73df",
        borderColor: "#4e73df",
        color: "#fff",
        marginBottom: "10px",
    };

    const buttonSecondary = {
        width: "100%",
        padding: "12px",
        borderRadius: "8px",
        fontWeight: "600",
        backgroundColor: "#1cc88a",
        borderColor: "#1cc88a",
        color: "#fff",
        marginBottom: "10px",
    };

    return (
        <div style={{ backgroundColor: "#f1f3f6", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
            {/* NAVBAR */}
            <nav className="navbar py-3 shadow sticky-top" style={{ backgroundColor: "#4e73df" }}>
                <div className="container d-flex justify-content-between align-items-center">
                    <a className="navbar-brand fw-semibold d-flex align-items-center text-white" href="#">
                        <i className="fa-solid fa-prescription-bottle-medical me-2"></i>
                        Gestion de Citas
                    </a>
                </div>
            </nav>

            {/* HERO */}
            <section style={cardStyle}>
                <h1 style={{ fontSize: "2rem", fontWeight: "700", marginBottom: "20px" }}>
                    Plataforma de Gestión de Citas
                </h1>
                <p style={{ fontSize: "1.1rem", lineHeight: "1.6", marginBottom: "30px" }}>
                    Esta plataforma te ayuda a gestionar tus citas, tiene 3 módulos: paciente, médico y administrador. 
                    Se maneja en 2 sucursales distintas y los médicos tienen horarios en cada sucursal. 
                    Si quieres acceder a ella, debes iniciar sesión.
                </p>
                <Link to="/auth" className="btn" style={buttonPrimary}>
                    Iniciar Sesión
                </Link>

                <button
                    className="btn"
                    style={buttonSecondary}
                    onClick={fetchDoctors}
                >
                    Ver Médicos Activos
                </button>
            </section>

            {/* MODAL DE MÉDICOS */}
            {showDoctors && (
                <div
                    className="modal show d-block"
                    tabIndex="-1"
                    role="dialog"
                    onClick={() => setShowDoctors(false)}
                    style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
                >
                    <div
                        className="modal-dialog modal-dialog-centered modal-lg"
                        role="document"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="modal-content">
                            <div className="modal-header" style={{ backgroundColor: "#4e73df", color: "#fff" }}>
                                <h5 className="modal-title">Médicos Activos</h5>
                                <button type="button" className="btn-close btn-close-white" onClick={() => setShowDoctors(false)}></button>
                            </div>
                            <div className="modal-body">
                                {loading ? (
                                    <p>Cargando médicos...</p>
                                ) : doctors.length === 0 ? (
                                    <p>No hay médicos activos.</p>
                                ) : (
                                    <div className="row g-3">
                                        {doctors.map((doc) => (
                                            <div className="col-sm-6 col-md-4" key={doc.id}>
                                                <div className="card shadow-sm h-100 text-center" style={{ borderRadius: "12px" }}>
                                                    {doc.foto_url ? (
                                                        <img 
                                                            src={doc.foto_url} 
                                                            alt={doc.nombre} 
                                                            className="card-img-top"
                                                            style={{ height: "180px", objectFit: "cover", borderTopLeftRadius: "12px", borderTopRightRadius: "12px" }}
                                                        />
                                                    ) : (
                                                        <div style={{ height: "180px", backgroundColor: "#1cc88a", display: "flex", alignItems: "center", justifyContent: "center", borderTopLeftRadius: "12px", borderTopRightRadius: "12px", color: "#fff" }}>
                                                            Sin Foto
                                                        </div>
                                                    )}
                                                    <div className="card-body">
                                                        <h6 className="card-title fw-bold">{doc.nombre}</h6>
                                                        <p className="card-text small">{doc.email}</p>
                                                        <p className="card-text small">{doc.telefono}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowDoctors(false)}>
                                    Cerrar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* FOOTER */}
            <footer className="text-center py-3 mt-auto" style={{ backgroundColor: "#1cc88a", color: "#fff" }}>
                <small>&copy; 2025 Gerencia Informatica  </small>
            </footer>
        </div>
    );
};

export default LandingPage;

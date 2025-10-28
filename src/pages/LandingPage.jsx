import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const LandingPage = () => {
    return (
        <div className="bg-light text-dark">
            {/* NAVBAR */}
            <nav className="navbar navbar-expand-lg navbar-dark py-3 shadow sticky-top" style={{ backgroundColor: "#0aa4a4" }}>
                <div className="container">
                    <a className="navbar-brand fw-semibold d-flex align-items-center" href="#">
                        <i className="fa-solid fa-prescription-bottle-medical me-2"></i>
                        Buena&nbsp;Salud
                    </a>

                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <i className="fa-solid fa-bars"></i>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarNav">
                        {/* Buscador */}
                        <form className="d-flex ms-auto me-3">
                            <input
                                className="form-control rounded-pill me-2"
                                type="search"
                                placeholder="Buscar…"
                                aria-label="Buscar"
                                style={{ maxWidth: "250px" }}
                            />
                            <button className="btn btn-secondary rounded-pill" type="submit">
                                <i className="fa-solid fa-magnifying-glass"></i>
                            </button>
                        </form>

                        {/* Links */}
                        <ul className="navbar-nav mb-2 mb-lg-0 d-flex align-items-center">
                            <li className="nav-item mx-1">
                                <a className="nav-link text-white fw-medium" href="#hero">
                                    <i className="fa-solid fa-house me-1"></i>Inicio
                                </a>
                            </li>
                            <li className="nav-item mx-1">
                                <a className="nav-link text-white fw-medium" href="#servicios">
                                    <i className="fa-solid fa-hand-holding-medical me-1"></i>Servicio
                                </a>
                            </li>
                            <li className="nav-item mx-1">
                                <a className="nav-link text-white fw-medium" href="#planes">
                                    <i className="fa-solid fa-file-medical me-1"></i>Plan Médico
                                </a>
                            </li>
                            <li className="nav-item mx-1">
                                <a className="nav-link text-white fw-medium" href="#especialistas">
                                    <i className="fa-solid fa-user-doctor me-1"></i>Especialista
                                </a>
                            </li>
                            <li className="nav-item mx-1">
                                <Link to="/auth" className="btn btn-warning fw-semibold rounded-pill">
                                    <i className="fa-solid fa-right-to-bracket me-1"></i>Acceder
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            {/* HERO */}
            <section
                id="hero"
                className="text-center text-white d-flex flex-column justify-content-center align-items-center py-5 position-relative"
                style={{
                    background: "linear-gradient(135deg, #0aa4a4, #036b6b)",
                    minHeight: "65vh",
                }}
            >
                <div className="container py-5">
                    <h1 className="display-5 fw-bold">
                        Farmacia <span className="text-warning">Buena Salud</span>
                    </h1>
                    <p className="lead mb-4">
                        Más de 20 años cuidando de ti y tu familia ― siempre cerca, siempre confiables.
                    </p>
                    <a href="#servicios" className="btn btn-light fw-semibold rounded-pill px-4 py-2 shadow-sm">
                        Conoce nuestros servicios
                    </a>
                </div>
            </section>

            {/* SERVICIOS */}
            <section id="servicios" className="container py-5">
                <h2 className="text-center mb-5 fw-bold text-secondary">Nuestros Servicios</h2>
                <div className="row g-4">
                    {[
                        { icon: "pills", title: "Dispensación 24/7", text: "Medicamentos genéricos y de marca a precios accesibles con asesoría farmacéutica." },
                        { icon: "truck-medical", title: "Entrega a domicilio", text: "Cubrimos toda el área metropolitana en menos de 60 minutos." },
                        { icon: "syringe", title: "Hemograma", text: "Programa completo para adultos y niños, sin cita previa." },
                        { icon: "heart-pulse", title: "Planes Médicos", text: "Suscripciones mensuales que incluyen check-ups, telemedicina y descuentos." },
                        { icon: "stethoscope", title: "Especialistas", text: "Red de médicos certificados disponibles para consulta presencial u online." },
                    ].map((card, i) => (
                        <div className="col-sm-6 col-lg-4" key={i}>
                            <div className="card h-100 text-center border-0 shadow-sm p-4">
                                <i className={`fa-solid fa-${card.icon} fs-2 text-primary mb-3`}></i>
                                <h5 className="fw-semibold text-secondary mb-2">{card.title}</h5>
                                <p className="small text-muted">{card.text}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* SOBRE LA FARMACIA */}
            <section className="bg-white py-5">
                <div className="container text-center">
                    <h2 className="fw-bold text-secondary mb-3">¿Quiénes somos?</h2>
                    <p className="mx-auto" style={{ maxWidth: "850px" }}>
                        Buena&nbsp;Salud es una cadena de farmacias hondureña fundada en 2003. Nuestro objetivo es brindar accesibilidad a la salud mediante un servicio
                        rápido, profesional y humano. Nos especializamos en medicamentos de alta calidad, programas de adherencia terapéutica y soluciones de tele-salud.
                    </p>
                </div>
            </section>

            {/* UBICACIÓN */}
            <section className="bg-light py-5">
                <div className="container text-center">
                    <h2 className="fw-bold text-secondary mb-3">Encuéntranos</h2>
                    <p className="mx-auto" style={{ maxWidth: "850px" }}>
                        Estamos en el corazón de Tegucigalpa, Col. Palmira, a dos cuadras del Parque Redondel.
                    </p>
                    <div className="ratio ratio-16x9 shadow rounded-4 mt-4 mx-auto" style={{ maxWidth: "850px" }}>
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!..."
                            title="Ubicación Farmacia Buena Salud"
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                </div>
            </section>

            {/* FOOTER */}
            <footer className="text-center text-white py-3" style={{ backgroundColor: "#036b6b" }}>
                <small>&copy; 2025 Farmacia Buena Salud &middot; Todos los derechos reservados</small>
            </footer>
        </div>
    );
};

export default LandingPage;

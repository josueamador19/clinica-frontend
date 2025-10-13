// AuthPage.jsx
import React, { useState, useRef, useEffect } from "react";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import "./AuthPage.css";

const AuthPage = () => {
    const [activeTab, setActiveTab] = useState("login");
    const formContainerRef = useRef(null);


    useEffect(() => {
        if (!formContainerRef.current) return;

        const currentHeight = formContainerRef.current.scrollHeight;
        formContainerRef.current.style.height = `${currentHeight}px`;
    }, [activeTab]);

    return (
        <div className="auth-page">

            <div className="auth-buttons">
                <button
                    className={`btn ${activeTab === "login" ? "btn-primary" : "btn-outline-primary"} me-2`}
                    onClick={() => setActiveTab("login")}
                >
                    Iniciar Sesión
                </button>
                <button
                    className={`btn ${activeTab === "register" ? "btn-success" : "btn-outline-success"}`}
                    onClick={() => setActiveTab("register")}
                >
                    Registrarse
                </button>
            </div>

            {/* Contenedor del formulario */}
            <div className="auth-form-container" ref={formContainerRef}>
                {activeTab === "login" && <Login hideTitle />}
                {activeTab === "register" && <Register hideTitle />}
            </div>
        </div>
    );
};

export default AuthPage;

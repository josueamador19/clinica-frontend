import React, { useState, useContext } from "react";
import axios from "axios";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);

      const res = await axios.post("http://localhost:8000/auth/login", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const { access_token, user } = res.data;

      // Guardar en contexto global
      login(user, access_token);

      setMessage(`¡Bienvenido, ${user.nombre}!`);
      setEmail("");
      setPassword("");

      // Redirigir según rol
      switch (user.rol_id) {
        case "abc856dd-ba5f-41ae-8dea-27aa29f8ab47": // Paciente
          navigate("/patient");
          break;
        case "b20c6894-e11b-41aa-864a-b642b94682c1": // Admin
          navigate("/admin");
          break;
        case "5770e7d5-c449-4094-bbe1-fd52ee6fe75f": // Médico
          navigate("/medico");
          break;
        default:
          navigate("/login");
          break;
      }
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.error || "Error al iniciar sesión");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label className="form-label">Correo electrónico</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Contraseña</label>
          <div className="input-group">
            <input
              type={showPassword ? "text" : "password"}
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              className="input-group-text"
              style={{ cursor: "pointer" }}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </span>
          </div>
        </div>

        <button type="submit" className="btn btn-success">
          Ingresar
        </button>
      </form>
      {message && <p className="mt-3">{message}</p>}
    </div>
  );
};

export default Login;

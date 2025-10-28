import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { user, login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");

  // Si ya hay sesión, redirige automáticamente según rol
  useEffect(() => {
    if (user) {
      switch (user.rol_id) {
        case "abc856dd-ba5f-41ae-8dea-27aa29f8ab47":
          navigate("/patient");
          break;
        case "b20c6894-e11b-41aa-864a-b642b94682c1":
          navigate("/admin");
          break;
        case "5770e7d5-c449-4094-bbe1-fd52ee6fe75f":
          navigate("/medico");
          break;
        default:
          navigate("/login");
      }
    }
  }, [user, navigate]);

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

      const { access_token, token_expiration, user } = res.data;

      // Guardar sesión
      login(user, access_token, token_expiration);

      // Redirige según rol
      switch (user.rol_id) {
        case "abc856dd-ba5f-41ae-8dea-27aa29f8ab47":
          navigate("/patient");
          break;
        case "b20c6894-e11b-41aa-864a-b642b94682c1":
          navigate("/admin");
          break;
        case "5770e7d5-c449-4094-bbe1-fd52ee6fe75f":
          navigate("/medico");
          break;
        default:
          navigate("/login");
      }
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.error || "Error al iniciar sesión");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-5 shadow-lg" style={{ width: "400px", borderRadius: "15px" }}>
        <h2 className="text-center mb-4">Iniciar Sesión</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">Correo electrónico</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="ejemplo@gmail.com"
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
                placeholder="********"
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

          <button type="submit" className="btn btn-primary w-100 mt-3" style={{ borderRadius: "10px" }}>
            Ingresar
          </button>
        </form>
        {message && <p className="mt-3 text-center text-danger">{message}</p>}
      </div>
    </div>
  );
};

export default Login;

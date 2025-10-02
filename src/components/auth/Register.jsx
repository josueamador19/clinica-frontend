import React, { useState, useEffect } from "react";
import axios from "axios";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const Register = () => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [emailValid, setEmailValid] = useState(true);
  const [password, setPassword] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rol, setRol] = useState("");        
  const [sucursal, setSucursal] = useState(""); 
  const [telefono, setTelefono] = useState("");
  const [foto, setFoto] = useState(null);
  const [message, setMessage] = useState("");
  const [rolesOptions, setRolesOptions] = useState([]);
  const [sucursalesOptions, setSucursalesOptions] = useState([]);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const res = await axios.get("http://localhost:8000/roles");
        setRolesOptions(res.data);
        if (res.data.length > 0) setRol(res.data[0].id);
      } catch (err) {
        console.error(err);
      }
    };
    const fetchSucursales = async () => {
      try {
        const res = await axios.get("http://localhost:8000/sucursales");
        setSucursalesOptions(res.data);
        if (res.data.length > 0) setSucursal(res.data[0].id);
      } catch (err) {
        console.error(err);
      }
    };
    fetchRoles();
    fetchSucursales();
  }, []);

  useEffect(() => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailValid(regex.test(email) || email === "");
  }, [email]);

  useEffect(() => {
    if (password.length === 0) setPasswordStrength("");
    else if (password.length < 6) setPasswordStrength("Muy corta (mínimo 6)");
    else if (password.length < 10) setPasswordStrength("Débil");
    else if (password.length < 14) setPasswordStrength("Media");
    else setPasswordStrength("Fuerte");
  }, [password]);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!emailValid) return setMessage("Correo inválido");
    if (password.length < 6) return setMessage("Contraseña mínima 6 caracteres");
    if (!rol || !sucursal) return setMessage("Selecciona rol y sucursal");

    try {
      const formData = new FormData();
      formData.append("nombre", nombre);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("telefono", telefono);
      formData.append("rol_id", rol);
      formData.append("sucursal_id", sucursal);
      if (foto) formData.append("foto", foto);

      const res = await axios.post("http://localhost:8000/usuarios", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessage(res.data.message || "Usuario registrado");
      setNombre(""); setEmail(""); setPassword(""); setTelefono("");
      setRol(rolesOptions.length > 0 ? rolesOptions[0].id : "");
      setSucursal(sucursalesOptions.length > 0 ? sucursalesOptions[0].id : "");
      setFoto(null); setPasswordStrength("");
    } catch (err) {
      setMessage(err.response?.data?.error || err.message);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Registro</h2>
      <form onSubmit={handleRegister}>
        <div className="mb-3">
          <label>Nombre completo</label>
          <input type="text" className="form-control" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label>Correo electrónico</label>
          <input type="email" className={`form-control ${!emailValid && "is-invalid"}`} value={email} onChange={(e) => setEmail(e.target.value)} required />
          {!emailValid && <div className="invalid-feedback">Correo inválido</div>}
        </div>
        <div className="mb-3">
          <label>Contraseña</label>
          <div className="input-group">
            <input type={showPassword ? "text" : "password"} className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <span className="input-group-text" style={{ cursor: "pointer" }} onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </span>
          </div>
          {passwordStrength && <small className="text-muted">Contraseña: {passwordStrength}</small>}
        </div>
        <div className="mb-3">
          <label>Rol</label>
          <select className="form-select" value={rol} onChange={(e) => setRol(e.target.value)} required>
            {rolesOptions.map((r) => <option key={r.id} value={r.id}>{r.nombre}</option>)}
          </select>
        </div>
        <div className="mb-3">
          <label>Sucursal</label>
          <select className="form-select" value={sucursal} onChange={(e) => setSucursal(e.target.value)} required>
            {sucursalesOptions.map((s) => <option key={s.id} value={s.id}>{s.nombre}</option>)}
          </select>
        </div>
        <div className="mb-3">
          <label>Teléfono</label>
          <input type="text" className="form-control" value={telefono} onChange={(e) => setTelefono(e.target.value)} />
        </div>
        <div className="mb-3">
          <label>Foto</label>
          <input type="file" className="form-control" onChange={(e) => setFoto(e.target.files[0])} accept="image/*" />
        </div>
        <button type="submit" className="btn btn-primary">Registrarse</button>
      </form>
      {message && <p className="mt-3">{message}</p>}
    </div>
  );
};

export default Register;

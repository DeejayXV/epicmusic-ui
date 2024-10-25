import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/AuthForm.css";

function RegisterPage() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/api/auth/register", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        alert("Registrazione avvenuta con successo!");
        // Pulizia del form dopo la registrazione
        setFormData({
          username: "",
          email: "",
          password: "",
        });
      }
    } catch (error) {
      if (error.response && error.response.data) {
        alert(`Registrazione fallita: ${error.response.data}`);
      } else {
        alert("Registrazione fallita");
      }
      console.error("Errore durante la registrazione", error);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-overlay"></div>
      <div className="auth-content">
        <h1 className="auth-title">Registrati</h1>
        <form onSubmit={handleSubmit} className="auth-form">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
            className="auth-input"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="auth-input"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="auth-input"
          />
          <button type="submit" className="auth-button">Registrati</button>
        </form>
        <button onClick={() => navigate(-1)} className="auth-back-button">Indietro</button>
      </div>
    </div>
  );
}

export default RegisterPage;

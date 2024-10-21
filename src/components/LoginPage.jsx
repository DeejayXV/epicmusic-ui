import React, { useState } from "react";
import axios from "axios";
import "./AuthForm.css";

function LoginPage({ setIsAuthenticated }) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/api/auth/login", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        alert("Login avvenuto con successo!");
        setIsAuthenticated(true); // Imposta l'utente come autenticato dopo un login riuscito
      }
    } catch (error) {
      console.error("Errore durante il login", error);
      alert("Login fallito");
    }
  };

  return (
    <div className="register">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Accedi</button>
      </form>
    </div>
  );
}

export default LoginPage;

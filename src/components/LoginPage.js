import React, { useState } from "react";
import axios from "axios";

function LoginPage() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/api/auth/login", credentials);
      if (response.status === 200) {
        alert("Login effettuato con successo!");
        // Salva il token JWT nella memoria locale per le richieste future
        localStorage.setItem("token", response.data.token);
      }
    } catch (error) {
      console.error("Errore durante il login", error);
      alert("Login fallito");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Username</label>
        <input type="text" name="username" value={credentials.username} onChange={handleChange} required />
      </div>
      <div>
        <label>Password</label>
        <input type="password" name="password" value={credentials.password} onChange={handleChange} required />
      </div>
      <button type="submit">Accedi</button>
    </form>
  );
}

export default LoginPage;

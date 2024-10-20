import React, { useState } from "react";
import axios from "axios";
import "./AuthForm.css";

function RegisterPage() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

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
    <div className="register">
      <h1>Registrati</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
        <button type="submit">Registrati</button>
      </form>
    </div>
  );
}

export default RegisterPage;

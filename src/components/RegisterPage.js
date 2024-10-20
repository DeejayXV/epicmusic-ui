import React, { useState } from "react";
import axios from "axios";

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
    <form onSubmit={handleSubmit}>
      <div>
        <label>Username</label>
        <input type="text" name="username" value={formData.username} onChange={handleChange} required />
      </div>
      <div>
        <label>Email</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
      </div>
      <div>
        <label>Password</label>
        <input type="password" name="password" value={formData.password} onChange={handleChange} required />
      </div>
      <button type="submit">Registrati</button>
    </form>
  );
}

export default RegisterPage;

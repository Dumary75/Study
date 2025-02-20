import { useState } from "react";
import "./RegisterForm.style.css";

export const RegisterForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = "Vorname ist erforderlich.";
    if (!formData.lastName) newErrors.lastName = "Nachname ist erforderlich.";
    if (!formData.email.includes("@")) newErrors.email = "E-Mail ist ungültig.";
    if (!formData.password || formData.password.length < 6)
      newErrors.password = "Passwort muss mindestens 6 Zeichen lang sein.";
    return newErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      console.log("Formular erfolgreich abgeschickt:", formData);
    }
  };

  return (
    <form className="registration-form" onSubmit={handleSubmit}>
      <h1>Benutzerregistrierung</h1>
      <div className="form-group">
        <label>Vorname:</label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
        />
        {errors.firstName && <p className="error">{errors.firstName}</p>}
      </div>
      <div className="form-group">
        <label>Nachname:</label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
        />
        {errors.lastName && <p className="error">{errors.lastName}</p>}
      </div>
      <div className="form-group">
        <label>E-Mail:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <p className="error">{errors.email}</p>}
      </div>
      <div className="form-group">
        <label>Passwort:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        {errors.password && <p className="error">{errors.password}</p>}
      </div>
      <button type="submit" className="submit-button">
        Registrieren
      </button>
    </form>
  );
};

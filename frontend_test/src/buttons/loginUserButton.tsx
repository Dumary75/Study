import { useState } from "react";

export function LoginUserForm() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); // Verhindert das Neuladen der Seite

    try {
      const response = await fetch("http://localhost:5298/usersLogin", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, password })
      });

      if (response.ok) {
        alert(`${name} erfolgreich eingeloggt!`);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="userCreateForm">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username</label>
          <input 
            type="text" 
            id="username"
            value={name} 
            onChange={(e) => setName(e.target.value)} 
          />
        </div>

        <div>
          <label htmlFor="password">Passwort</label>
          <input 
            type="password" 
            id="password"
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
        </div>

        <button type="submit">User einloggen</button>
      </form>
    </div>
  );
}
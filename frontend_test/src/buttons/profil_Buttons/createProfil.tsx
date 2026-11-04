import { useState } from "react";

interface CreateProfilFormProps {
  onCreated: () => void;
}

export function CreateProfilForm({ onCreated }: CreateProfilFormProps) {
  const [name, setName] = useState("");
  const [profilePictureUrl, setProfilePictureUrl] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); // Verhindert das Neuladen der Seite

    try {
      const response = await fetch("http://localhost:5298/profilCreate", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, profilePictureUrl })
      });

      if (response.ok) {
        alert(`${name} erfolgreich erstellt!`);
        setName("");
        setProfilePictureUrl("");
        onCreated();
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="userCreateForm">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="profilname">Profilname</label>
          <input 
            type="text" 
            id="profilname"
            value={name} 
            onChange={(e) => setName(e.target.value)} 
          />
        </div>

        <div>
          <label htmlFor="profilPicture">Profil_Picture</label>
          <input 
            id="profilPicture"
            value={profilePictureUrl} 
            onChange={(e) => setProfilePictureUrl(e.target.value)} 
          />
        </div>

        <button type="submit">Profil erstellen</button>
      </form>
    </div>
  );
}

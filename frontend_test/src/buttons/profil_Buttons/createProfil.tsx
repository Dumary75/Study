import { useState } from "react";

export function CreateProfilForm() {
  const [bio, setBio] = useState("");
  const [ProfilePictureUrl, setProfilePictureUrl] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); // Verhindert das Neuladen der Seite

    try {
      const response = await fetch("http://localhost:5298/profilCreate", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ bio, ProfilePictureUrl })
      });

      if (response.ok) {
        alert(`${bio} erfolgreich erstellt!`);
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
            value={bio} 
            onChange={(e) => setBio(e.target.value)} 
          />
        </div>

        <div>
          <label htmlFor="profilPicture">Profil_Picture</label>
          <input 
            id="profilPicture"
            value={ProfilePictureUrl} 
            onChange={(e) => setProfilePictureUrl(e.target.value)} 
          />
        </div>

        <button type="submit">Profil erstellen</button>
      </form>
    </div>
  );
}
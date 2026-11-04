import { useCallback, useEffect, useState } from "react";
import { type Profil } from "../interfaces/interfaces";
import { CreateProfilForm } from "../buttons/profil_Buttons/createProfil";

interface ProfileGateProps {
  onSelect: (profil: Profil) => void;
}

export function ProfileGate({ onSelect }: ProfileGateProps) {
  const [profiles, setProfiles] = useState<Profil[]>([]);

  const profileHollen = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:5298/myProfiles", {
        method: "GET",
        credentials: "include"
      });

      if (!response.ok) {
        return;
      }

      const fertigeProfile = await response.json();
      setProfiles(fertigeProfile);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    profileHollen();
  }, [profileHollen]);

  async function profilWaehlen(id: number) {
    try {
      // Server prüft den Besitz und stellt ein neues Cookie mit profile_id aus.
      const response = await fetch(`http://localhost:5298/profiles/select/${id}`, {
        method: "POST",
        credentials: "include"
      });

      if (!response.ok) {
        return;
      }

      const gewaehltesProfil = await response.json();
      onSelect(gewaehltesProfil);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="profileGate">
      <h2>Wer schaut gerade?</h2>

      {profiles.length > 0 ? (
        <ul className="profileGate_liste">
          {profiles.map(profil => (
            <li
              key={profil.id}
              className="profil_kachel"
              onClick={() => profilWaehlen(profil.id)}
            >
              {profil.profilePictureUrl ? (
                <img src={profil.profilePictureUrl} alt={profil.name} />
              ) : (
                <div className="profil_kachel_platzhalter">{profil.name.charAt(0)}</div>
              )}
              <span>{profil.name}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p>Noch kein Profil vorhanden – leg das erste an.</p>
      )}

      <CreateProfilForm onCreated={profileHollen} />
    </div>
  );
}

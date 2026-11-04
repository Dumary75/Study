import { useCallback, useEffect, useState } from "react";
import { type Profil } from "../interfaces/interfaces";
import { CreateProfilForm } from "../buttons/profil_Buttons/createProfil";

interface ProfilesProps {
  aktivesProfilId: number;
  onProfileDeleted: () => void;
}

export function Profiles({ aktivesProfilId, onProfileDeleted }: ProfilesProps) {
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

  async function profilLoschen(id: number) {
    try {
      const response = await fetch(`http://localhost:5298/profiles/${id}`, {
        method: "DELETE",
        credentials: "include"
      });

      if (response.ok) {
        await profileHollen();
        onProfileDeleted();
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="profil_ausgabe">
        <h2>Profile verwalten</h2>

        {profiles.length > 0 ? (
          <ul>
            {profiles.map(profil => (
              <li key={profil.id} className="profil_gelisted">
                {/* Linke Seite: Name (+ Markierung des aktiven Profils) */}
                <div>
                  {profil.name}
                  {profil.id === aktivesProfilId && (
                    <span className="aktives_profil"> (aktiv)</span>
                  )}
                </div>
                <div>{profil.profilePictureUrl}</div>

                {/* Löschen nur fürs aktive Profil – der Rest läuft über die Profilwahl */}
                {profil.id === aktivesProfilId && (
                  <div className="profil-aktionen">
                    <span onClick={() => profilLoschen(profil.id)}>Löschen</span>
                  </div>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p>No Items found!</p>
        )}
      </div>

      <br />
      <CreateProfilForm onCreated={profileHollen} />
    </>
  );
}

import { useEffect, useState } from "react";
import { type Profil } from "../interfaces/interfaces";
import { CreateProfilForm } from "../buttons/profil_Buttons/createProfil";

export function Profiles() {
  const [profiles, setProfiles] = useState<Profil[]>([]);
  // Wir speichern die ID des angeklickten Profils (oder null, wenn keins offen ist)
  const [activeId, setActiveId] = useState<number | null>(null);

  useEffect(() => {
    async function profileHollen() {
      try {
        const response = await fetch("http://localhost:5298/myProfiles", {
          method: "GET",
          credentials: "include"
        });

        const fertigeProfile = await response.json();
        setProfiles(fertigeProfile);
      } catch (error) {
        console.log(error);
      }
    }

    profileHollen();
  }, []);

  return (
    <>
      <div className="profil_ausgabe">
        {profiles.length > 0 ? (
          <ul>
            {profiles.map(profil => (
              <li
                key={profil.id}
                className="profil_gelisted"
                // Klick öffnet/schließt genau dieses spezifische Profil
                onClick={() => setActiveId(activeId === profil.id ? null : profil.id)}
              >
                {/* Linke Seite: Bio */}
                <div>{profil.bio}</div>
                <div>{profil.ProfilePictureUrl}</div>

                {/* Rechte Seite: Taucht jetzt DANEBEN auf */}
                {activeId === profil.id && (
                  <div className="profil-aktionen">
                    <span>MyList</span>
                    <span>Löschen</span>
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
      <CreateProfilForm />
    </>
  );
}
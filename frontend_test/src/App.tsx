import { useCallback, useEffect, useState } from "react";

import { type User, type Profil } from "./interfaces/interfaces";

import { CreateUserForm } from "./buttons/createUser";
import { GateDataButton } from "./buttons/gateDataButton"; 
import { LoschenButton } from "./buttons/loschenButton";
import { LoginUserForm } from "./buttons/loginUserButton";
import { LogoutButton } from "./buttons/logoutUserButton";
import { MyList } from "./page_Sections/myList";
import { ProfileGate } from "./page_Sections/profileGate";
import { Profiles } from "./page_Sections/profiles";

function App() {
  const [liste, setListe] = useState<User[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [aktivesProfil, setAktivesProfil] = useState<Profil | null>(null);
  const [authGeprueft, setAuthGeprueft] = useState(false);

    const checkAuth = useCallback(async () => {
      try {
        const response = await fetch("http://localhost:5298/authcheck", {
          method: "GET",
          credentials: "include"
        });

        if(response.ok){
          // { isAuthenticated: true, activeProfile: ... | null }
          const daten = await response.json();
          setIsLoggedIn(true);
          setAktivesProfil(daten.activeProfile);
        } else {
          setIsLoggedIn(false);
          setAktivesProfil(null);
        }

      } catch (error){
        setIsLoggedIn(false);
        setAktivesProfil(null);
      } finally {
        setAuthGeprueft(true);
      }
    }, []);

    useEffect(() => {
      checkAuth();
  },[checkAuth]);

  function ausgeloggt() {
    setIsLoggedIn(false);
    setAktivesProfil(null);
    setListe([]);
  }

  return (
    <>
      <h1>Fullstack Test</h1>

      {!authGeprueft ? (
        <p>Lade...</p>
      ) : !isLoggedIn ? (
        <>
          <CreateUserForm />
          <LoginUserForm onLogin={checkAuth} />
        </>
      ) : !aktivesProfil ? (
        <>
          <LogoutButton onLogout={ausgeloggt} />
          <ProfileGate onSelect={setAktivesProfil} />
        </>
      ) : (
        <>
          <div className="app_header">
            <span className="aktives_profil">Profil: {aktivesProfil.name}</span>
            <button onClick={() => setAktivesProfil(null)}>Profil wechseln</button>
            <LogoutButton onLogout={ausgeloggt} />
          </div>

          <MyList />

          <div className="userAusgabe">
            <GateDataButton 
              setListe={setListe} 
            />

            <ul>
              {liste.map(einzelerUser => (
                <li key={einzelerUser.id}>
                  <span>{einzelerUser.name}</span>
                  <LoschenButton id={einzelerUser.id} />
                </li> 
              ))}
            </ul> 
          </div>

          <Profiles aktivesProfilId={aktivesProfil.id} onProfileDeleted={checkAuth} />
        </>
      )}
    </>
  );
}

export default App;

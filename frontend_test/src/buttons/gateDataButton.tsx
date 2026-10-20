
import type { User } from "../interfaces/interfaces";

// 1. Definiere das Props-Interface für deinen Button
interface UserButtonProps {
  setListe: (daten: User[]) => void;
}



// 3. Die Komponente nimmt die Props entgegen
export function UserButton( {setListe} : UserButtonProps ) {
  

  async function datenHolen() {
    try {
      const daten = await fetch("http://localhost:5298/usersGet", {
        method: "GET",
        credentials: "include"
      });
      const fertigeDaten = await daten.json();
      setListe(fertigeDaten);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <button onClick={datenHolen} className="datenButton">
      Besorge Daten
    </button>
  );
}
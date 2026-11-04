import { useCallback, useEffect, useState } from "react";
import { type MyListItem } from "../interfaces/interfaces";
import { AddMyListForm } from "../buttons/myList_Buttons/addMyList";

export function MyList() {
  const [eintraege, setEintraege] = useState<MyListItem[]>([]);

  const myListHollen = useCallback(async () => {
    try {
      // Das Backend nimmt das aktive Profil aus dem Token, kein Parameter nötig.
      const response = await fetch("http://localhost:5298/myList", {
        method: "GET",
        credentials: "include"
      });

      if (!response.ok) {
        return;
      }

      const fertigeEintraege = await response.json();
      setEintraege(fertigeEintraege);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    myListHollen();
  }, [myListHollen]);

  async function eintragLoschen(id: number) {
    try {
      const response = await fetch(`http://localhost:5298/myList/${id}`, {
        method: "DELETE",
        credentials: "include"
      });

      if (response.ok) {
        await myListHollen();
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="myList_ausgabe">
      <h2>Meine Liste</h2>

      {eintraege.length > 0 ? (
        <ul>
          {eintraege.map(eintrag => (
            <li key={eintrag.id} className="profil_gelisted">
              <div className="myList_eintrag">
                {eintrag.imageUrl && (
                  <img src={eintrag.imageUrl} alt={eintrag.title} className="myList_bild" />
                )}
                <span>{eintrag.title}</span>
              </div>

              <div className="profil-aktionen">
                <span onClick={() => eintragLoschen(eintrag.id)}>Löschen</span>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>Deine Liste ist noch leer.</p>
      )}

      <br />
      <AddMyListForm onCreated={myListHollen} />
    </div>
  );
}

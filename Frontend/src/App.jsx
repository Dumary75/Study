
import { useState } from 'react'
import './App.css'
import './assets/Button'
import Button from './assets/Button'

function App() {
  const [mitarbeiter, setMitarbeiter] = useState([]);

  const holeDatenVomBackend = async () => {
    const antwort = await fetch('http://localhost:5142/api/arbeiter');
    const daten = await antwort.json();
    setMitarbeiter(daten); // State-Update triggert das automatische Re-Rendering!
  };

const addMitarbeiter = async (neuerMitarbeiter) => {
  const response = await fetch('http://localhost:5142/api/arbeiter', {
    method: 'POST', // Wichtig!
    headers: {
      'Content-Type': 'application/json' // .NET muss wissen, dass JSON kommt
    },
    body: JSON.stringify(neuerMitarbeiter) // Das Objekt in einen String verwandeln
  });

  if (response.ok) {
    console.log("Erfolgreich gespeichert!");
  }
};

  //int id, string name, string position, double salary)

  const mitarbeiter_Karl = {
    id: 322,
    name: "peter mafai",
    position: "Faulenzer",
  };

  return (
    <>
      <Button onKlickAktion={holeDatenVomBackend} text="Lade Mitarbeiter" />
      <p>------</p>
      <div className="Liste">
        {mitarbeiter.map(m => <p key={m.id}>{m.name}</p>)}
      </div>
      <p>-------</p>
      <Button 
        onKlickAktion={() => addMitarbeiter(mitarbeiter_Karl)} 
        text="Sende Mitarbeiter" 
      />
    </>
  );
}

export default App

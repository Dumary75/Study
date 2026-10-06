import { useState } from "react"


function App() {
  const[liste, setListe] = useState([]);


async function datenHolen(){
  try {
  const daten = await fetch("http://localhost:5298/api/dein-endpunkt", {
    credentials: "include" // <--- Das schaltet die automatische Cookie-Übertragung ein!
  })
  const fertigeDaten = await daten.json();
  setListe(fertigeDaten);
  } catch (error){
      if(error instanceof Error){
        console.log(error.message);
      } else {
        console.log("Irgendein Fehler!")
      }
  }
};




  return (
    <>
    <h1>Die Liste</h1>
    <br />

    <button onClick={datenHolen}>HolleDaten</button>

    <br />

    <ul>
       {liste.map(daten => <li>{daten}</li>)}
    </ul>


      
    </>  
  )
}

export default App

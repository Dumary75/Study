import { useState } from "react";

import { type User } from "./interfaces/interfaces";

import { CreateUserForm } from "./buttons/createUser";
import { UserButton } from "./buttons/gateDataButton"; 
import { LoschenButton } from "./buttons/loschenButton";

function App() {
  const [liste, setListe] = useState<User[]>([]);

  // ... deine fetch-Logik etc. ...

  return (
    <>
      <h1>Fullstack Test</h1>


<div className="userAusgabe">
            <UserButton 
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



        <CreateUserForm />


    </>
  );
}

export default App;
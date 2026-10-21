import { useState, useEffect } from "react";

import { type User } from "./interfaces/interfaces";

import { CreateUserForm } from "./buttons/createUser";
import { UserButton } from "./buttons/gateDataButton"; 
import { LoschenButton } from "./buttons/loschenButton";
import { LoginUserForm } from "./buttons/loginUserButton";

function App() {
  const [liste, setListe] = useState<User[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
      async function checkAuth(){
        try {
          const response = await fetch("http://localhost:5298/authcheck", {
            method: "GET",
            credentials: "include"
          });


          if(response.ok){
            setIsLoggedIn(true);
          } else {
          setIsLoggedIn(false);
        } 


        } catch (error){
          setIsLoggedIn(false);
        }
      }

      checkAuth();


  },[]);

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
        <LoginUserForm />

        <div>{isLoggedIn? <p>Du bist eingeloggt</p> : <p>Du bist ausgeloggt</p>}</div>

    </>
  );
}

export default App;
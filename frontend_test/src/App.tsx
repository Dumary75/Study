import { useState, useEffect } from "react";

import { type User } from "./interfaces/interfaces";

import { CreateUserForm } from "./buttons/createUser";
import { GateDataButton } from "./buttons/gateDataButton"; 
import { LoschenButton } from "./buttons/loschenButton";
import { LoginUserForm } from "./buttons/loginUserButton";
import { Profiles } from "./page_Sections/profiles";

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

        <div>{isLoggedIn? 
        <>
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

        <Profiles /> 
        </>
        
       
        : 
        <>   
          <CreateUserForm />
          <LoginUserForm />
        </>}</div>

    </>
  );
}

export default App;
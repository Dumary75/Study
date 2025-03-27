import { useState, useRef } from "react";


export default function Player() {
const[playerName,setPlayerName] = useState();
const inputPlayer = useRef();

const playerChanger = () => {
  setPlayerName(inputPlayer.current.value);
  inputPlayer.current.value = '';
}
  
  return (
    <section id="player">
      <h2> Welcome  {playerName ? playerName : 'unknown entity'} </h2>
      <p>
        <input type="text" ref={inputPlayer}/>
        <button onClick={playerChanger}>Set Name</button>
      </p>
    </section>
  );
}

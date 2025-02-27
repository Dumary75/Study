import { useContext } from "react";
import { DarkmodeContext } from './components/Context.jsx';

const App = () => {
    const { mode, setMode } = useContext(DarkmodeContext);

  function changer(){
    setMode((prevState) => (prevState === 'dark'? 'light' : 'dark'))
    console.log(mode);
  }


  return (
      <div className={mode === 'dark'? 'bg_new  light':'bg_new  dark'}>
          <h1>Darkmode_Test</h1>
          <p>{mode}</p>
          <button onClick={changer}>{mode === 'dark'? 'DARK (*)' : 'LIGHT (/\)'}</button>
      </div>
  );
}

export default App;

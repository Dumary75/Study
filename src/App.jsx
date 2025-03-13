
import { useEffect } from "react";
import { useLocation } from "react-router-dom";



function App() {

  const locationApp = useLocation();




useEffect(() => {    
  if(locationApp.state.from === 'FirstPage'){
  alert('JA')
}},[])

  return (
    <>
    <h3>APP, u came from {locationApp.state.from}</h3>
    </>
  )
}

export default App;


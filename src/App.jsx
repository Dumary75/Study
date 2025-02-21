import { useEffect } from "react";
import useLogik from "./useLogic";


function App() {
const{values} = useLogik({name: 'Chuan'});


useEffect(() => {
  console.log(values)
});[values]

  return (
    <>
      <h1>swsadsad</h1>
    </>
  );
}

export default App;

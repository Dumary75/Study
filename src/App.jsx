import { useState } from "react"
import Chart from './components/Chart.jsx';
import Creater from './components/Creater.jsx';


export default function App() {
  const[mainArray,setMainArray] = useState([]);

  return (
      <>
       <Creater mainArray={mainArray} setMainArray={setMainArray} />
       {mainArray.length ? <Chart mainArray={mainArray}/> : 'Found no Charts, create some!'} 
      </>
    )
};


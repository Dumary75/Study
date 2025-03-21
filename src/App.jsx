import { useState } from 'react'
import Header from './components/Header.jsx'
import ResaultTable from './components/ResualtTable.jsx';

function App() {
const[initialInvestment,setInitialInvest] = useState(0);
const[annualInvestment,setAnnualinvest] = useState(0);
const[expectedReturn,setExpReturn] = useState(0);
const[duration,setDuration] = useState(0);




  return (
    <>
    <div id="header">
        <img src="/investment-calculator-logo.png"/>
        <h1>React Investment Calculator</h1>
    </div>

    <Header setInitialInvest={setInitialInvest} setAnnualinvest={setAnnualinvest} setExpReturn={setExpReturn} setDuration={setDuration}/>
    <ResaultTable initialInvestmentApp={initialInvestment} annualInvestmentApp={annualInvestment} expectedReturnApp={expectedReturn} durationApp={duration} />

    </>

  )
}

export default App

import { useState } from 'react'
import Header from './components/Header.jsx'
import ResaultTable from './components/ResualtTable.jsx';

function App() {
const[investmentData,setInvestData] = useState({
  initialInvestment: 100,
  annualInvestment: 0,
  expectedReturn: 0,
  duration: 0
})

const[initialInvestment,setInitialInvest] = useState(0);
const[annualInvestment,setAnnualinvest] = useState(0);
const[expectedReturn,setExpReturn] = useState(0);
const[duration,setDuration] = useState(0);




  return (
    <>
    <Header investmentData={investmentData} setInvestData={setInvestData}/>
    <ResaultTable InvestMentData={investmentData} />
    </>

  )
}

export default App

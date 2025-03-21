import { useState, useEffect } from 'react';
import { calculateInvestmentResults, formatter } from '../util/investment.js';


export default function ResaultTable({ initialInvestmentApp, annualInvestmentApp, expectedReturnApp, durationApp }){
const [investmentData, setInvestmentData] = useState([])


const exampleInvestment = {
    initialInvestment: initialInvestmentApp,
    annualInvestment: annualInvestmentApp,
    expectedReturn: expectedReturnApp,
    duration: durationApp
};

const handleCalculate = () => {
    const results = calculateInvestmentResults(exampleInvestment);

    const formattedResults = results.map((data) => ({
        ...data,
        annualInvestmentFormatted: formatter.format(data.annualInvestment),
        interestFormatted: formatter.format(data.interest),
        valueEndOfYearFormatted: formatter.format(data.valueEndOfYear),
      }));


    setInvestmentData(formattedResults);  
  };


  useEffect(() => {
    console.log(investmentData)
  },[investmentData])



  return (
    <>
      {investmentData.length > 0 ? (
        <table id="result">
          <thead>
            <tr>
              <th>Year</th>
              <th>Investment Value</th>
              <th>Interest (Year)</th>
              <th>Total Interest</th>
              <th>Invested Capital</th>
            </tr>
          </thead>
          <tbody>
            {investmentData.map((data) => {
              // Füge das return hinzu, um die Zeilen korrekt darzustellen
              return (
                <tr key={data.year}>
                  <td>{data.year}</td>
                  <td>{data.annualInvestmentFormatted}</td>
                  <td>{data.interestFormatted}</td>
                  <td>{data.valueEndOfYearFormatted}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <p className="center">No data found!</p>
      )}

      <button onClick={handleCalculate}>KLick</button>
    </>
  );
}




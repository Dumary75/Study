import { useState } from 'react';
import { calculateInvestmentResults, formatter } from '../util/investment.js';


export default function ResaultTable({ InvestMentData }){
const [investmentData, setInvestmentData] = useState([])


const handleCalculate = () => {
    const results = calculateInvestmentResults(InvestMentData);

    const formattedResults = results.map((data) => ({
        ...data,
        annualInvestmentFormatted: formatter.format(data.annualInvestment),
        interestFormatted: formatter.format(data.interest),
        valueEndOfYearFormatted: formatter.format(data.valueEndOfYear),
      }));


    setInvestmentData(formattedResults);  
  };






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
            </tr>
          </thead>
          <tbody>
            {investmentData.map((data) => {

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

      <button  onClick={handleCalculate}>KLick</button>
    </>
  );
}




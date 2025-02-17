import { useState } from "react";
import { Bar, BarChart, XAxis } from "recharts";

export default function Chart({mainArray}){
 const[renderingState,setRenderingState] = useState(0);

 const chartPushen = () => {
    setRenderingState(1)
 }

    return(
        <>
            <div className="RenderingContainer">
                <h1>{mainArray.title}</h1>
                {
                    {
                        1: (
                            <>
                                <BarChart width={250} height={250} data={mainArray.options} margin={{bottom: 20}}>
                                    <Bar dataKey="value" fill={'#000'}/>
                                    <XAxis dataKey={'name'} angle={10} dy={10}/>
                                </BarChart>
                                <button onClick={Polldelete}>Delete</button>
                            </>
                        ),
                        0: (
                            mainArray.options.map((item, index) => (
                                <button key={index} onClick={chartPushen}>{item.name}</button>
                            ))
                        )                    
                    }[renderingState]
                }
             </div>
        </>
    )
}
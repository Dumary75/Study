import { useEffect } from "react";
import { useState } from "react"



export default function QuizTimer({ totalTime, setLength }){
const[timeRemaining,setRemainingTime] = useState(totalTime);


useEffect(() => {

    let timer = setInterval(() => {
        setRemainingTime((oldState) => oldState -100);
    }, 100);

    let totalTimer = setTimeout(() => {
        setLength(
            (oldState) => {return [...oldState,null]}
        );
    }, totalTime);

    return () => {
        clearInterval(timer)
        clearTimeout(totalTimer)
    };

},[])







    return(
        <>
               <progress value={timeRemaining} max={totalTime}/>
        </>
    )
}
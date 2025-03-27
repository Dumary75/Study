import { useState, useRef } from "react";
import Resultmodal from "./Resultmodal";



export default function Challenge({ title, timelimit }){
const [timeConverted,setConvertedTime] = useState(timelimit *1000);
const timerAktive = timeConverted > 0 && timeConverted < timelimit * 1000;

const box = useRef();
const timer = useRef();

function timerStart(){
    setConvertedTime(timelimit *1000);

    timer.current = setInterval(() => {
        setConvertedTime(oldState => oldState -10)
    }, 10);
}

if(timeConverted <= 0){
    box.current.open();
    clearInterval(timer.current);

};

function timerStop(){
    box.current.open();
    clearInterval(timer.current);
}

    return (
        <>
            <Resultmodal
                timeConverted={timeConverted} ref={box}
            />

            <div className="challenge">
                <h2>{title}</h2>
                <p>{timelimit} Seconds</p>
                <p className={timerAktive ? 'active' : ''}>
                    {timerAktive ? 'Time is running...' : 'Time is not active!'}
                </p>
                <button onClick={timerAktive? timerStop : timerStart}>
                    {timerAktive ? 'Stop!' : 'Start!'}
                </button>
            </div>

    </>
  )
}
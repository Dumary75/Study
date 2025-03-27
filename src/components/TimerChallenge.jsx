import { useRef, useState } from "react"
import ResultModal from "./ResultModal";


export default function TimerChallenge({ title, targetTime }){
const[remainTime,setRemainTime] = useState(targetTime * 1000);

const timerAktive = remainTime > 0 && remainTime < targetTime * 1000;

const timer = useRef();
const result = useRef();

if(remainTime <= 0){
    clearInterval(timer.current);
    result.current.open();
}

const startTimer = () => {
    timer.current = setInterval(() => {
            setRemainTime(oldState => oldState - 10)
    }, 10);
};

const stopTimer = () => {
    clearInterval(timer.current);
    result.current.open();
};

    return (
        <>
            
            <ResultModal 
            ref={result} targetTime={targetTime} remainTime={remainTime} setRemainTime={setRemainTime}
            /> 
            
            

            <section className="challenge">
                <h2>{title}</h2>
                <p className="challenge-time">
                    {targetTime} second{targetTime > 1 ? 's' : ''}
                </p>
                <p>
                    <button onClick={timerAktive ? stopTimer : startTimer}>
                        {timerAktive ? 'Stop Challenge' : 'Start Challenge'}
                    </button>
                </p>
                <p className={timerAktive ? 'active' : undefined}>
                        {timerAktive ? 'Time is running...' : 'Timer inactive'}
                </p>
            </section>
        </>
    )
}
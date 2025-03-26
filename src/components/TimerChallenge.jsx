import { useRef, useState } from "react"


export default function TimerChallenge({ title, targetTime }){
const[timeStarted,setTimerStarted] = useState(false);
const[timeExpired,setTimeExpired] = useState(false);
const timer = useRef();

const startTimer = () => {
    timer.current = setTimeout(() => {
        setTimeExpired(true);
        setTimerStarted(false);
        alert('You LOST!');
    }, targetTime * 1000);

    setTimerStarted(true);
};

const stopTimer = () => {
    clearTimeout(timer.current);
    setTimerStarted(false);
    alert('Time stopped!');
};

    return (
        <>
            <section className="challenge">
                <h2>{title}</h2>
                <p className="challenge-time">
                    {targetTime} second{targetTime > 1 ? 's' : ''}
                </p>
                <p>
                    <button onClick={timeStarted ? stopTimer : startTimer}>
                        {timeStarted ? 'Stop Challenge' : 'Start Challenge'}
                    </button>
                </p>
                <p className={timeStarted ? 'active' : undefined}>
                        {timeStarted ? 'Time is running...' : 'Timer inactive'}
                </p>
            </section>
        </>
    )
}
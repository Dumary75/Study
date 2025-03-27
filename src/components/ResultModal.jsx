import { useImperativeHandle, useRef } from "react";

export default function ResultModal({ ref, targetTime, remainTime, setRemainTime }){
const dialog = useRef();

const userLost = remainTime <= 0;
const formattedRemainingTime = (remainTime / 1000).toFixed(2);
const score = Math.round((1 - remainTime / (targetTime * 1000)) *100);

useImperativeHandle(ref,() => {
    return {
        open() {
            dialog.current.showModal();
        }
    };
});

const resetTimer = () => {
    setRemainTime(targetTime * 1000);
};

    return (
        <dialog ref={dialog} className="result-modal" open>
            {userLost && <h2>You Lost!</h2>}
            {!userLost && <h2>Your Score: {score}</h2>}
            <p>
                The target Time was <strong>{targetTime}</strong>
            </p>
            <p>
                You stopped the timer with <strong>{formattedRemainingTime} Seconds left</strong>
            </p>
            <form method="dialog" onSubmit={resetTimer}>
                <button>Close</button>
            </form>

        </dialog>
    );
}
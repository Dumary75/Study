import { useState, useRef, useImperativeHandle } from "react";


export default function Resultmodal({ timeConverted, ref }){
    const resultRef = useRef();

    useImperativeHandle(ref,() => {  
        return {
            open() {
                resultRef.current.showModal(); 
            }
        };
    });



const playerLosed = timeConverted <= 0;


        return (
            <dialog className="result-modal" ref={resultRef}>
                {playerLosed && <h2>You Lose!</h2>}
                {!playerLosed && <h2>You Won!</h2>}
                <form>
                   <button>Close</button>
                </form>


            </dialog>
        );
};
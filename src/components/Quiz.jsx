import { useState } from "react";
import QUESTIONS from '../questions.js';
import completeLogo from '../assets/quiz-complete.png';
import QuizTimer from "./QuizTimer.jsx";

export default function Quiz(){
const[userAnswers,setUserAnswers] = useState([]);
const activeQuestionIndex = userAnswers.length;

const quizCompleted = activeQuestionIndex === QUESTIONS.length;

const answerClicked = ( selectedanswer ) => {

   // If function is currently buggy!
    if(QUESTIONS[activeQuestionIndex].text === selectedanswer.text){
      alert('RIchtig')
    }  

    setUserAnswers((oldState) => {
     return [...oldState,selectedanswer]   
    })
};

if(quizCompleted){
    return (
        <div id="summary">
            <img src={completeLogo} alt="Trophy Icon" />
            <h2>Quiz completed!</h2>
        </div>
    )
}


const shuffeldAnswers = [...QUESTIONS[activeQuestionIndex].answers];
shuffeldAnswers.sort(() => Math.random() - 0.5);

return(
    <div id="quiz">
      <div id="question">
        <QuizTimer totalTime={10000} key={activeQuestionIndex} setLength={setUserAnswers}/>
        <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
        <ul id="answers">
          {shuffeldAnswers.map((answer) => (
            <li key={answer} className="answer">
              <button onClick={() => answerClicked(answer)}>
                {answer}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
  
}
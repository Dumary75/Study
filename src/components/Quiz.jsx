import { useState } from "react";
import QUESTIONS from '../questions.js';
import completeLogo from '../assets/quiz-complete.png';

export default function Quiz(){
const[userAnswers,setUserAnswers] = useState([]);
const activeQuestionIndex = userAnswers.length;

const quizCompleted = activeQuestionIndex === QUESTIONS.length;

const answerClicked = ( selectedanswer ) => {
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
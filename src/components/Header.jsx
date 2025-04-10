import Logoimg from '../assets/quiz-logo.png';


export default function Header(){


    return(
        <header>
            <img src={Logoimg} alt='QuizLogo'/>
            <h1>ReactQuiz</h1>
        </header>
    )
}
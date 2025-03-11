import ProgressBar from "./Progressbar"

export default function StepThree ({ formData ,forwardLogic, backwardLogic, changeData, progress }){

    const valueCheck = () => {
        if(formData.phone && formData.mail !== ''){
            forwardLogic()
        } else {alert('Please fill out all inputs with the right values!')}
    }

    return (
        <>
            <h1>FormData Step 3</h1>
            <form>
                <input type="number" value={formData.phone} placeholder="Phone" name="phone" min="0" max="100" step="1" onChange={() => changeData(event)}/>
                <input type="email" value={formData.mail} placeholder="Mail" name="mail" onChange={() => changeData(event)}/>
            </form>

            <button onClick={backwardLogic}>Back</button> 
            <button onClick={valueCheck}>Next</button>
            <ProgressBar progress={progress}/>
        </>
    )
}






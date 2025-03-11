import ProgressBar from "./Progressbar"

export default function StepTwo ({ formData ,forwardLogic, backwardLogic, changeData, progress }){

    const valueCheck = () => {
        if(formData.street && formData.zip && formData.country !== ''){
            forwardLogic()
        } else {alert('Please fill out all inputs with the right values!')}
    }

    return (
        <>
            <h1>FormData Step 2</h1>
            <form>
                <input type="text" value={formData.street} placeholder="Street" name="street" onChange={() => changeData(event)}/>
                <input type="number" value={formData.zip} placeholder="Zip" name="zip" min="0" max="100" step="1" onChange={() => changeData(event)}/>
                <input type="text" value={formData.country} placeholder="Country" name="country" onChange={() => changeData(event)}/>
            </form>

            <button onClick={backwardLogic}>Back</button> 
            <button onClick={valueCheck}>Next</button>
            <ProgressBar progress={progress}/>
        </>
    )
}






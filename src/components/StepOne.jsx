import ProgressBar from "./Progressbar"


export default function StepOne({  formData ,forwardLogic, changeData, progress }){


    const valueCheck = () => {
        if(formData.firstname && formData.lastname && formData.age !== ''){
            forwardLogic()
        } else {alert('Please fill out all inputs with the right values!')}
    }

    return (
        <>
            <h1>FormData Step 1</h1>
            <form>
                <input type="text" value={formData.firstname} placeholder="Firstname" name="firstname" onChange={() => changeData(event)}/>
                <input type="text" value={formData.lastname} placeholder="Lastname" name="lastname" onChange={() => changeData(event)}/>
                <input type="number" value={formData.age} placeholder="Age" name="age" min="0" max="100" step="1" onChange={() => changeData(event)}/>
            </form>

            <button onClick={valueCheck}>Next</button>
            <ProgressBar progress={progress}/>
        </>
    )
}
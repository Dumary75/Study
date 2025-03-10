
export default function StepTwo ({backwardLogic,formData ,setFormData ,forwardLogic}){

    const changeData = (event) => {
            let name = event.target.name;
            let value = event.target.value;
            setFormData({
                ...formData,[name]: value
            }
            )
    }


    const valueCheck = () => {
        if(formData.street && formData.zip && formData.country !== ''){
            forwardLogic()
        } else {alert('Please fill out all inputs!')}
    }

    return (
        <>
            <h1>FormData Step 2</h1>
            <form>
                <input type="text" value={formData.street} placeholder="Street" name="street" onChange={() => changeData(event)}/>
                <input type="text" value={formData.zip} placeholder="Zip" name="zip" onChange={() => changeData(event)}/>
                <input type="text" value={formData.country} placeholder="Country" name="country" onChange={() => changeData(event)}/>
            </form>

            <button onClick={backwardLogic}>Back</button> 
            <button onClick={valueCheck}>Next</button>
        </>
    )
}






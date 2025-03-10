
export default function StepThree ({backwardLogic,formData ,setFormData ,forwardLogic}){

    const changeData = (event) => {
            let name = event.target.name;
            let value = event.target.value;
            setFormData({
                ...formData,[name]: value
            }
            )
    }


    const valueCheck = () => {
        if(formData.phone && formData.mail !== ''){
            forwardLogic()
        } else {alert('Please fill out all inputs!')}
    }

    return (
        <>
            <h1>FormData Step 3</h1>
            <form>
                <input type="text" value={formData.phone} placeholder="Phone" name="phone" onChange={() => changeData(event)}/>
                <input type="text" value={formData.mail} placeholder="Mail" name="mail" onChange={() => changeData(event)}/>
            </form>

            <button onClick={backwardLogic}>Back</button> 
            <button onClick={valueCheck}>Next</button>
        </>
    )
}






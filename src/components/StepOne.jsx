

export default function StepOne({  formData ,setFormData ,forwardLogic}){

    const changeData = (event) => {
            let name = event.target.name;
            let value = event.target.value;
            setFormData({
                ...formData,[name]: value
            }
            )
    }


    const valueCheck = () => {
        if(formData.firstname && formData.lastname && formData.age !== ''){
            forwardLogic()
        } else {alert('Please fill out all inputs!')}
    }

    return (
        <>
            <h1>FormData Step 1</h1>
            <form>
                <input type="text" value={formData.firstname} placeholder="Firstname" name="firstname" onChange={() => changeData(event)}/>
                <input type="text" value={formData.lastname} placeholder="Lastname" name="lastname" onChange={() => changeData(event)}/>
                <input type="text" value={formData.age} placeholder="Age" name="age" onChange={() => changeData(event)}/>
            </form>

            <button onClick={valueCheck}>Next</button>
        </>
    )
}
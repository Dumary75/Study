import ProgressBar from "./Progressbar"

export default function Confirm({ formData, backwardLogic, progress }){
let confirm = 0;

const confirmLogic = () => {
    if(confirm === 0){
        alert('Data saved!')
        console.log(formData)
        confirm++;
    } else {alert('Already saved!')}

}

    return (
        <>
            <div className="confirmBox">
                <h3>Summary</h3>
                <p>Name: {formData.firstname}</p>
                <p>Lastname: {formData.lastname}</p>
                <p>Age: {formData.age}</p>
                <p>Street: {formData.street}</p>
                <p>Zip: {formData.zip}</p>
                <p>Country: {formData.country}</p>
                <p>Phone: {formData.phone}</p>
                <p>Mail: {formData.mail}</p>
                <button onClick={backwardLogic}>Back</button>
                <button onClick={confirmLogic}>Confirm</button>
            </div>
            <ProgressBar progress={progress}/>
        </>
    )
}



import { useState } from "react"

export default function Creater({mainArray,setMainArray}){
 const[createMode,setCreateMode] = useState(false);
 const[createrArray,setAppArray] = useState({
    title: '',
    option1: '',
    option2: '',
    option3: ''
 })

 const createModeStateChanger = (event) => {
    event.preventDefault();
    setCreateMode((oldState) => !oldState)
 };

 const nameChanger = (event) => {
    let name = event.target.name;
    let wert = event.target.value;

    let newArray = {...createrArray, [name]: wert};
    setAppArray(newArray);
 }

 const saveButton = () => {
   setMainArray(createrArray)
 }

    return(
        <>
        {createMode ? <form>
            <button className="Xbutton" onClick={createModeStateChanger}>X</button>
            <input name="title" onChange={nameChanger} type="text" placeholder="Title"/>
            <input name="option1" onChange={nameChanger} type="text" placeholder="Option 1"/>
            <input name="option2" onChange={nameChanger} type="text" placeholder="Option 2"/>
            <input name="option3" onChange={nameChanger} type="text" placeholder="Option 3"/>
            <button className="formButton" type="button" onClick={saveButton}>Save</button>
        </form> : <button className="CreateButton" onClick={createModeStateChanger}>Create</button>}
        </>
    )
}
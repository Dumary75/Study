import { useState } from "react";

export function CreateTodo({ todoList, setTodoList, newList, setNewList,inputChanger }){
const[createMode,setCreateMode] = useState(false);


const modeChanger = () => {
    setCreateMode((oldState) => !oldState)
}

const createTodo = () => {
// Safe_Check needed!
if (!newList || !newList.task){
    alert('Empty Todo found!')
    return;
}
const newArr = [...todoList,newList];
setTodoList(newArr);
setNewList({});
modeChanger();
}

    return(
        <>
        {createMode === true ? 
            <form>
                <input onChange={inputChanger} type="text" placeholder="Write your task here..."/>
                <button type="button" onClick={createTodo}>Create</button>
                <button type="button" onClick={modeChanger}>Close</button>
            </form>
        : <button className="createButton" onClick={modeChanger}>Create Task</button>}
        </>
    )
}
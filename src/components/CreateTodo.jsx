import { useState } from "react";

export function CreateTodo({ todoList, setTodoList }){
const[createMode,setCreateMode] = useState(false);
const[newList,setNewList] = useState();

const modeChanger = () => {
    setCreateMode((oldState) => !oldState)
}

const createTodo = () => {
// Safe_Check needed!
const newArr = [...todoList,newList];
setTodoList(newArr);
setNewList([]);
modeChanger();
}

const inputChanger = (event) => {
    let task = event.target.value;
    let state = 'active';
    setNewList({ task,state})
}

    return(
        <>
        {createMode === true ? 
            <form>
                <input onChange={inputChanger} type="text" placeholder="Write your task here..."/>
                <button type="button" onClick={createTodo}>Create</button>
            </form>
        : <button className="createButton" onClick={modeChanger}>Create Task</button>}
        </>
    )
}
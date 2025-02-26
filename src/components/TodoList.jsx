import { useState } from "react"
import { CreateTodo } from "./CreateTodo";

export function TodoList(){
const[todoList,setTodoList] = useState([]);

const removeTask = (index) => {
    const updatedList = todoList.filter((_, i) => i !== index);
    setTodoList(updatedList);
};


    return(
        <>
            <div className="TodoLIst">
                {todoList.length > 0 ? 
                <ul>
                {todoList.map((listitem,index) => {
                   return  <div className="Task" id={index} key={index}>
                        <li>{listitem.task}</li>
                        <input type="checkbox" />
                        <button onClick={() => removeTask(index)} className="remove_Task">❌</button>
                    </div>
                })}
                </ul> : <h3>No ListItems aviable,create some!</h3>}
            </div>
            <CreateTodo todoList={todoList} setTodoList={setTodoList}/>
        </>
    )
}
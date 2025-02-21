import { useState } from "react"
import { CreateTodo } from "./CreateTodo";

export function TodoList(){
const[todoList,setTodoList] = useState([]);

    return(
        <>
            <div className="TodoLIst">
                {todoList.length > 0 ? 
                <ul>
                {todoList.map((listitem,index) => {
                   return  <div className="Task">
                        <li key={index}>{listitem.task}</li>
                        <input type="checkbox" />
                    </div>
                })}
                </ul> : <h3>No ListItems aviable,create some!</h3>}
            </div>
            <CreateTodo todoList={todoList} setTodoList={setTodoList}/>
        </>
    )
}
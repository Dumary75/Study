import { useEffect, useState } from "react"
import { CreateTodo } from "./CreateTodo";
import { FilterList } from "./FilterList";

export function TodoList(){
const[todoList,setTodoList] = useState([]);

const removeTask = (index) => {
    const updatedList = todoList.filter((_, i) => i !== index);
    setTodoList(updatedList);
};

/* const changeTask = (index) => {
    const singleTask = todoList.findIndexuser( user =>
        user.index === index ? { ...user, editing: !user.editing } : user
      );

} */

const changeTaskState = (index) => {
    let changedTaskList = todoList.map((element, i) =>
        i === index ? { ...element, state: element.state === "active" ? "complete" : "active" } : element
    );
    setTodoList(changedTaskList);
    console.log(todoList)
}




    return(
        <>
         {/*  Elements above the list */}
        <FilterList todoList={todoList}/>
        <CreateTodo todoList={todoList} setTodoList={setTodoList}/>
        
            <div className="TodoLIst">
                {todoList.length > 0 ? 
                <ul>
                {todoList.map((listitem,index) => {
                   return  <div className={listitem.state === 'active' ? "Task active" : "Task complete"} id={index} key={index}>
                        <li>{listitem.task}</li>
                        <input onChange={() => changeTaskState(index)} type="checkbox" />
                        <button onClick={() => removeTask(index)} className="remove_Task">❌</button>
                        <button className="EditBotton">Edit</button>
                    </div>
                })}
                </ul> : <h3>No ListItems aviable, create some!</h3>}
            </div>
        </>
    )
}
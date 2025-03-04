import { useState } from "react"
import { CreateTodo } from "./CreateTodo";
import { FilterList } from "./FilterList";

export function TodoList(){
const[todoList,setTodoList] = useState([]);
const[newList,setNewList] = useState({});

const inputChanger = (event) => {
    setNewList({ 
        task: event.target.value,
        state: "active",
        editMode: false
    });
};

const removeTask = (index) => {
    const updatedList = todoList.filter((_, i) => i !== index);
    setTodoList(updatedList);
};

const changeTaskState = (index) => {
    let changedTaskList = todoList.map((element, i) =>
        i === index ? { ...element, state: element.state === "active" ? "complete" : "active" } : element
    );
    setTodoList(changedTaskList);
}

const changeEditmode = (index) => {
    let changedTaskList = todoList.map((element, i) =>
        i === index ? { ...element, editMode: !element.editMode ? true : false } : element
    );
    setTodoList(changedTaskList);
}

const savePressed = (index,event) => {
    let ChangedTodoName = todoList.map((element, i) =>
        i === index ? { ...element, 
            editMode: !element.editMode ? true : false,
            task: event.target.value
        } : element
    );
    setTodoList(ChangedTodoName);
}




    return(
        <>
         {/*  Elements above the list */}
        <FilterList todoList={todoList}/>
        <CreateTodo todoList={todoList} 
        setTodoList={setTodoList} 
        newList={newList} 
        setNewList={setNewList} 
        inputChanger={inputChanger}/>
        

            <div>
                {todoList.length > 0 ? 
                <ul>
                {todoList.map((listitem,index) => {
                   return  <div className={listitem.state === 'active' ? "Task active" : "Task complete"} id={index} key={index}>
                        {!listitem.editMode ? 
                        <>
                        <li>{listitem.task}</li> 
                        <input onChange={() => changeTaskState(index)} type="checkbox" />
                        <button onClick={() => removeTask(index)} className="remove_Task">❌</button>
                        <button onClick={() => changeEditmode(index)} className="EditBotton">Edit</button>
                        </>
                        : <>
                        <input placeholder={listitem.task} className="EditTodoName" onChange={inputChanger}></input>
                        <button onClick={(event) => savePressed(index, event)} className="EditBotton">Save</button>
                        </> }        
                    </div>
                })}
                </ul> : <h3>No ListItems aviable, create some!</h3>}
            </div>
        </>
    )
}
import { useState } from "react"

export function FilterList({ setFilteredlist, todoList }){
const[listMode,setlistMode] = useState(false);

const chanceListMode = () => {
    setlistMode((prevState) => !prevState)
}

const activeTaskFilter = () => {
    const activeList = todoList.filter((element) => element.state === 'active');
    setFilteredlist(activeList);
};

const completeTaskFilter = () => {
    const completedList = todoList.filter((element) => element.state === 'complete');
    setFilteredlist(completedList);
};

const viewAllFilter = () => {
    setFilteredlist([])
};


    return (
        <>
        {listMode === true? 
                <ul className="FilterListUL">
                    <li><button onClick={activeTaskFilter}>Active Tasks</button></li>
                    <li><button onClick={completeTaskFilter}>Completed Tasks</button></li>
                    <li><button onClick={viewAllFilter}>View All</button></li>
                    <li><button onClick={chanceListMode}>Close</button></li>
                </ul> : 
                        <button onClick={chanceListMode} className="FilterListButton">List</button>}

        
        </>
    )

}
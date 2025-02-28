import { useState } from "react"

export function FilterList({ todoList }){
const[listMode,setlistMode] = useState(false);

const chanceListMode = () => {
    setlistMode((prevState) => !prevState)
}

    return (
        <>
        {listMode === true? 
                <ul className="FilterListUL">
                <li><button>Active Tasks</button></li>
                <li><button>Completed Tasks</button></li>
                <li><button>View All</button></li>
                <li><button onClick={chanceListMode}>Close</button></li>
            </ul> : <button onClick={chanceListMode} className="FilterListButton">List</button>}

        
        </>
    )

}

import { editUser } from './UserContext';
import CreateButton from "./Funktions/CreateButton"
import { Link } from 'react-router-dom';
import UserForm from './UserForm';
import { useState, useRef } from 'react';




export default function MainPart(){
    const beispielRef = useRef(null);
    const { state } = editUser();
    const[seArch,SetSearch] = useState([]);


function search(){
    let suchValue = beispielRef.current.value.trim();
    const filteredUsers = state.filter(userItem => userItem.name === suchValue);
    SetSearch(filteredUsers);
}

function all(){
 SetSearch([]);
}




    return(

        <>
         <input type="search" ref={beispielRef}/>
         <button onClick={search}>Search</button>
         <button onClick={all}>All</button> <br />

            {state.length >0 
            ? seArch.length <1 ? state.map((user) => <ul className='mainUserList' key={user.id}>
                <li className='userItem'>
                    <Link  to={`/details/${user.name}`}>{user.name}</Link>
                </li>
            </ul>) : seArch.map((user) => <ul className='mainUserList' key={user.id}>
                <li className='userItem'>
                    <Link  to={`/details/${user.name}`}>{user.name}</Link>
                </li>
            </ul>)
            : 'No users found!'} <br />

        <UserForm />
        <CreateButton />
        </>
    )
}
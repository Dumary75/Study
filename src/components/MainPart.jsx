
import { editUser } from './UserContext';
import CreateButton from "./Funktions/CreateButton"
import { Link } from 'react-router-dom';
import UserForm from './UserForm';

export default function MainPart(){
    const { state } = editUser();

    return(

        <>
            {state.length >0 ? state.map((user) => <ul className='mainUserList'>
                <li key={user.id} className='userItem'>
                    <Link key={user.name} to={`/details/${user.name}`}>{user.name}</Link>
                </li>
            </ul>) : 'No users found!'} <br />

        <UserForm />
        <CreateButton />
        </>
    )
}
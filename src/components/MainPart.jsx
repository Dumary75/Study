import { editUser } from './UserContext';
import CreateButton from "./Funktions/CreateButton";
import { Link } from 'react-router-dom';
import UserForm from './UserForm';
import { useState, useRef, useMemo } from 'react';

export default function MainPart() {
    const beispielRef = useRef(null);
    const { state } = editUser();
    const [suchValue, setSuchValue] = useState('');

    const filteredUsers = useMemo(() => {
        if (!suchValue) return [];
        return state.filter(userItem => userItem.name === suchValue);
    }, [state, suchValue]);

    function search() {
        const value = beispielRef.current.value.trim();
        if (value === '') {
            alert("You're looking for nothing...");
        } else {
            setSuchValue(value);
        }
    }

    function all() {
        setSuchValue('');
    }

    return (
        <>
            <input type="search" ref={beispielRef} />
            <button onClick={search}>Search</button>
            <button onClick={all}>All</button>
            <br />

            {state.length > 0 ? (
                (suchValue ? filteredUsers : state).map((user) => (
                    <ul className='mainUserList' key={user.id}>
                        <li className='userItem'>
                            <Link to={`/details/${user.name}`}>{user.name}</Link>
                        </li>
                    </ul>
                ))
            ) : (
                'No users found!'
            )}
            <br />

            <UserForm />
            <CreateButton />
        </>
    );
}

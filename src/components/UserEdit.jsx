
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { editUser } from './UserContext';

export default function UserEdit({ user, aufmachen, aufklappen }) {
 const { state, dispatch } = editUser();
 const navigate = useNavigate();
 const [formState, setFormState] = useState({ name: user.name, email: user.email, role: user.role });

const fieldHandler = (event) => {
  let newFormState = {...formState,[event.target.name]: event.target.value};
  setFormState(newFormState);
};

const isFormValid = Object.values(formState).every(value => value.trim() !== '');

 const Submithandler = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const formDataConverted = Object.fromEntries(formData.entries());
    const filteredUsers = state.filter(userItem => userItem.name !== user.name);
    const updatedUsers = [...filteredUsers, formDataConverted];
    dispatch({ type: "delete", payload: updatedUsers });
    aufklappen();
    navigate('/');
 } 

  return (
    <>
      <dialog open={aufmachen}>
        <form onSubmit={Submithandler}>
            <label htmlFor="name">Name:</label>
            <input id='name' type="text" name='name' defaultValue={user.name} onChange={fieldHandler} required/> <br />
            <label htmlFor="email">Email:</label>
            <input type="email" id='email' name='email' defaultValue={user.email} onChange={fieldHandler} required/> <br />
            <label htmlFor="role">Role:</label>
            <input type="text" id='role' name='role' defaultValue={user.role} onChange={fieldHandler} required/> <br />
            <button  disabled={!isFormValid} className='submitButton'>Submit</button>
        </form>
      </dialog>
    </>
  );
}
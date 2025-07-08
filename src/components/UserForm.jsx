
import { useState } from 'react';
import { ModalSwitch } from './ModalContext';
import { editUser } from './UserContext';

export default function UserForm() {
const { state, dispatch: modalDispatch } = ModalSwitch();
const { dispatch: editDispatch } = editUser();
 const [formState, setFormState] = useState({ name: '', email: '', role: '' });

const fieldHandler = (event) => {
  let newFormState = {...formState,[event.target.name]: event.target.value};
  setFormState(newFormState);
};

const isFormValid = Object.values(formState).every(value => value.trim() !== '');

 const Submithandler = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    editDispatch({ type: "edit", payload: data });
    modalDispatch({ type: 'switch' });
 } 

  return (
    <>
      <dialog open={state}>
        <form onSubmit={Submithandler}>
            <label htmlFor="name">Name:</label>
            <input id='name' type="text" name='name' onChange={fieldHandler} required/> <br />
            <label htmlFor="email">Email:</label>
            <input type="email" id='email' name='email' onChange={fieldHandler} required/> <br />
            <label htmlFor="role">Role:</label>
            <input type="text" id='role' name='role' onChange={fieldHandler} required/> <br />
            <button disabled={!isFormValid} className='submitButton'>Submit</button>
        </form>
      </dialog>
    </>
  );
}
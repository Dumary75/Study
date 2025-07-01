
import { ModalSwitch } from './ModalContext';
import { editUser } from './UserContext';

export default function UserForm() {
const { state, dispatch: modalDispatch } = ModalSwitch();
const { dispatch: editDispatch } = editUser();


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
            <input id='name' type="text" name='name' required/> <br />
            <label htmlFor="email">Email:</label>
            <input type="email" id='email' name='email' required/> <br />
            <label htmlFor="role">Role:</label>
            <input type="text" id='role' name='role' required/> <br />
            <button className='submitButton'>Submit</button>
        </form>
      </dialog>
    </>
  );
}
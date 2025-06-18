
import { ModalSwitch } from './ModalContext';
import { editUser } from './UserContext';

export default function UserForm() {
  const { state } = ModalSwitch();
  const { dispatch } = editUser(); 

 const Submithandler = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    dispatch({ type: "edit",  payload: data })
 } 

  return (
    <>
      <dialog open={state}>
        <form onSubmit={Submithandler}>
            <label htmlFor="name">Name:</label>
            <input id='name' type="text" name='name'/> <br />
            <label htmlFor="email">Email:</label>
            <input type="email" /> <br />
            <label htmlFor="role">Role:</label>
            <input type="text" /> <br />
            <button className='submitButton'>Submit</button>
        </form>
      </dialog>
    </>
  );
}
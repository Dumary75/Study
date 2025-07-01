
import { useNavigate } from 'react-router-dom';
import { editUser } from './UserContext';

export default function UserEdit({ user, aufmachen, aufklappen }) {
 const { state, dispatch } = editUser();
 const navigate = useNavigate();

 const Submithandler = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const formDataConverted = Object.fromEntries(formData.entries());
    const filteredUsers = state.filter(userItem => userItem.name !== user.name);
    const updatedUsers = [...filteredUsers, formDataConverted];
    console.log(updatedUsers);
    dispatch({ type: "delete", payload: updatedUsers });
    aufklappen();
    navigate('/');
 } 

  return (
    <>
      <dialog open={aufmachen}>
        <form onSubmit={Submithandler}>
            <label htmlFor="name">Name:</label>
            <input id='name' type="text" name='name' defaultValue={user.name}  required/> <br />
            <label htmlFor="email">Email:</label>
            <input type="email" id='email' name='email' defaultValue={user.email} required/> <br />
            <label htmlFor="role">Role:</label>
            <input type="text" id='role' name='role' defaultValue={user.role} required/> <br />
            <button  className='submitButton'>Submit</button>
        </form>
      </dialog>
    </>
  );
}
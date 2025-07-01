
import { editUser } from './UserContext';

export default function UserEdit({ user }) {
// const { dispatch: editDispatch } = editUser();


 // const Submithandler = (event) => {
 //   event.preventDefault();

 //   const formData = new FormData(event.target);
 //   const data = Object.fromEntries(formData.entries());
 //   editDispatch({ type: "edit", payload: data });
 //   modalDispatch({ type: 'switch' });
 // } 

  return (
    <>
            <h1>{user.name}</h1>
    </>
  );
}
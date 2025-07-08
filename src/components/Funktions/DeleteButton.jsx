
import { Link } from 'react-router-dom';
import { editUser } from '../UserContext';

export default function DeleteButton({ user }){
 const { state, dispatch } = editUser();

const deleteHandler = () => {
 
  if (confirm("are you sure?") == true) {
    alert(`User: ${user.name} successfully deleted!`)
    const DeleteData = state.filter(userItem => userItem.name !== user.name)
    dispatch({ type: "delete", payload: DeleteData });
  }; 
};
    


return(


        <>
            <Link onClick={deleteHandler} to='/'><button>Delete</button></Link>  
        </>
    );
}
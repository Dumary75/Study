
import { Link } from 'react-router-dom';
import { editUser } from '../UserContext';

export default function DeleteButton({ user }){
 const { state, dispatch } = editUser();

const deleteHandler = () => {

const DeleteData = state.filter(userItem => userItem.name !== user.name)
const Newdata = Object.fromEntries(DeleteData.entries());
console.log(Newdata);
dispatch({ type: "delete", payload: Newdata });

}
    


return(


        <>
            <Link onClick={deleteHandler} to='/'><button>Delete</button></Link>  
        </>
    );
}
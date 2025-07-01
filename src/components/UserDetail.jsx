
import DeleteButton from "./Funktions/DeleteButton";
import EditButton from "./Funktions/EditButton";
import { useParams } from "react-router-dom"
import { editUser } from './UserContext';


export default function UserDetail(){
const {name} = useParams();
const { state } = editUser();

const treffer = state.find(user => user.name === name);

    return(

        <>

                <h2>Deine Daten</h2>
                <ul className="mainUserList">
                    <li>Name: {treffer.name}</li>
                    <li>Rolle: {treffer.role}</li>
                    <li>Email: {treffer.email}</li>
                </ul>
                
                <EditButton user={treffer}/>
                <DeleteButton user={treffer}/>
        </>
    );
}
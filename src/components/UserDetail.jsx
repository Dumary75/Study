
import { useState } from "react";
import DeleteButton from "./Funktions/DeleteButton";
import EditButton from "./Funktions/EditButton";
import { useParams } from "react-router-dom"
import { editUser } from './UserContext';
import UserEdit from './UserEdit';


export default function UserDetail(){
const [aufmachen,setAufmachen] = useState(false);    
const {name} = useParams();
const { state } = editUser();

const treffer = state.find(user => user.name === name);

function aufklappen() {
  setAufmachen(prevState => !prevState);
}

    return(

        <>
                {aufmachen? 
                <>
                 <UserEdit user={treffer} aufmachen={aufmachen} aufklappen={aufklappen}/>
                </> : <>

                <h2>Deine Daten</h2>
                <ul className="mainUserList">
                    <li>Name: {treffer.name}</li>
                    <li>Rolle: {treffer.role}</li>
                    <li>Email: {treffer.email}</li>
                </ul>

                <EditButton aufklappen={aufklappen}/>
                <DeleteButton user={treffer}/> </>
                }
        </>
    );
}

import DeleteButton from "./Funktions/DeleteButton";
import EditButton from "./Funktions/EditButton";
import Header from "./Header";


export default function UserDetail({ user }){

    return(

        <>

                All infos about user Objekt - ID to give specific inos 
                
                <EditButton />
                <DeleteButton />
        </>
    );
}
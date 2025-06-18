
import { ModalSwitch } from '../ModalContext';


export default function CreateButton(){
  const { dispatch } = ModalSwitch();

    return(

        <>
            <button onClick={() => dispatch({ type: "switch" })}>Create</button>
        </>
    );
}
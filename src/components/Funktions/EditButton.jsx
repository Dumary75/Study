




export default function EditButton({ setAufmachen }){


function aufklappen() {
  setAufmachen(prevState => !prevState);
}

    return(

        <>
            <button onClick={aufklappen}>Edit</button> 
        </>
    );
}
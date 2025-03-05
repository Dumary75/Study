import { useState } from "react";

export default function useCustomHook( defaultValues ){
const[values,setValues] = useState(defaultValues);


const inputHandler = (event) => {
const{name,value} = event.target;
setValues((prevValues) => ({...prevValues,[name]: value}))
}

const submit = () => {
   console.log(values)
}

return {
    values,
    submit,
    inputHandler
}
    
}
import { useState } from "react"

export default function useLogik(data){
const[values,setValues] = useState(data)

return {values}

}
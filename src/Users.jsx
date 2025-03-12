import { useParams } from "react-router-dom"

export default function Users() {
const {age,name} = useParams();

    return (
      <>
        <h3 style={{color:'#FFF'}}>Hello {age} and {name}</h3>
      </>
    )
  }
  

  
  
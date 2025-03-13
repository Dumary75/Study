import { useNavigate } from "react-router-dom"


export default function Users() {


const naVi = useNavigate();

const leiten = () => {
  naVi('/app', {
    state: { from: 'FirstPage' }
  });
}  

    return (
      <>
        <h3>Hello Users</h3>
        <button onClick={leiten}>Leiten</button>
      </>
    )
  }
  



  
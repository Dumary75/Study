import { useState } from "react";
import StepOne from './components/StepOne.jsx';
import StepTwo from './components/StepTwo.jsx';
import StepThree from './components/StepThree.jsx';
import Confirm from './components/Confirm.jsx';


function App() {
  const [stepState, setStepState] = useState(1); 
  const [formData,setFormData] = useState({
    firstname: '',
    lastname: '',
    age: '',
    street: '',
    zip: '',
    country: '',
    phone: '',
    mail: ''
  });

  /* Button Logics */
const backwardLogic = () => {
  setStepState((oldState) => (oldState = oldState -1))
}

const forwardLogic = () => {
  setStepState((oldState) => (oldState = oldState +1))
}



  /* SiteLogics */
  switch (stepState) {
    case 1:
      return <StepOne formData={formData} setFormData={setFormData} forwardLogic={forwardLogic}/>;
    case 2:
      return <StepTwo formData={formData} setFormData={setFormData} backwardLogic={backwardLogic} forwardLogic={forwardLogic}/>;
    case 3:
      return <StepThree formData={formData} setFormData={setFormData} backwardLogic={backwardLogic} forwardLogic={forwardLogic}/>;
    case 4:
      return <Confirm formData={formData}  backwardLogic={backwardLogic}/>;
    default:
      return <div>Error, please contact the support!</div>; 
  }
}

export default App;


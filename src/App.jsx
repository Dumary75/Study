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

  /* Button / Function Logics */
const backwardLogic = () => {
  setStepState((oldState) => (oldState = oldState -1))
}

const forwardLogic = () => {
  setStepState((oldState) => (oldState = oldState +1));
}

const changeData = (event) => {
  setFormData({
      ...formData,[event.target.name]: event.target.value
  }
  )
}

/* ProgressBar */
const totalSteps = 4;
const progress = (stepState / totalSteps) * 100;


  /* Sitestructur */
  switch (stepState) {
    case 1:
      return <StepOne formData={formData} forwardLogic={forwardLogic} changeData={changeData} progress={progress}/>;
    case 2:
      return <StepTwo formData={formData} backwardLogic={backwardLogic} forwardLogic={forwardLogic} changeData={changeData} progress={progress}/>;
    case 3:
      return <StepThree formData={formData} backwardLogic={backwardLogic} forwardLogic={forwardLogic} changeData={changeData} progress={progress}/>;
    case 4:
      return <Confirm formData={formData}  backwardLogic={backwardLogic} progress={progress}/>;
    default:
      return <div>Error, please contact the support!</div>; 
  }
}

export default App;


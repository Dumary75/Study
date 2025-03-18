import { useState } from 'react';
import validator from 'validator';


function App() {
const[user,setUser] = useState({
  username: '',
  mail: '',
  password: '',
  confirmPassword: ''
})

const[mailValidator,setMailValidator] = useState(false);

const emailRegEx = /^[a-zA-Z0-9._%+-]{3,}@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const mailChecker = () => {
  if(emailRegEx.test(user.mail)){
      setMailValidator(true);
  } else {setMailValidator(false)}
}

const mailChanger = (event) => {
 let mailValue = event.target.value.toLowerCase()

  setUser(
    {...user,mail: mailValue}
  )

  mailChecker();
}

const userNameChanger = (event) => {
  let userValue = event.target.value.toLowerCase()

  setUser({...user,
    username: userValue
  })

}

  return (
    <>
    
    <div className="formBlock">
      <form>
        <label htmlFor="userName">Username:</label>
        <input type="text" name='userName' className={user.username.length>0 ? 'validate' : 'invalide'} placeholder='Username' onChange={userNameChanger}/>

        <label htmlFor="mail">Email:</label>
        <input type="text" name='mail' className={mailValidator ? 'validate' : 'invalide'} onChange={mailChanger} placeholder='Email'/>
      </form>
    </div>

    </>
  )
}

export default App;


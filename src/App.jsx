import { useState, useEffect } from 'react';

function App() {
  const [user, setUser] = useState({
    username: '',
    mail: '',
    passwort: '',
    confirmPassword: ''
  });

  const [mailValidator, setMailValidator] = useState(false);
  const [passwordValidator, setPasswordValidator] = useState(false);

  const emailRegEx = /^[a-zA-Z0-9._%+-]{3,}@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  // -- Username -- //
  const userNameChanger = (event) => {
    setUser(prevUser => ({
      ...prevUser,
      username: event.target.value.toLowerCase()
    }));
  };

  // -- Email -- //
  useEffect(() => {
    setMailValidator(emailRegEx.test(user.mail));
  }, [user.mail]);

  const mailChanger = (event) => {
    setUser(prevUser => ({
      ...prevUser,
      mail: event.target.value.toLowerCase()
    }));
  };

  // -- Password -- //
  useEffect(() => {
    setPasswordValidator(passwordRegEx.test(user.passwort));
  }, [user.passwort]);

  const passwordChanger = (event) => {
    setUser(prevUser => ({
      ...prevUser,
      passwort: event.target.value
    }));
  };

  return (
    <>
      <div className="formBlock">
        <form>
          <label htmlFor="userName">Username:</label>
          <input type="text" name='userName' className={user.username.length > 2 ? 'validate' : 'invalide'} placeholder='Username' onChange={userNameChanger} />

          <label htmlFor="mail">Email:</label>
          <input type="text" name='mail' className={mailValidator ? 'validate' : 'invalide'} onChange={mailChanger} placeholder='Email' />

          <label htmlFor="password">Passwort:</label>
          <input type="text" name='passwort' className={passwordValidator ? 'validate' : 'invalide'} onChange={passwordChanger} />
        </form>
      </div>
    </>
  );
}

export default App;

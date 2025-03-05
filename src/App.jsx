
import useCustomHook from './components/useCustomHook.jsx';

function App() {
const{ values, inputHandler, submit } = useCustomHook({
  username: "",
  password: ""
})


  return (
    <>
      <h1>Test</h1>
      <form>
        <input 
          type="text" 
          onChange={inputHandler}
          name='username'
          placeholder='username'
          value={values.username}
        />

        <input 
        type="text" 
        onChange={inputHandler}
        name='password'
        placeholder='password'
        value={values.password}
        />

        <button onClick={submit} type='button'>Absenden</button>
      </form>

    </>
  );
}

export default App;

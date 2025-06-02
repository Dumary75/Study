import Header from './components/Header';
import Auth from './components/Auth';
import Counter from './components/Counter';
import { useSelector } from 'react-redux';



function App() {
const loggedIn = useSelector((state) => state.auth.loggedIn);

  return (
    <>
    {loggedIn ? <Header /> :  <Auth />}
      <Counter />
    </>
  );
}

export default App;

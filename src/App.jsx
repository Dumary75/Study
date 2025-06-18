
import UserList from './components/UserList.jsx';
import { UserProvider } from './components/UserContext.jsx';
import { ModalProvider } from './components/ModalContext.jsx';

function App() {


  return (
    <ModalProvider>
      <UserProvider>
        <UserList />
      </UserProvider>
    </ModalProvider>
  )
}

export default App

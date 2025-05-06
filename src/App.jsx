import { lazy, Suspense, useState } from 'react';

const TestLazy = lazy(() => import('./components/Test.jsx'));

function App() {
const[lazy,Setlazy] = useState(false);

const setter = () => {
  Setlazy((oldState) => !oldState)
}

  return (
    <>
      <button onClick={setter}>X</button>

      {lazy? 
            <Suspense fallback='Uff... das Dauert!'>
            <TestLazy />
        </Suspense> : 'Nix'  
    }

    </>
  )
}

export default App


import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Todos from './components/Todos';
import AddTodo from './components/AddTodo';


const queryClient = new QueryClient();

function App() {
  return (
    <>
        <QueryClientProvider client={queryClient}>
            <Todos />
            <AddTodo />
        </QueryClientProvider>
    </>
  );
}

export default App

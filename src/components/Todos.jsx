
import { useQuery } from '@tanstack/react-query';


export default function Todos(){
  const { data, isLoading, error } = useQuery({
    queryKey: ['todos'],
    queryFn: async () => {
      const res = await fetch(`https://jsonplaceholder.typicode.com/todos?_limit=10`);
      if (!res.ok) throw new Error('Netzwerkfehler');
      return res.json();
    },
  });

  if (isLoading) return <p>Lade Benutzer...</p>;
  if (error) return <p>Fehler: {error.message}</p>;


    return (

        <>
        <h2>Todos</h2>
            <ul>
               {data.map((todo) => <li key={todo.id}>
                 <p>Title: {todo.title}</p>
                 <p>completed: {todo.completed}</p>
               </li>)}
            </ul>
        </>
    );
}
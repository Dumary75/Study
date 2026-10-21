

export function LoschenButton({ id }: { id: number }) {
  
  async function loschen(id: number) {
    try {
// ✅ RICHTIG: Backticks auflösen die Variable auf -> ?id=5
const response = await fetch(`http://localhost:5298/usersDelete/${id}`, {
  method: "DELETE",
  credentials: "include"
});

      
      if (response.ok) {
        alert("User erfolgreich gelöscht!");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <button onClick={() => loschen(id)}>
      Löschen
    </button>
  );
}
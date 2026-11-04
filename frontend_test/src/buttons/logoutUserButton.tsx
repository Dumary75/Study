interface LogoutButtonProps {
  onLogout: () => void;
}

export function LogoutButton({ onLogout }: LogoutButtonProps) {

  async function ausloggen() {
    try {
      const response = await fetch("http://localhost:5298/usersLogout", {
        method: "POST",
        credentials: "include"
      });

      if (response.ok) {
        onLogout();
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <button onClick={ausloggen} className="logoutButton">
      Ausloggen
    </button>
  );
}

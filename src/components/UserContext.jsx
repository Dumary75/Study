
import { createContext, useReducer, useContext } from "react";

const UserContext = createContext();

const initialState = [];

function userReducer(state, action) {
  switch (action.type) {
    case "edit":
      return [...state, action.payload]; 

    case "delete":
      return [action.payload]; 

    default:
      return state;
  }
}

export function UserProvider({ children }) {
  const [state, dispatch] = useReducer(userReducer, initialState);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
}

export function editUser() {
  return useContext(UserContext);
}

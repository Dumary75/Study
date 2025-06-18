
import { createContext, useReducer, useContext } from "react";

const ModalContext = createContext();

const initialState = false;

function modalReducer(state, action) {
  switch (action.type) {
    case "switch":
      return !state;

    default:
      return state;
  }
}

export function ModalProvider({ children }) {
  const [state, dispatch] = useReducer(modalReducer, initialState);

  return (
    <ModalContext.Provider value={{ state, dispatch }}>
      {children}
    </ModalContext.Provider>
  );
}

export function ModalSwitch() {
  return useContext(ModalContext);
}

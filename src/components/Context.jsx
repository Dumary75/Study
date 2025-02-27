import { createContext,useState} from "react";

export const DarkmodeContext = createContext();

export const DarkProvider = ( { children }) => {
    const[mode,setMode] = useState('dark');

    return (
        <DarkmodeContext.Provider value={{ mode,setMode}}>
            { children}
        </DarkmodeContext.Provider>
    );
};



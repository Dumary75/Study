import { useState,useEffect } from "react";


export default function useWindowSize(){
const[windowSize,setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
});

const reziseFunction = () => {
    setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
    })
};

useEffect(() => {

    window.addEventListener('resize',reziseFunction)

    return () => {
        window.removeEventListener('resize', reziseFunction);
      };

}),[]

return {
    windowSize
}


}
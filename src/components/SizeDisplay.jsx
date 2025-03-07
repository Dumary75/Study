import useWindowSize from "./useWindowSize.jsx"

export default function SizeDisplay(){
const{ windowSize } = useWindowSize();

const pStyle = {
    color: '#FFF'
}

    return(
        <>
            <h2>Fenstergröße</h2>
            <p style={pStyle}>Breite: {windowSize.width} PX</p>
            <p style={pStyle}>Höhe: {windowSize.height} PX</p>
        </>
    )


};
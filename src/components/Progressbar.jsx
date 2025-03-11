

export default function ProgressBar({ progress }){

    return (
        <>
                <div className="progressbarBox">
                    <div className="progressBar" style={{ width: `${progress}%` }}>Progress: {progress}%</div>
                </div>
        </>
    )
}
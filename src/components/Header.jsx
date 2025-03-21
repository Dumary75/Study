


export default function Header({ setInitialInvest, setAnnualinvest, setExpReturn, setDuration }){

const valueChanger = (setter,event) => {

    let value = event.target.value;

    setter(value)

}

    return (
        <>
        
            <div id="user-input">
                <div className="input-group">
                        <div id="user-input">
                            <label htmlFor="initialInvest">initial Investment</label>
                            <input name="initialInvest" type="number" min={1} onChange={(event) => {valueChanger(setInitialInvest,event)}}/>
                        </div>

                        <div id="user-input">
                            <label htmlFor="annualInvest">Annual Investment</label>
                            <input name="annualInvest" type="number" min={1} onChange={(event) => {valueChanger(setAnnualinvest,event)}}/>
                        </div>
                </div>
                <div className="input-group">
                <div id="user-input">
                            <label htmlFor="expectedReturn">Expected Return</label>
                            <input name="expectedReturn" type="number" min={1} onChange={(event) => {valueChanger(setExpReturn,event)}}/>
                        </div>


                        <div id="user-input">
                            <label htmlFor="duration">Duration</label>
                            <input name="duration" type="number" min={1} onChange={(event) => {valueChanger(setDuration,event)}}/>
                        </div>
                </div>
            </div>


        </>
    )


}
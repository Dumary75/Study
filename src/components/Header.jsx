


export default function Header({ investmentData, setInvestData }){

const valueChanger = (setter,event) => {

    let value = Number(event.target.value);

    const newInvestData = {...investmentData,[setter]: value};
    setInvestData(newInvestData);
}

    return (
        <>
                <div id="header">
                    <img src="/investment-calculator-logo.png"/>
                    <h1>React Investment Calculator</h1>
                </div>

            <div id="user-input">
                <div className="input-group">
                        <div id="user-input">
                            <label htmlFor="initialInvest">initial Investment</label>
                            <input name="initialInvest" type="number" min={1} onChange={(event) => {valueChanger("initialInvestment",event)}} value={setInvestData.initialInvestment}/>
                        </div>

                        <div id="user-input">
                            <label htmlFor="annualInvest">Annual Investment</label>
                            <input name="initialInvest" type="number" min={1} onChange={(event) => {valueChanger("annualInvestment",event)}} value={setInvestData.initialInvestment}/>
                        </div>
                </div>
                <div className="input-group">
                <div id="user-input">
                            <label htmlFor="expectedReturn">Expected Return</label>
                            <input name="initialInvest" type="number" min={1} onChange={(event) => {valueChanger("expectedReturn",event)}} value={setInvestData.initialInvestment}/>
                        </div>


                        <div id="user-input">
                            <label htmlFor="duration">Duration</label>
                            <input name="initialInvest" type="number" min={1} onChange={(event) => {valueChanger("duration",event)}} value={setInvestData.initialInvestment}/>
                        </div>
                </div>
            </div>


        </>
    )


}
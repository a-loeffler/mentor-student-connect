import { useState } from "react";


const IdentityBoxes = () => {

    const [identityMessage, setIdentityMessage] = useState("")


return (
    <>
        <div className="identity-boxes-container">
            <div className="identity-boxes-positioner">
                <div className="identity-box left-box white-fill"
                    onMouseEnter={() => setIdentityMessage("We build and nurture connections between students and community mentors.")}
                    onMouseLeave={() => setIdentityMessage("")}
                    >
                    <div className="identity-box-icon-container">
                        <img className="identity-box-icon" src="/images/checklist.svg" alt="What we do"></img>
                    </div>
                    <h1 className="identity-box-h1">What</h1>
                    <h2 className="identity-box-h2">We Do</h2>
                </div>
                <div className="identity-box center-box blue-fill"
                    onMouseEnter={() => setIdentityMessage("We believe that every student should have someone who believes in them.")}
                    onMouseLeave={() => setIdentityMessage("")}
                    >
                    <div className="identity-box-icon-container">
                        <img className="identity-box-icon" src="/images/lightbulb.svg" alt="Why we do it"></img>
                    </div>
                    <h1 className="identity-box-h1">Why</h1>
                    <h2 className="identity-box-h2">We Do It</h2>
                </div>
                <div className="identity-box right-box white-fill"
                    onMouseEnter={() => setIdentityMessage("We do it for the builders and leaders of tomorrow.  We want to inspire their success today.")}
                    onMouseLeave={() => setIdentityMessage("")}
                    >
                    <div className="identity-box-icon-container">
                        <img className="identity-box-icon" src="/images/person.svg" alt="Who we do it for"></img>
                    </div>
                    <h1 className="identity-box-h1">Who</h1>
                    <h2 className="identity-box-h2">We Do It For</h2>
                </div>
            </div>
        </div>
        <div className="identity-box-description-container">
            <h1 className="identity-box-description">{identityMessage}</h1>
        </div>
        <div className="identity-box-whitespace"></div>
    </>
)

}

export default IdentityBoxes;

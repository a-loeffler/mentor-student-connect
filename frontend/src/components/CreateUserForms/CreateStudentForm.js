import { useState } from "react"



const CreateStudentForm = () => {
    const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [confirmEmail, setConfirmEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [zipcode, setZipcode] = useState("");  //remember to make this a string on form submit

    const [errors, setErrors] = useState([]);
    const [passwordErrors, setPasswordErrors] = useState([]);
    const [emailErrors, setEmailErrors] = useState([])

    const mentor = false;
    const student = true;


    const confirmEmailActions = (e => {
        setConfirmEmail(e.target.value)

        if (email !== confirmEmail) {
            setEmailErrors(["Emails do not match"])

        } else {
            setEmailErrors([]);
        }
    })

    const confirmPasswordActions = (e) => {
        setConfirmPassword(e.target.value)

        if (password !== confirmPassword) {
            setPasswordErrors(["Passwords do not match"])

        } else {
            setPasswordErrors([]);
        }
    }


    return (
        <div className="create-user-form-container">
            <form className="create-user-form student-form">

                <div className="create-user-field-container">
                    <label className="create-user-field-label" htmlFor="student-firstname">First Name: </label>
                    <input
                        type="text"
                        className="create-user-field-input"
                        id="student-firstname"
                        value={firstName}
                        onChange={e => setFirstName(e.target.value)} >
                    </input>
                </div>

                <div className="create-user-field-container">
                    <label className="create-user-field-label" htmlFor="student-lastname">Last Name: </label>
                    <input
                        type="text"
                        className="create-user-field-input"
                        id="student-lastname"
                        value={lastName}
                        onChange={e => setLastName(e.target.value)} >
                    </input>
                </div>

                <div className="create-user-field-container">
                    <label className="create-user-field-label" htmlFor="student-username">Create a Username: </label>
                    <input
                        type="text"
                        className="create-user-field-input"
                        id="student-username"
                        value={username}
                        onChange={e => setUsername(e.target.value)} >
                    </input>
                </div>

                <div className="create-user-field-container">
                    <label className="create-user-field-label" htmlFor="student-email">Email: </label>
                    <input
                        type="text"
                        className="create-user-field-input"
                        id="student-email"
                        placeholder="example@domain.com"
                        value={email}
                        onChange={e => setEmail(e.target.value)} >
                    </input>
                </div>

                <div className="create-user-field-container">
                    <label className="create-user-field-label" htmlFor="student-confirmemail">Confirm Email: </label>
                    <input
                        type="text"
                        className="create-user-field-input"
                        id="student-confirmemail"
                        placeholder="example@domain.com"
                        value={confirmEmail}
                        onChange={e => confirmEmailActions(e)} >
                    </input>
                </div>

                <div className="form-error-box">
                    <ul className="form-error-list">
                        {emailErrors.map((error, index) => <li className="form-error-list-item" key={index} >{error}</li>)}
                    </ul>
                </div>

                <div className="create-user-field-container">
                    <label className="create-user-field-label" htmlFor="student-zipcode">Zipcode of Primary Residence: </label>
                    <input
                        type="text"
                        className="create-user-field-input"
                        id="student-zipcode"
                        placeholder="12345"
                        value={zipcode}
                        onChange={e => setZipcode(e.target.value)} >
                    </input>
                </div>

                <div className="create-user-field-container">
                    <label className="create-user-field-label" htmlFor="student-password">Choose a Password: </label>
                    <input
                        type="password"
                        className="create-user-field-input"
                        id="student-password"
                        value={password}
                        onChange={e => setPassword(e.target.value)} >
                    </input>
                </div>

                <div className="create-user-field-container">
                    <label className="create-user-field-label" htmlFor="student-confirmpassword">Confirm Password: </label>
                    <input
                        type="password"
                        className="create-user-field-input"
                        id="student-confirmpassword"
                        value={confirmPassword}
                        onChange={e => confirmPasswordActions(e)} >
                    </input>
                </div>

                <div className="form-error-box">
                    <ul className="form-error-list">
                        {passwordErrors.map((error, index) => <li className="form-error-list-item" key={index} >{error}</li>)}
                    </ul>
                </div>

            </form>
        </div>
    )


}


export default CreateStudentForm

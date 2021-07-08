import { useState, useEffect } from "react";
import { useSelector } from "react-redux";



const UserEditPage = ({currentUser}) => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [passwordErrors, setPasswordErrors] = useState([]);

    const [email, setEmail] = useState("");
    const [confirmEmail, setConfirmEmail] = useState("");

    const [emailErrors, setEmailErrors] = useState([])

    const [username, setUsername] = useState("");

    const [zipcode, setZipcode] = useState("");

    const [showPasswordSection, setShowPasswordSection] = useState(false);
    const [editPasswordButtonText, setEditPasswordButtonText] = useState("Edit Password")

    const [showEmailSection, setShowEmailSection] = useState(false);
    const [editEmailButtonText, setEditEmailButtonText] = useState("Edit Email")


    const [showUsernameSection, setShowUsernameSection] = useState(false);
    const [editUsernameButtonText, setEditUsernameButtonText] = useState("Edit Username");


    const [showZipcodeSection, setShowZipcodeSection] = useState(false);
    const [editZipcodeButtonText, setEditZipcodeButtonText] = useState("Edit Zipcode");

    useEffect(() => {

        // Username
        const usernameFieldsButton = document.querySelector(".username-fields-button")
        if (usernameFieldsButton) {

            if (showUsernameSection === true) {
                setEditUsernameButtonText("Cancel Edit")
                usernameFieldsButton.classList.add("edit-open")
            } else {
                setUsername("")
                setEditUsernameButtonText("Edit Username")
                usernameFieldsButton.classList.remove("edit-open")
            }
        }

        // Password
        const passwordFieldsButton = document.querySelector(".password-fields-button")
        if (passwordFieldsButton) {

            if (showPasswordSection === true) {
                setEditPasswordButtonText("Cancel Edit")
                passwordFieldsButton.classList.add("edit-open")
            } else {
                setPassword("")
                setConfirmPassword("")
                setEditPasswordButtonText("Edit Password")
                passwordFieldsButton.classList.remove("edit-open")
            }
        }

        if (password !== confirmPassword) {
            setPasswordErrors(["Passwords do not match"])

        } else {
            setPasswordErrors([]);
        }


        // Email
        const emailFieldsButton = document.querySelector(".email-fields-button")
        if (emailFieldsButton) {

            if (showEmailSection === true) {
                setEditEmailButtonText("Cancel Edit")
                emailFieldsButton.classList.add("edit-open")
            } else {
                setEmail("")
                setConfirmEmail("")
                setEditEmailButtonText("Edit Email")
                emailFieldsButton.classList.remove("edit-open")
            }

        }

        if (email !== confirmEmail) {
            setEmailErrors(["Email fields do not match"])

        } else {
            setEmailErrors([]);
        }


        //Zipcode
        

    }, [email, confirmEmail, password, confirmPassword, showPasswordSection, showUsernameSection, showEmailSection, showZipcodeSection])


    const usernameFieldsActions = (e) => {
        e.preventDefault();

        setShowUsernameSection(!showUsernameSection)
    }


    const passwordFieldsActions = (e) => {
        e.preventDefault();

        setShowPasswordSection(!showPasswordSection)
    }


    const emailFieldsActions = (e) => {
        e.preventDefault();

        setShowEmailSection(!showEmailSection)
    }

    return (
        <form className="user-edit-form">
            {/* USERNAME SECTION */}
            <button className="show-edit-field-button username-fields-button" onClick={e => usernameFieldsActions(e)}>{editUsernameButtonText}</button>
            {showUsernameSection && <div className="user-edit-field-container">
                <label
                    className="user-edit-field-label"
                    htmlFor="user-edit-username" >
                        Change Username:
                </label>
                <input
                    className="user-edit-field-input"
                    type="text"
                    id="edit-username"
                    value={username}
                    onChange={e => setUsername(e.target.value)} >
                </input>


                <div className="user-edit-submit-container">
                    <button className="user-edit-submit-button">Update Username</button>
                </div>

            </div>}

            {/* PASSWORD SECTION */}
            <button className="show-edit-field-button password-fields-button" onClick={e => passwordFieldsActions(e)}>{editPasswordButtonText}</button>
            {showPasswordSection && <div className="user-edit-field-container">
                <label
                    className="user-edit-field-label"
                    htmlFor="user-edit-password" >
                        Change Password:
                </label>
                <input
                    className="user-edit-field-input"
                    type="password"
                    id="edit-password"
                    value={password}
                    onChange={e => setPassword(e.target.value)} >
                </input>

                <label
                    className="user-edit-field-label"
                    htmlFor="user-edit-confirmpassword" >
                        Confirm New Password:
                </label>
                <input
                    className="user-edit-field-input"
                    type="password"
                    id="edit-confirmpassword"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)} >
                </input>
                <div className="form-error-box">
                    <ul className="form-error-list">
                        {passwordErrors.map((error, index) => <li className="form-error-list-item" key={index} >{error}</li>)}
                    </ul>
                </div>
                <div className="user-edit-submit-container">
                    <button className="user-edit-submit-button">Update Password</button>
                </div>

            </div>}

            {/* EMAIL SECTION */}
            <button className="show-edit-field-button email-fields-button" onClick={e => emailFieldsActions(e)}>{editEmailButtonText}</button>
            {showEmailSection && <div className="user-edit-field-container">
                <label
                    className="user-edit-field-label"
                    htmlFor="user-edit-email" >
                        Change Email:
                </label>
                <input
                    className="user-edit-field-input"
                    type="text"
                    id="edit-email"
                    value={email}
                    onChange={e => setEmail(e.target.value)} >
                </input>

                <label
                    className="user-edit-field-label"
                    htmlFor="user-edit-confirmemail" >
                        Confirm New Email:
                </label>
                <input
                    className="user-edit-field-input"
                    type="text"
                    id="edit-confirmemail"
                    value={confirmEmail}
                    onChange={e => setConfirmEmail(e.target.value)} >
                </input>
                <div className="form-error-box">
                    <ul className="form-error-list">
                        {emailErrors.map((error, index) => <li className="form-error-list-item" key={index} >{error}</li>)}
                    </ul>
                </div>
                <div className="user-edit-submit-container">
                    <button className="user-edit-submit-button">Update Email</button>
                </div>

            </div>}
        </form>
    )
}

export default UserEditPage

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import './index.css'

import { updateUserData } from "../../store/session";

const UserEditPage = ({currentUser}) => {

    const history = useHistory()
    const dispatch = useDispatch()

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

    const [usernameSuccess, setUsernameSuccess] = useState(false);
    const [passwordSuccess, setPasswordSuccess] = useState(false);
    const [emailSuccess, setEmailSuccess] = useState(false);
    const [zipcodeSuccess, setZipcodeSuccess] = useState(false);

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
        const zipcodeFieldsButton = document.querySelector(".zipcode-fields-button")
        if (zipcodeFieldsButton) {

            if (showZipcodeSection === true) {
                setEditZipcodeButtonText("Cancel Edit")
                zipcodeFieldsButton.classList.add("edit-open")
            } else {
                setZipcode("")
                setEditZipcodeButtonText("Edit Zipcode")
                zipcodeFieldsButton.classList.remove("edit-open")
            }
        }

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

    const zipcodeFieldsActions = (e) => {
        e.preventDefault();
        setShowZipcodeSection(!showZipcodeSection)
    }

    const finishEditingActions = (e) => {
        e.preventDefault();

        history.push(`/users/${currentUser.id}`)
    }

    // Dispatch functions

    const editUsername = (e) => {
        e.preventDefault();

        const updatedInfo = {username: username}
        const userId = currentUser.id;

        dispatch(updateUserData(updatedInfo, userId))
            .then(setShowUsernameSection(false))
            .then(setUsernameSuccess(true))
            .then(setTimeout(() => {
                setUsernameSuccess(false)

            }, 10000))
    }


    const editPassword = (e) => {
        e.preventDefault();

        if (password === confirmPassword) {

            const updatedInfo = {password: password}
            const userId = currentUser.id;

            dispatch(updateUserData(updatedInfo, userId))
                .then(setShowPasswordSection(false))
                .then(setPasswordSuccess(true))
                .then(setTimeout(() => {
                    setPasswordSuccess(false)

                }, 10000))

        }

    }


    const editEmail = (e) => {
        e.preventDefault();

        if (email === confirmEmail) {

            const updatedInfo = {email: email}
            const userId = currentUser.id;

            dispatch(updateUserData(updatedInfo, userId))
                .then(setShowEmailSection(false))
                .then(setEmailSuccess(true))
                .then(setTimeout(() => {
                    setEmailSuccess(false)

                }, 10000))

        }
    }


    const editZipcode = (e) => {
        e.preventDefault();

        const updatedInfo = {zip_code: zipcode}
        const userId = currentUser.id;

        dispatch(updateUserData(updatedInfo, userId))
            .then(setShowZipcodeSection(false))
            .then(setZipcodeSuccess(true))
            .then(setTimeout(() => {
                setZipcodeSuccess(false)

            }, 10000))
    }


    return (
        <form className="user-edit-form">
            {/* USERNAME SECTION */}
            <button className="show-edit-field-button username-fields-button" onClick={e => usernameFieldsActions(e)}>{editUsernameButtonText}</button>
            {usernameSuccess && <h3 className="success-alert">Username Updated!</h3>}
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
                <div></div>

                <div className="user-edit-submit-container">
                    <button className="user-edit-submit-button" onClick={e => editUsername(e)}>Update Username</button>
                </div>

            </div>}

            {/* PASSWORD SECTION */}
            <button className="show-edit-field-button password-fields-button" onClick={e => passwordFieldsActions(e)}>{editPasswordButtonText}</button>
            {passwordSuccess && <h3 className="success-alert">Password Updated!</h3>}
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
                    <button className="user-edit-submit-button" onClick={e => editPassword(e)}>Update Password</button>
                </div>

            </div>}

            {/* EMAIL SECTION */}
            <button className="show-edit-field-button email-fields-button" onClick={e => emailFieldsActions(e)}>{editEmailButtonText}</button>
            {emailSuccess && <h3 className="success-alert">Email Updated!</h3>}
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
                    <button className="user-edit-submit-button" onClick={e => editEmail(e)}>Update Email</button>
                </div>

            </div>}

            {/* ZIPCODE SECTION */}
            <button className="show-edit-field-button zipcode-fields-button" onClick={e => zipcodeFieldsActions(e)}>{editZipcodeButtonText}</button>
            {zipcodeSuccess && <h3 className="success-alert">Zipcode Updated!</h3>}
            {showZipcodeSection && <div className="user-edit-field-container">
                <label
                    className="user-edit-field-label"
                    htmlFor="user-edit-zipcode" >
                        Change Zipcode:
                </label>
                <input
                    className="user-edit-field-input"
                    type="text"
                    id="edit-zipcode"
                    value={zipcode}
                    onChange={e => setZipcode(e.target.value)} >
                </input>
                <div></div>

                <div className="user-edit-submit-container">
                    <button className="user-edit-submit-button" onClick={e => editZipcode(e)}>Update Zipcode</button>
                </div>

            </div>}
            <button className="finish-editing-button" onClick={e => finishEditingActions(e)}>Finish Editing</button>
        </form>
    )
}

export default UserEditPage

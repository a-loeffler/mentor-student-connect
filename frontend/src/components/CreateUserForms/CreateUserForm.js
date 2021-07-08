import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';


import * as sessionActions from '../../store/session';
import './index.css';

const CreateUserForm = ({title, mentor, student}) => { //these props are booleans
    const dispatch = useDispatch();

    const currentUser = useSelector(state => state.session.user);


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




    useEffect(() => {

        if (email !== confirmEmail) {
            setEmailErrors(() => ["Emails do not match"])

        } else {
            setEmailErrors(() => []);
        }



        if (password !== confirmPassword) {
            setPasswordErrors(["Passwords do not match"])

        } else {
            setPasswordErrors([]);
        }

    }, [email, confirmEmail, password, confirmPassword])


    if (currentUser) {
        return (
            <Redirect to="/" />
        )
    }

    const submitActions = (e) => {
        e.preventDefault();

        e.target.classList.add("submit-shift")

        setTimeout(() => {
            if (password === confirmPassword) {
                setErrors([]);

                return dispatch(sessionActions.signup({ username, first_name: firstName, last_name: lastName, email, password, zip_code: zipcode, mentor: mentor, student: student }))
                    .catch(async (res) => {
                        const data = await res.json();

                        if (data && data.errors) {
                            setErrors(data.errors);

                            e.target.classList.remove("submit-shift")
                        }
                    });
            }

            return setErrors(['Password and Confirm Password do not match'])
        }, 1000)
    }

    const closeErrors = (e) => {
        e.preventDefault()
        
        setErrors([]);
    }

    return (
        <div className="create-user-form-container">
            {errors.length > 0 && <div className="form-error-hover-box">
                <span className="form-error-modal-exit" onClick={e => closeErrors(e)}>x</span>
                <ul className="form-error-list">
                    {errors.map((error, index) => <li className="form-error-list-item left-align" key={index} >{error}</li>)}
                </ul>
            </div>}
            <h1 className="create-user-form-title">{title}</h1>
            <form className="create-user-form" onSubmit={e => submitActions(e)}>

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
                        onChange={e => setConfirmEmail(e.target.value)} >
                    </input>
                </div>

                <div className="form-error-box">
                    <ul className="form-error-list">
                        {emailErrors.map((error, index) => <li className="form-error-list-item" key={index} >{error}</li>)}
                    </ul>
                </div>

                <div className="create-user-field-container">
                    <label className="create-user-field-label" htmlFor="student-zipcode">Primary Zipcode: </label>
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
                        onChange={e => setConfirmPassword(e.target.value)} >
                    </input>
                </div>

                <div className="form-error-box">
                    <ul className="form-error-list">
                        {passwordErrors.map((error, index) => <li className="form-error-list-item" key={index} >{error}</li>)}
                    </ul>
                </div>

                <div className="create-user-button-container">
                    <button className="create-user-submit-button" onClick={e => submitActions(e)}>Submit</button>
                </div>

            </form>
        </div>
    )


}


export default CreateUserForm;

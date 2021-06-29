import { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import './SignUpForm.css'
import * as sessionActions from '../../store/session';



const SignUpFormPage = () => {
    const dispatch = useDispatch();

    const currentUser = useSelector(state => state.session.user);
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState([]);

    if (currentUser) {
        return (
            <Redirect to="/" />
        )
    };

    const submitHandler = (e) => {
        e.preventDefault();

        if (password === confirmPassword) {
            setErrors([]);

            return dispatch(sessionActions.signup({ email, username: userName, password }))
                .catch(async (res) => {
                    const data = await res.json();

                    if (data && data.errors) {
                        setErrors(data.errors);
                    }
                });
        }
        return setErrors(['Password and Confirm Password do not match'])
    }

    return (
        <div>
            <div className="form-container">
                <h2 className="form-title">Sign Up</h2>
                <div className="form-errors">
                    <ul className="form-error-list">
                        {errors.map((error, index) => <li key={index} className="form-error-list-item">{error}</li>)}
                    </ul>
                </div>
                <form className="form" id="signup-form" onSubmit={e => submitHandler(e)}>
                    <div className="form-input-container">
                        <label className="form-label" htmlFor="signup-username">Create Username: </label>
                        <input type="text" default="Username" id="signup-username" className="signup-username form-input" value={userName} onChange={e => setUserName(e.target.value)}></input>
                    </div>
                    <div className="form-input-container">
                        <label className="form-label" htmlFor="signup-email">Email: </label>
                        <input type="email" default="example@domain.com" id="signup-email" className="signup-email form-input" value={email} onChange={e => setEmail(e.target.value)}></input>
                    </div>
                    <div className="form-input-container">
                    <label className="form-label" htmlFor="signup-password">Password: </label>
                    <input type="password" default="password" id="signup-password" className="signup-password form-input" value={password} onChange={e => setPassword(e.target.value)}></input>
                    <label className="form-label" htmlFor="signup-confirm-password">Confirm Password: </label>
                    <input type="password" default="password" id="signup-confirm-password" className="signup-password form-input" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}></input>
                    </div>
                    <div className="form-button-container">
                        <button className="form-button submit" type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignUpFormPage;

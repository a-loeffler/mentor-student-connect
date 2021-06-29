import { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import './LoginForm.css'
import * as sessionActions from '../../store/session';



const LoginFormPage = () => {
    const dispatch = useDispatch();

    const currentUser = useSelector(state => state.session.user);
    const [credential, setCredential] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);

    if (currentUser) {
        return (
            <Redirect to="/" />
        )
    };

    const submitHandler = (e) => {
        e.preventDefault();

        setErrors([]);

        return dispatch(sessionActions.login({ credential, password }))
            .catch(async (res) => {
                const data = await res.json();

                if (data && data.errors) {
                    setErrors(data.errors);
                }
      });
    }

    return (
        <div>
            <div className="form-container">
                <h2 className="form-title">Log In</h2>
                <div className="form-errors">
                    <ul className="form-error-list">
                        {errors.map((error, index) => <li key={index} className="form-error-list-item">{error}</li>)}
                    </ul>
                </div>
                <form className="form" id="login-form" onSubmit={e => submitHandler(e)}>
                    <div className="form-input-container">
                        <label className="form-label" htmlFor="login-credential">Name or Email: </label>
                        <input type="text" default="email or username" id="login-credential" className="login-credential form-input" value={credential} onChange={e => setCredential(e.target.value)}></input>
                    </div>
                    <div className="form-input-container">
                    <label className="form-label" htmlFor="login-password">Password: </label>
                    <input type="password" default="password" id="login-password" className="login-password form-input" value={password} onChange={e => setPassword(e.target.value)}></input>
                    </div>
                    <div className="form-button-container">
                        <button className="form-button submit" type="submit">Log In</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginFormPage;

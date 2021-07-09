import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, Redirect } from "react-router-dom";
import * as sessionActions from '../../store/session';

const LoginModal = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const currentUser = useSelector(state => state.session.user);

    const [credential, setCredential] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);


    const submitHandler = (e) => {
        e.preventDefault();

        console.log(credential)
        console.log(password)
        setErrors([]);

        return dispatch(sessionActions.login({ credential, password }))
            .catch(async (res) => {
                const data = await res.json();

                if (data && data.errors) {
                    setErrors(data.errors);
                }
      });
    }

        if (currentUser) {
            return (
                <Redirect to={`/users/${currentUser.id}`} />
            )
        }

    const goToSignup = (e) => {
        e.preventDefault();
        history.push("/signup")
    }

    return (
        <div className="login-modal-container">
            <form className="login-form" onSubmit={e => submitHandler(e)}>
                <div className="login-field">
                    <label className="login-field-label" htmlFor="login-name">Email or Username:</label>
                    <input className="login-field-input" type="text" id="login-name" value={credential} onChange={e => setCredential(e.target.value)}></input>
                </div>
                <div className="login-field">
                    <label className="login-field-label" htmlFor="login-password">Password:</label>
                    <input className="login-field-input" type="password" id="login-password" value={password} onChange={e => setPassword(e.target.value)}></input>
                </div>
                <div className="login-field">
                    <div className="form-errors">
                        <ul className="form-error-list">
                            {errors.map((error, index) => <li key={index} className="form-error-list-item">{error}</li>)}
                        </ul>
                    </div>
                    <button className="login-submit-button" onClick={e => submitHandler(e)}>Login</button>
                </div>
                <div className="login-signup-redirect">
                    <h2 className="login-signup-redirect-text">Don't have an account?  <span className="login-signup-redirect-link" onClick={e => goToSignup(e)}>Sign up here</span></h2>
                </div>
            </form>
        </div>
    )
}


export default LoginModal

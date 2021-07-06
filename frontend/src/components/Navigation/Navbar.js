
import { useState } from "react";
import { useSelector } from "react-redux";

import LoginModal from "./LoginModal";

import "./index.css";


const Navbar = () => {

    const [loginModalShowing, setLoginModalShowing] = useState(false);
    const currentUser = useSelector(state => state.session.user);



    const clickLogin = (e) => {
        e.preventDefault();

        if (e.target.classList.contains("dark-blue")){
            e.target.classList.remove("dark-blue")
        } else {
            e.target.classList.add("dark-blue")
        }
        setLoginModalShowing(!loginModalShowing)
    }

    return (
        <div className="navbar-container">
            <div className="navbar-sidespace"></div>
            <div className="navbar-main">
                <div className="navbar-title-space">
                    <div className="navbar-title-image-container">
                        <img className="navbar-title-logo" src="/images/MSClogo1.svg" alt="Mentor Student Connect"></img>
                    </div>
                    <div className="navbar-title-text-container">
                        <h1 className="navbar-title">Mentor Student Connect</h1>
                        <p className="navbar-subtitle">bridging the gap between school and success</p>
                    </div>
                </div>
                <div className="navbar-menu-items">
                    <ul className="navbar-menu-items-list">
                        <li className="navbar-menu-items-list-item">
                            <h1 className="navbar-menu-link-text">Home</h1>
                        </li>
                        <li className="navbar-menu-items-list-item">
                            <h1 className="navbar-menu-link-text">Get Involved</h1>
                        </li>
                        <li className="navbar-menu-items-list-item">
                            <h1 className="navbar-menu-link-text">News and Events</h1>
                        </li>
                        <li className="navbar-menu-items-list-item">
                            <h1 className="navbar-menu-link-text">Contact Us</h1>
                        </li>
                        {!currentUser && <li className="navbar-menu-items-button-container">
                            <button className="navbar-menu-login-button" onClick={e => clickLogin(e)}>Login</button>
                            {loginModalShowing && <LoginModal />}
                        </li>}
                        {currentUser && <li className="navbar-menu-items-list-item profile-items">
                            <div className="profile-icon-container">
                                <img className="profile-icon" src="/images/profile.svg" alt=""></img>
                            </div>
                            <h1 className="navbar-menu-profile-name">{`Welcome, ${currentUser.username}`}</h1>
                            <div className="new-message-notification">!</div>
                            <img className="profile-messages-icon" src="/images/envelope.svg" alt="click here to see your messages"></img>
                        </li>}
                    </ul>
                </div>
            </div>
            <div className="navbar-sidespace"></div>
        </div>
    )
}


export default Navbar;

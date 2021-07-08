
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import LoginModal from "./LoginModal";
import ProfileModal from "./ProfileModal";
import GetInvolvedModal from "./GetInvolvedModal";

import "./index.css";




const Navbar = () => {

    const history = useHistory();

    const [loginModalShowing, setLoginModalShowing] = useState(false);
    const [profileModalShowing, setProfileModalShowing] = useState(false);
    const [getInvolvedModalShowing, setGetInvolvedModalShowing] = useState(false);
    // const [targetedItem, setTargetedItem] = useState(null);

    const currentUser = useSelector(state => state.session.user);


    useEffect(() => {
        document.addEventListener("click", e => {
            console.log("in here!", e.target)


            const involvedClassNames = ["get-involved-menu-container", "get-involved-menu-list", "get-involved"]
            if (!involvedClassNames.some(className => e.target.classList.contains(className))) {
                console.log("made it here")
                setGetInvolvedModalShowing(false);
            }

            const loginClassNames = ["navbar-menu-login-button", "login-modal-container", "login-form", "login-field", "login-field-input", "form-errors", "form-error-list", "form-error-list-item", "login-submit-button", "login-signup-redirect", "login-signup-redirect-text"]
            if (!loginClassNames.some(className => e.target.classList.contains(className))) {
                console.log("made it here")
                setLoginModalShowing(false);
            }

            const profileClassNames = ["profile-items", "profile-icon-container", "profile-icon", "profile-modal-container", "profile-menu-list", "profile-menu-list-item"]
            if (!profileClassNames.some(className => e.target.classList.contains(className))) {
                console.log("made it here")
                setProfileModalShowing(false);
            }
        })

        const getInvolvedLink = document.querySelector(".get-involved")
        if (getInvolvedLink) {
            if (getInvolvedModalShowing === true){
                getInvolvedLink.classList.remove("point-down")
                getInvolvedLink.classList.add("point-up")
            } else {
                getInvolvedLink.classList.remove("point-up")
                getInvolvedLink.classList.add("point-down")
            }
        }

    })


    const clickLogin = (e) => {
        e.preventDefault();

        if (e.target.classList.contains("dark-blue")){
            e.target.classList.remove("dark-blue")
        } else {
            e.target.classList.add("dark-blue")
        }
        setLoginModalShowing(!loginModalShowing)
    }

    const clickProfile = (e) => {
        // e.preventDefault();


        // if (!e.target.classList.contains("profile-icon")) {
            if (e.target.classList.contains("white-border")){
                e.target.classList.remove("white-border")
            } else {
                e.target.classList.add("white-border")
            }
            setProfileModalShowing(!profileModalShowing)
        // }
    }

    const clickMessages = (e) => {
        e.preventDefault();

        history.push("/messages")
    }

    const clickHome = (e) => {
        e.preventDefault();

        history.push("/")
    }

    const clickGetInvolved = (e) => {
        e.preventDefault();

        setGetInvolvedModalShowing(!getInvolvedModalShowing)
        // if (getInvolvedModalShowing === false){
        //     e.target.classList.remove("point-down")
        //     e.target.classList.add("point-up")
        // } else {
        //     e.target.classList.remove("point-up")
        //     e.target.classList.add("point-down")
        // }


        // console.log(getInvolvedModalShowing)

    }

    return (
        <div className="navbar-container">
            <div className="navbar-sidespace"></div>
            <div className="navbar-main">
                <div className="navbar-title-space">
                    <div className="navbar-title-image-container">
                        <img className="navbar-title-logo" src="/images/MSClogo1.svg" alt="Mentor Student Connect" onClick={e => clickHome(e)}></img>
                    </div>
                    <div className="navbar-title-text-container">
                        <h1 className="navbar-title">Mentor Student Connect</h1>
                        <p className="navbar-subtitle">bridging the gap between school and success</p>
                    </div>
                </div>
                <div className="navbar-menu-items">
                    <ul className="navbar-menu-items-list">
                        <li className="navbar-menu-items-list-item">
                            <h1 className="navbar-menu-link-text" onClick={e => clickHome(e)}>Home</h1>
                        </li>
                        <li className="navbar-menu-items-list-item get-involved-items">
                            <h1 className="navbar-menu-link-text get-involved point-down" onClick={e => clickGetInvolved(e)} >Get Involved</h1>
                            {getInvolvedModalShowing && <GetInvolvedModal />}
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
                            <div className="profile-icon-container" onClick={e => clickProfile(e)}>
                                <img className="profile-icon" src="/images/profile.svg" alt="" onClick={e => clickProfile(e)}></img>
                            </div>
                            {profileModalShowing && <ProfileModal />}
                            <h1 className="navbar-menu-profile-name">{`Welcome, ${currentUser.username}`}</h1>
                            <div className="new-message-notification">!</div>
                            <img className="profile-messages-icon" src="/images/envelope.svg" alt="click here to see your messages" onClick={e => clickMessages(e)}></img>
                        </li>}
                    </ul>
                </div>
            </div>
            <div className="navbar-sidespace"></div>
        </div>
    )
}


export default Navbar;

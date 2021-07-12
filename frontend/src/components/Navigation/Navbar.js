
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

    const [nofifyUnread, setNotifyUnread] = useState(false);

    const currentUser = useSelector(state => state.session.user);

    const messagesObject = useSelector(state => state.userMessages.allMessages);


    useEffect(() => {
        document.addEventListener("click", e => {

            const involvedClassNames = ["get-involved-menu-container", "get-involved-menu-list", "get-involved"]
            if (!involvedClassNames.some(className => e.target.classList.contains(className))) {

                setGetInvolvedModalShowing(false);
            }

            const loginClassNames = ["navbar-menu-login-button", "login-modal-container", "login-form", "login-field", "login-field-input", "form-errors", "form-error-list", "form-error-list-item", "login-submit-button", "login-signup-redirect", "login-signup-redirect-text"]
            if (!loginClassNames.some(className => e.target.classList.contains(className))) {

                setLoginModalShowing(false);
            }

            const profileClassNames = ["profile-items", "profile-icon-container", "profile-icon", "profile-modal-container", "profile-menu-list", "profile-menu-list-item"]
            if (!profileClassNames.some(className => e.target.classList.contains(className))) {

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


        const circleProfileDiv = document.querySelector(".profile-icon-container")
        if (circleProfileDiv) {
            if (profileModalShowing === true) {
                circleProfileDiv.classList.add("white-border")
            } else {
                circleProfileDiv.classList.remove("white-border")
            }
        }


        const loginButton = document.querySelector(".navbar-menu-login-button")
        if (loginButton) {
            if (loginModalShowing === true) {
                loginButton.classList.add("dark-blue")
            } else {
                loginButton.classList.remove("dark-blue")
            }
        }




    })


    useEffect(() => {
        if (messagesObject) {
            for (let otherUserId in messagesObject) {
                let messageArray = messagesObject[otherUserId];
                if (messageArray.some(message => message.recipient_id === currentUser.id && message.read === false)) {
                    setNotifyUnread(true)
                }
            }
        }
    })




    const clickLogin = (e) => {

        setLoginModalShowing(!loginModalShowing)
    }

    const clickProfile = (e) => {

        setProfileModalShowing(!profileModalShowing)
    }

    const clickMessages = (e) => {
        e.preventDefault();

        history.push(`/users/${currentUser.id}`)
    }

    const clickHome = (e) => {
        e.preventDefault();

        history.push("/")
    }

    const clickGetInvolved = (e) => {

        setGetInvolvedModalShowing(!getInvolvedModalShowing)
    }

    const goToUserPage = (e) => {
        e.preventDefault();

        history.push(`/users/${currentUser.id}`)
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
                            <h1 className="navbar-menu-profile-name" >{`Welcome, ${currentUser.username}`}</h1>
                            {nofifyUnread && <div className="new-message-notification" >!</div>}
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

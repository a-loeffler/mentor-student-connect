import { Link } from 'react-router-dom'

import './index.css'

const AboutUs = () => {



    return (
        <div className="about-us-container" id="about-us">
            <div className="about-us-site-info-container">
                <img className="footer-logo" src="/images/MSClogo1.svg" alt="Mentor Student Connect logo"></img>
                <h1 className="about-info-text">&copy; 2021 Mentor Student Connect and Andrew Loeffler</h1>
            </div>
            <div className="about-us-info-container">
                <h1 className="about-info-text">Created by: Andrew Loeffler</h1>
                <a href="https://github.com/a-loeffler">
                    <img className="github-icon social-icon" src="/images/githublogo.png" alt="link to the creator's github page" ></img>

                </a>
                <a href="https://www.linkedin.com/in/andrew-loeffler-a28195213/">
                    <img className="linkedin-icon social-icon" src="/images/linkedinlogo.png" alt="link to the creator's linkedin page"></img>
                </a>
            </div>
        </div>
    )
}

export default AboutUs

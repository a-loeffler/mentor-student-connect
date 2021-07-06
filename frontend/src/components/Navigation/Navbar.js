


const NavBar = () => {



    return (
        <div className="navbar-container">
            <div className="navbar-sidespace"></div>
            <div className="navbar-main">
                <div className="navbar-title-space">

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
                        <li className="navbar-menu-items-list-item">
                            <button className="navbar-menu-login-button">Login</button>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="navbar-sidespace"></div>
        </div>
    )
}


export default NavBar;

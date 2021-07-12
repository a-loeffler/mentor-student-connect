import { useHistory, NavLink } from "react-router-dom"


const GetInvolvedModal = () => {
    const history = useHistory();



    return (
        <div className="get-involved-menu-container">
            <ul className="get-involved-menu-list">
                <NavLink className="no-style" to="/signup/mentor"><li className="get-involved-menu-list-item" >As a Mentor</li></NavLink>
                <NavLink className="no-style" to="/signup/student"><li className="get-involved-menu-list-item" >As a Student</li></NavLink>
                <NavLink className="no-style" to=""><li className="get-involved-menu-list-item" >As a Parent *Coming Soon</li></NavLink>
                <NavLink className="no-style" to=""><li className="get-involved-menu-list-item" >As an Organization *Coming Soon</li></NavLink>
            </ul>
        </div>
    )
}

export default GetInvolvedModal

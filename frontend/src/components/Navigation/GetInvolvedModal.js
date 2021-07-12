import { useHistory, NavLink } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux";

import { login, logout } from "../../store/session";

const GetInvolvedModal = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const currentUser = useSelector(state => state.session.user)

    const demoMentorLogin = (e) => {
        e.preventDefault()

        if (currentUser) {
            dispatch(logout())
                .then(dispatch(login({username: "demoMentor", password: "password"})))
        }
        dispatch(login({credential: "demoMentor", password: "password"}));
    }


    const demoStudentLogin = (e) => {
        e.preventDefault()

        if (currentUser) {
            dispatch(logout())
                .then(dispatch(login({username: "demoStudent", password: "password"})))
        }
        dispatch(login({credential: "demoStudent", password: "password"}));
    }


    return (
        <div className="get-involved-menu-container">
            <ul className="get-involved-menu-list">
                <NavLink className="no-style" to="/signup/mentor"><li className="get-involved-menu-list-item" >As a Mentor</li></NavLink>
                <NavLink className="no-style" to="/signup/student"><li className="get-involved-menu-list-item" >As a Student</li></NavLink>
                <li className="get-involved-menu-list-item" onClick={e => demoMentorLogin(e)}>Login as Demo Mentor</li>
                <li className="get-involved-menu-list-item" onClick={e => demoStudentLogin(e)}>Login as Demo Student</li>
                {/* <NavLink className="no-style" to=""><li className="get-involved-menu-list-item" >As a Parent *Coming Soon</li></NavLink>
                <NavLink className="no-style" to=""><li className="get-involved-menu-list-item" >As an Organization *Coming Soon</li></NavLink> */}
            </ul>
        </div>
    )
}

export default GetInvolvedModal

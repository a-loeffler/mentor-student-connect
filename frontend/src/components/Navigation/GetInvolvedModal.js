import { useHistory } from "react-router-dom"


const GetInvolvedModal = () => {
    const history = useHistory();


    const asAMentor = (e) => {
        e.preventDefault()
        history.push('/signup/mentor')
    }


    const asAStudent = (e) => {
        e.preventDefault()
        history.push('/signup/student')
    }


    const asAParent = (e) => {
        e.preventDefault()
        history.push('/signup/parent')
    }


    const asAnOrganization = (e) => {
        e.preventDefault()
        history.push('/signup/organization')
    }


    return (
        <div className="get-involved-menu-container">
            <ul className="get-involved-menu-list">
                <li className="get-involved-menu-list-item" onClick={e => asAMentor(e)}>As a Mentor</li>
                <li className="get-involved-menu-list-item" onClick={e => asAStudent(e)}>As a Student</li>
                <li className="get-involved-menu-list-item" onClick={e => asAParent(e)}>As a Parent</li>
                <li className="get-involved-menu-list-item" onClick={e => asAnOrganization(e)}>As an Organization</li>
            </ul>
        </div>
    )
}

export default GetInvolvedModal

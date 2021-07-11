import { useDispatch, useSelector } from 'react-redux'


import './index.css'
import { postNewConnection } from '../../store/connections'

const MentorCard = ({mentorName, mentorZipcode, mentorId}) => {
    const dispatch = useDispatch();

    const currentUser = useSelector(state => state.session.user)

    const connectionRequestActions = (e) => {
        e.preventDefault()

        dispatch(postNewConnection(currentUser.id, mentorId))
    }

    return (
        <div className="mentor-card-container">
            <div className="mentor-card-title-container">
                <h1 className="mentor-card-title">Local Mentor</h1>
            </div>
            <div className="mentor-card-content-container">
                <div className="mentor-card-picture-container">
                    <img className="mentor-card-picture" src="/images/profile.svg" alt="mentor's profile image"></img>
                </div>

                <div className="mentor-card-info-container">
                    <div className="mentor-info">
                        <h1 className="mentor-card-name">{mentorName}</h1>
                        <h2 className="mentor-card-zipcode">{mentorZipcode}</h2>
                    </div>
                    <div className="mentor-card-button-container">
                        <button className="mentor-card-connection-request-button" onClick={e => connectionRequestActions(e)} >Send Connection Request</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MentorCard

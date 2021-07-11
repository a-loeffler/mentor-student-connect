import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'


import './index.css'
import { postNewConnection } from '../../store/connections'

const MentorCard = ({mentorName, mentorZipcode, mentorId}) => {
    const dispatch = useDispatch();

    const currentUser = useSelector(state => state.session.user)

    const [requestMessage, setRequestMessage] = useState("Send Connection Request")

    const connectionRequestActions = (e) => {
        e.preventDefault()


        if (requestMessage === "Send Connection Request") {
            return dispatch(postNewConnection(currentUser.id, mentorId))
                .then(e.target.classList.add("disabled"))
                .then(setRequestMessage("Connection Request Sent"))
        }
    }

    return (
        <div className="mentor-card-container">
            <div className="mentor-card-title-container">
                <h1 className="mentor-card-title">Local Mentor</h1>
            </div>
            <div className="mentor-card-content-container">
                <div className="mentor-card-picture-container">
                    <img className="mentor-card-picture" src="/images/profile.svg" alt="mentor's profile avatar"></img>
                </div>

                <div className="mentor-card-info-container">
                    <div className="mentor-info">
                        <h1 className="mentor-card-name">{mentorName}</h1>
                        <h2 className="mentor-card-zipcode">{mentorZipcode}</h2>
                    </div>
                    <div className="mentor-card-button-container">
                        <button className="mentor-card-connection-request-button" disabled={requestMessage !== "Send Connection Request"} onClick={e => connectionRequestActions(e)} >{requestMessage}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MentorCard

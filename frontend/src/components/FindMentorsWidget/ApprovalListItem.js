import { useDispatch } from 'react-redux'
import { useState } from 'react'


import './index.css'

import { approveConnection } from '../../store/connections'



const ApprovalListItem = ({color, pendingName, pendingZipcode, pendingId}) => {
    const dispatch = useDispatch();
    const [updateNow, setUpdateNow] = useState(false)

    const approveConnectionActions = (e) => {
        e.preventDefault();

        dispatch(approveConnection(pendingId))
            .then(setUpdateNow(!updateNow))
    }


    return (
        <div className="approval-list-item-container" >
            <div className={`approval-list-item-info ${color}`}>
                <div className="approval-list-item-picture-container">
                    <img className="approval-list-item-picture" src="/images/profile.svg" alt="connection request avatar"></img>
                </div>
                <h1 className="approval-list-item-name">{pendingName}</h1>
                <h2 className="approval-list-item-zipcode">{pendingZipcode}</h2>
            </div>
            <div className="approval-list-item-button-container">
                <button className="approval-confirm-button" onClick={e => approveConnectionActions(e)}>Approve</button>
                <button className="approval-reject-button">Reject</button>
            </div>
        </div>
    )
}

export default ApprovalListItem

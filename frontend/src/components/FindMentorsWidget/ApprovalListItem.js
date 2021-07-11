import { useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'


import './index.css'

import { approveConnection, rejectConnection } from '../../store/connections'



const ApprovalListItem = ({color, pendingName, pendingZipcode, pendingId, setRefresher, refresher}) => {
    const dispatch = useDispatch();

    const [approveMessage, setApproveMessage] = useState("Approve")
    const [rejectMessage, setRejectMessage] = useState("Reject")

    useEffect(() => {

    }, [dispatch])


    const approveConnectionActions = async(e) => {
        e.preventDefault();

        return dispatch(approveConnection(pendingId))
            .then(() => e.target.classList.add("disabled"))
            .then(() => setApproveMessage("Connection Approved!"))


    }


    const rejectConnectionActions = (e) => {
        e.preventDefault();

        return dispatch(rejectConnection(pendingId))
            .then(() => e.target.classList.add("disabled"))
            .then(() => setRejectMessage("Connection Rejected."))

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
                {rejectMessage === "Reject" && <button className="approval-confirm-button" disabled={approveMessage !== "Approve"} onClick={e => approveConnectionActions(e)}>{approveMessage}</button>}
                {approveMessage === "Approve" && <button className="approval-reject-button" disabled={rejectMessage !== "Reject"} onClick={e => rejectConnectionActions(e)}>{rejectMessage}</button>}
            </div>
        </div>
    )
}

export default ApprovalListItem

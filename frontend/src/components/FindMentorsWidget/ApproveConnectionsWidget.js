import { useState, useEffect } from "react";
import { useSelector } from "react-redux";


import ApprovalListItem from "./ApprovalListItem";

import './index.css'


const ApproveConnectionsWidget = () => {

    const connections = useSelector(state => state.userConnections.allConnections)

    const [minimized, setMinimized] = useState(false);
    const [unapprovedConnections, setUnapprovedConnections] = useState([])
    const [refresher, setRefresher] = useState(false)

    useEffect(() => {
        if (connections) {
            let unapprovedConnectionsList = connections.filter(connection => connection.approved === false)
            
            setUnapprovedConnections(unapprovedConnectionsList)

        }
    }, [connections])


    const minimizeActions = (e) => {
        e.preventDefault()
        if (minimized === false) {
            setMinimized(true)
        } else {
            setMinimized(false)
        }
    }





    const nameWriter = (connection) => {
        if (connection.OtherUserInfo) {
            return `${connection.OtherUserInfo.first_name} ${connection.OtherUserInfo.last_name[0]}.`
        }
    }


    return (
        <div className="approve-connections-widget-layout">
            <div className="approve-connections-widget-container">
                <div className={`widget-action-bar ${minimized === false ? "" : "full-border"}`}>
                    Connection Requests
                    <button className="widget-collapse-button" onClick={e => minimizeActions(e)}>-</button>
                </div>
                <div className={`widget-container ${minimized === false ? "" : "minimized"}`}>
                    {unapprovedConnections.map((connection, index) => <ApprovalListItem
                                                                        key={index}
                                                                        color={index % 2 === 0 ? "chocolate-li" : "brick-li"}
                                                                        pendingName={nameWriter(connection)}
                                                                        pendingZipcode={connection.OtherUserInfo.zip_code}
                                                                        pendingId={connection.id}
                                                                        setRefresher={setRefresher}
                                                                        refresher={refresher}
                                                                        />)}
                    {unapprovedConnections.length === 0 && <h1 className="no-pending-connections chocolate-li">No Pending Connections</h1>}
                </div>
            </div>
        </div>
    )
}

export default ApproveConnectionsWidget

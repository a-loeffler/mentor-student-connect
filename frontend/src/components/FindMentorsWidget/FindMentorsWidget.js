import { useState } from "react"


import Map from "./Map"



const FindMentorsWidget = () => {

    const [minimized, setMinimized] = useState(false);





    const minimizeActions = (e) => {
        e.preventDefault()
        if (minimized === false) {
            setMinimized(true)
        } else {
            setMinimized(false)
        }
    }

    return (
        <div className="find-mentors-widget-layout">
            <div className={`widget-action-bar ${minimized === false ? "" : "full-border"}`}>
                Find a Mentor
                <button className="widget-collapse-button" onClick={e => minimizeActions(e)}>-</button>
            </div>
            <div className={`widget-container ${minimized === false ? "" : "minimized"}`}>
                <Map />
            </div>
        </div>
    )
}

export default FindMentorsWidget

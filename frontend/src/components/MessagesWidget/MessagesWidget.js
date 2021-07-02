
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Conversations from "./Conversations"
import TextMessages from "./TextMessages"

const MessagesWidget = () => {



    const messagesObject = useSelector((state) => state.userMessages)
    const user = useSelector(state => state.session.user)

    const [activeTexts, setActiveTexts] = useState([]);
    const [userId, setUserId] = useState(null);
    const [minimized, setMinimized] = useState(false);
    const [activeRecipientId, setActiveRecipentId] = useState(null);

    useEffect(() => {
        if (user) {
            setUserId(user.id)
        }


        let conversationListItems = document.querySelectorAll(".conversation-list-item")
        if (conversationListItems) {
            conversationListItems.forEach(listItem => {
                listItem.addEventListener("click", (e) => {
                    let elementId = e.target.id;
                    if (elementId !== "showing-now") {
                        let process1 = elementId.split("-");
                        let convoId = Number(process1[process1.length - 1])
                        let color = process1[process1.length - 2]

                        e.target.classList.add(`${color}-shift`)

                        setTimeout(() => {
                            e.target.id = "showing-now";
                            setActiveRecipentId(convoId)
                            setActiveTexts(messagesObject[convoId])

                            let lastMessage = document.querySelector(".last")
                            if (lastMessage) {
                                console.log("in here", lastMessage)
                                lastMessage.scrollIntoView(false);
                            }
                            //to-do: create and run thunk action to change "unreads" if needed
                            //to-do: handle switching which conversation we're looking at.
                        }, 1000)
                    }

                })
            })
        }



    }, [messagesObject, activeTexts, minimized, user])


    //

    //each key in the messages object tells us the other user in the conversation;
    //each value holds an array of messages in order

    const conversationIds = Object.keys(messagesObject)

    const minimizeActions = (e) => {
        e.preventDefault()
        if (minimized === false) {
            setMinimized(true)
        } else {
            setMinimized(false)
        }
    }
    //to-do: set up event listeners for each click on a ConversationListItem
        //thunk action to set the message to "read" being true

    return (
        <div className="messages-widget-container">
            <div className={`widget-action-bar ${minimized === false ? "" : "full-border"}`}>
                {`${minimized === false ? "": "Conversations"}`}
                <button className="widget-collapse-button" onClick={e => minimizeActions(e)}>-</button>
            </div>
            <div className={`messages-component-container ${minimized === false ? "" : "minimized"}`}>
                <div className="conversations-container">
                    {messagesObject && conversationIds.length && <Conversations conversationIds={conversationIds} messagesObject={messagesObject} />}
                </div>
                <div className="texts-container">
                    {activeTexts.length > 0 && <TextMessages activeTexts={activeTexts} userId={userId} recipientId={activeRecipientId} />}
                </div>
            </div>
        </div>
    )

}


export default MessagesWidget;

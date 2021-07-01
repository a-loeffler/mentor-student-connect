
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Conversations from "./Conversations"
import TextMessages from "./TextMessages"

const MessagesWidget = () => {



    const messagesObject = useSelector((state) => state.userMessages)
    const user = useSelector(state => state.session.user)

    const [activeTexts, setActiveTexts] = useState([]);
    const [userId, setUserId] = useState(0);

    console.log(activeTexts)

    useEffect(() => {
        console.log(activeTexts)

        if (user) {
            setUserId(user.id)
        }


        let conversationListItems = document.querySelectorAll(".conversation-list-item")
        if (conversationListItems) {
            conversationListItems.forEach(listItem => {
                listItem.addEventListener("click", (e) => {
                    let elementId = e.target.id;

                    let process1 = elementId.split("-");
                    let convoId = process1[process1.length - 1]

                    e.target.classList.add("shift") // in css, make sure this animation lasts for 1s

                    setTimeout(() => {
                        setActiveTexts(messagesObject[convoId])
                        //to-do: create and run thunk action to change "unreads" if needed
                    }, 1000)

                })
            })
        }

    }, [messagesObject, activeTexts])


    //

    //each key in the messages object tells us the other user in the conversation;
    //each value holds an array of messages in order

    const conversationIds = Object.keys(messagesObject)


    //to-do: set up event listeners for each click on a ConversationListItem
        //thunk action to set the message to "read" being true

    return (
        <div className="messages-widget-container">
            <div className="widget-action-bar">
                <button className="widget-collapse-button">-</button>
            </div>
            <div className="conversations-container">
                <Conversations conversationIds={conversationIds} messagesObject={messagesObject} />
            </div>
            <div className="texts-container">
                {activeTexts && <TextMessages texts={activeTexts} userId={userId} />}
            </div>
        </div>
    )

}


export default MessagesWidget;

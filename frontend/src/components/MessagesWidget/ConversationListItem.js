



const ConversationListItem = ({text, color, unread, itemId}) => {


    //to-do: add animation effect on clicking the conversation-list-item



    return (
        <div className={`conversation-list-item ${color}`} id={itemId}>
            {unread === true && <div className="unread-marker">!</div>}
            <h3 className="conversation-list-text">{text}</h3>
        </div>
    )
}

export default ConversationListItem

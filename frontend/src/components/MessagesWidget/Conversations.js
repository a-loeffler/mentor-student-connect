import {ConversationListItem} from './ConversationListItem'




const Conversations = ({conversationIds, messagesObject}) => {


    //to-do: figure out logic for unread notices
        //do we need to pass down the messagesObject?


    //to-do: get username for each conversationId
        //at some point we need a "connections" list in the store to hold active connections
        //should be able to cross-reference conversationId with the connections in the store to get usernames



    return (
        <div className="conversations-list-container">
            <ConversationListItem text={"Conversations"} color={"gold"} unread={false} />
            {conversationIds.map((id, index) => <ConversationListItem
                                                    key={index}
                                                    unread={messagesObject[id].some(message => message.read === false)} //true if there's an unread msg
                                                    text={`${id}`}
                                                    itemId={`conversation-${id}`} //use this for event listener on click later
                                                    color={index % 2 === 0 ? "chocolate" : "brick"} />)}
        </div>
    )
}

export default Conversations

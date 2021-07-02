import ConversationListItem from './ConversationListItem'




const Conversations = ({conversationIds, messagesObject, approvedConnections}) => {


    //to-do: figure out logic for unread notices
        //do we need to pass down the messagesObject?


    //to-do: get username for each conversationId
        //at some point we need a "connections" list in the store to hold active connections
        //should be able to cross-reference conversationId with the connections in the store to get usernames

    //approvedConnections[index].User.first_name, last_name

    const nameFinder = (id) => {

        console.log(id)
        //search through approvedConnections to filter out the entry
            //with a mentor_id or student_id that matches the id
        console.log("approved connections**", approvedConnections)
        let [individualConnection] = approvedConnections.filter(connection => connection.mentor_id === Number(id) || connection.student_id === Number(id))
        console.log("individual connection**", individualConnection)
        //return the entry's User.first_name and User.last_name in the
            //desired format

        return `${individualConnection.User.first_name} ${individualConnection.User.last_name[0]}.`
    }




    // console.log("*** Messages Object ***", messagesObject)
    // console.log("***ConversationIds***", conversationIds)

    return (
        <div className="conversations-list-container">
            <div className={`conversation-list-title gold`} >
                <h3 className="conversation-list-text">Connections</h3>
            </div>
            {conversationIds.length && conversationIds.map((id, index) => <ConversationListItem
                                                    key={index}
                                                    unread={messagesObject && messagesObject[id].some(message => message.read === false)} //true if there's an unread msg
                                                    text={nameFinder(id)}
                                                    itemId={`conversation-${index % 2 === 0 ? "chocolate" : "brick"}-${id}`} //use this for event listener on click later
                                                    color={index % 2 === 0 ? "chocolate" : "brick"}
                                                    />)}
        </div>
    )
}

export default Conversations

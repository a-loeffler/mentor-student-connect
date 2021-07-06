import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import ConversationListItem from './ConversationListItem'




const Conversations = ({conversationIds, messagesObject, approvedConnections}) => {

    const needMessageRefresh = useSelector(state => state.userMessages.needsRefresh)


    const [currentMessages, setCurrentMessages] = useState({});

    useEffect(() => {


        setCurrentMessages(messagesObject)

    }, [needMessageRefresh, messagesObject])

    //to-do: figure out logic for unread notices
        //do we need to pass down the messagesObject?


    //to-do: get username for each conversationId
        //at some point we need a "connections" list in the store to hold active connections
        //should be able to cross-reference conversationId with the connections in the store to get usernames

    //approvedConnections[index].User.first_name, last_name

    // const nameFinder = (id) => {

    //     // console.log(id)
    //     //search through approvedConnections to filter out the entry
    //         //with a mentor_id or student_id that matches the id
    //     // console.log("approved connections**", approvedConnections)
    //     // let [individualConnection] = approvedConnections.filter(connection => connection.mentor_id === Number(id) || connection.student_id === Number(id))
    //     // console.log("individual connection**", individualConnection)
    //     //return the entry's User.first_name and User.last_name in the
    //         //desired format

    //     return `${individualConnection.User.first_name} ${individualConnection.User.last_name[0]}.`
    // }


    console.log(messagesObject)

    const unreadChecker = (otherId) => {
        console.log(otherId)
        console.log(messagesObject)
        return currentMessages[otherId].some(message => message.read === false)
    }




    // console.log("*** Messages Object ***", messagesObject)
    // console.log("***ConversationIds***", conversationIds)

    return (
        <div className="conversations-list-container">
            <div className={`conversation-list-title gold`} >
                <h3 className="conversation-list-text">Connections</h3>
            </div>
            {approvedConnections.map((connection, index) => <ConversationListItem
                                                                                    key={index}
                                                                                    unread={true}
                                                                                    text={`${connection.OtherUserInfo.first_name} ${connection.OtherUserInfo.last_name[0]}.`}
                                                                                    itemId={`conversation-${index % 2 === 0 ? "chocolate" : "brick"}-${connection.OtherUserInfo.id}`}
                                                                                    color={index % 2 === 0 ? "chocolate" : "brick"}
                                                                                    />)}
        </div>
    )
}

export default Conversations

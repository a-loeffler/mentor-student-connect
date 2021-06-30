const GET_MESSAGES = "messages/get";

const getMessages = (messages, userId) => {
    return {
        type: GET_MESSAGES,
        payload: {messages, userId}
    }
}


export const getMessagesForUser = (userId) => async(dispatch) => {
    const response = await fetch(`/api/users/${userId}/messages`)

    const data = await response.json();

    dispatch(getMessages(data.messages, userId));
}





const initialState = {}

const messagesReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_MESSAGES: {
            let newState = {};
            let messages = action.payload.messages; //an array of message objects
            console.log(messages)
            let userId = action.payload.userId;

            messages.forEach(message => {
                if (message.sender_id === userId) {
                    if (newState[message.recipient_id]) {
                        newState[message.recipient_id].push(message);
                    } else {
                        newState[message.recipient_id] = [message]
                    }
                }
                if (message.recipient_id === userId) {
                    if (newState[message.sender_id]) {
                        newState[message.sender_id].push(message);
                    } else {
                        newState[message.sender_id] = [message]
                    }
                }
            console.log(newState)
            })

            return newState;
        }
        default: {
            return state;
        }
    }
}

export default messagesReducer;

import { csrfFetch } from './csrf'

const GET_MESSAGES = "messages/get";
const POST_MESSAGE = "messages/post"


const getMessages = (messages, userId) => {
    return {
        type: GET_MESSAGES,
        payload: {messages, userId}
    }
}

const postMessage = (recipientId, conversation) => {
    return {
        type: POST_MESSAGE,
        payload: { recipientId, conversation}
    }
}


export const getMessagesForUser = (userId) => async(dispatch) => {
    const response = await fetch(`/api/users/${userId}/messages`)

    const data = await response.json();

    dispatch(getMessages(data.messages, userId));
}


export const postNewMessage = (userId, recipientId, contents) => async(dispatch) => {
    const response = await csrfFetch(`/api/users/${userId}/messages/${recipientId}`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({contents})
    })
    const data = await response.json()
    //expect back the full list of messages that match the recipientId
    dispatch(postMessage(recipientId, data))

}


const initialState = {}

const messagesReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_MESSAGES: {
            let newState = {};
            let messages = action.payload.messages; //an array of message objects

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

            })

            return newState;
        }
        case POST_MESSAGE: {
            let newState = {...state}
            let recipientId = action.payload.recipientId;
            newState[recipientId] = action.payload.conversation;
            return newState;
        }
        default: {
            return state;
        }
    }
}

export default messagesReducer;

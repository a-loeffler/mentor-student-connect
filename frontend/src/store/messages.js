import { csrfFetch } from './csrf'

const GET_MESSAGES = "messages/get";
const POST_MESSAGE = "messages/post";
const SET_REFRESH = "messages/refresh";
const SET_ACTIVE_MESSAGES = "messages/setActive"


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

const refreshMessages = (refreshValue) => {
    return {
        type: SET_REFRESH,
        payload: refreshValue
    }
}

const setActiveMessagesId = (recipientId) => {
    return {
        type: SET_ACTIVE_MESSAGES,
        payload: recipientId
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
    dispatch(postMessage(recipientId, data.conversation))

}


export const setMessagesNeedsRefreshState = (refreshValue) => async(dispatch) => {
    dispatch(refreshMessages(refreshValue))
}


export const setIdForActiveMessages = (recipientId) => async(dispatch) => {
    dispatch(setActiveMessagesId(recipientId))
}


const initialState = {allMessages: {}, needsRefresh: true, activeMessagesId: null}

const messagesReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_MESSAGES: {
            let newState = {...state};
            let messages = action.payload.messages; //an array of message objects

            let userId = action.payload.userId;

            let newAllMessages = {};

            messages.forEach(message => {
                if (message.sender_id === userId) {
                    if (newAllMessages[message.recipient_id]) {
                        newAllMessages[message.recipient_id].push(message);
                    } else {
                        newAllMessages[message.recipient_id] = [message]
                    }
                }
                if (message.recipient_id === userId) {
                    if (newAllMessages[message.sender_id]) {
                        newAllMessages[message.sender_id].push(message);
                    } else {
                        newAllMessages[message.sender_id] = [message]
                    }
                }

            })

            newState.allMessages = newAllMessages;

            return newState;
        }
        case POST_MESSAGE: {
            let newState = Object.assign({}, state)
            let recipientId = action.payload.recipientId;
            newState.allMessages[recipientId].push(action.payload.conversation[action.payload.conversation.length - 1]);
            return newState;
        }
        case SET_REFRESH: {
            let newState = {...state};
            let refreshValue = action.payload;
            newState.needsRefresh = refreshValue;

            return newState;
        }
        case SET_ACTIVE_MESSAGES: {
            let newState = {...state};
            let recipientId = action.payload;
            newState.activeMessagesId = recipientId;

            return newState;
        }
        default: {
            return state;
        }
    }
}

export default messagesReducer;

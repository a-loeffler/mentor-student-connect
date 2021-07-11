import { csrfFetch } from './csrf'

const GET_CONNECTIONS = "connections/get";
const SET_REFRESH = "connections/refresh"
const POST_CONNECTION = "connections/post"

const getConnections = (connectionData, userId) => {
    return {
        type: GET_CONNECTIONS,
        payload: connectionData
    }
}


const refreshConnections = (refreshValue) => {
    return {
        type: SET_REFRESH,
        payload: refreshValue
    }
}


const postConnection = (newConnectionData) => {
    return {
        type: POST_CONNECTION,
        payload: newConnectionData
    }
}


export const getConnectionsForUser = (userId) => async(dispatch) => {
    const response = await fetch(`/api/users/${userId}/connections`)

    const data = await response.json();
    dispatch(getConnections(data.connections, userId))

}

export const setConnectionsNeedsRefreshState = (refreshValue) => async(dispatch) => {
    dispatch(refreshConnections(refreshValue))
}


export const postNewConnection = (studentId, mentorId) => async(dispatch) => {
    const response = await csrfFetch(`/api/users/${studentId}/connections`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({mentor_id: mentorId})
    })
    const data = await response.json()
    dispatch(postConnection(data.connection))
}



const initialState = {allConnections: [], needsRefresh: true}

const connectionsReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_CONNECTIONS: {
            let newState = {...state}

            let connections = action.payload;

            newState.allConnections = connections;

            return newState;
        }
        case SET_REFRESH: {
            let newState = {...state}

            let refreshValue = action.payload;

            newState.needsRefresh = refreshValue;

            return newState;
        }
        case POST_CONNECTION: {
            let newState = {...state}

            let newConnection = action.payload;

            newState.allConnections.push(newConnection);

            return newState;
        }
        default: {
            return state;
        }
    }
}


export default connectionsReducer;

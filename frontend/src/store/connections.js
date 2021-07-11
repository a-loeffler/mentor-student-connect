import { csrfFetch } from './csrf'

const GET_CONNECTIONS = "connections/get";
const SET_REFRESH = "connections/refresh"
const POST_CONNECTION = "connections/post"
const PATCH_CONNECTION = "connections/patch"

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

const patchConnection = (approvedConnection) => {
    return {
        type: PATCH_CONNECTION,
        payload: approvedConnection
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


export const approveConnection = (connectionId) => async(dispatch) => {
    const response = await csrfFetch(`/api/connections/${connectionId}`, {
        method: "PATCH",
    })

    const data = await response.json();

    dispatch(patchConnection(data.connection))
    return response;
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
        case PATCH_CONNECTION: {
            let newState = {...state}

            let approvedConnection = action.payload;

            newState.allConnections.forEach(connection => {
                if (connection.id === approvedConnection.id) {
                    connection.approved = true;
                }
            })

            return newState;
        }
        default: {
            return state;
        }
    }
}


export default connectionsReducer;

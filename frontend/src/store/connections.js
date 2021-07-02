import { csrfFetch } from './csrf'

const GET_CONNECTIONS = "connections/get";
const SET_REFRESH = "connections/refresh"


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


export const getConnectionsForUser = (userId) => async(dispatch) => {
    const response = await fetch(`/api/users/${userId}/connections`)

    const data = await response.json();
    dispatch(getConnections(data.connections, userId))

}


export const setConnectionsNeedsRefreshState = (refreshValue) => async(dispatch) => {
    dispatch(refreshConnections(refreshValue))
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
        default: {
            return state;
        }
    }
}


export default connectionsReducer;

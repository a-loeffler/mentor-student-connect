import { csrfFetch } from './csrf';

const SET_USER = "session/setUser";
const REMOVE_USER = "session/removeUser";
const PATCH_USER = "session/patchUser";

const setUser = (user) => {
    return {
        type: SET_USER,
        user
    }
};

const removeUser = () => {
    return {
        type: REMOVE_USER,
    }
}

const patchUserInfo = (updatedUserData) => {
    return {
        type: PATCH_USER,
        payload: updatedUserData
    }
}

export const login = (user) => async (dispatch) => {
    const { credential, password } = user;
    const response = await csrfFetch('/api/session', {
        method: 'POST',
        body: JSON.stringify({
            credential,
            password,
        }),
    });
    const data = await response.json();
    dispatch(setUser(data.user));
    return response;
};

export const restoreUser = () => async dispatch => {
    const response = await csrfFetch('/api/session');

    const data = await response.json();
    dispatch(setUser(data.user));
    return response;
}


export const signup = (user) => async (dispatch) => {
    const { username, first_name, last_name, email, password, zip_code, mentor, student } = user;
    const response = await csrfFetch("/api/users", {
      method: "POST",
      body: JSON.stringify({
        username,
        first_name,
        last_name,
        email,
        password,
        zip_code,
        mentor,
        student
      }),
    });
    const data = await response.json();
    dispatch(setUser(data.user));
    return response;
}

export const logout = () => async (dispatch) => {
    const response = await csrfFetch('/api/session', {
      method: 'DELETE',
    });
    dispatch(removeUser());
    return response;
};


export const updateUserData = (updatedInfo, userId) => async (dispatch) => {
    // make sure updatedInfo is a POJO

    const response = await csrfFetch(`/api/users/${userId}`, {
        method: 'PATCH',
        body: JSON.stringify(updatedInfo)
    })

    const data = await response.json();

    dispatch(patchUserInfo(data.user))
    return response;
}

const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER: {
            let newState = {...state};
            newState.user = action.user;
            return newState;
        }
        case REMOVE_USER: {
            let newState = {...state};
            newState.user = null;
            return newState;
        }
        case PATCH_USER: {
            let newState = {...state};
            let updatedUserData = action.payload;
            
            let keysOfUpdate = Object.keys(updatedUserData)
            keysOfUpdate.forEach(key => {
                if (newState.user[key] !== updatedUserData[key]) {
                    newState.user[key] = updatedUserData[key]
                }
            })

            return newState;
        }
        default:
            return state;
    }
};

export default sessionReducer;

const GET_MENTORS = "get/mentors"


const setMentors = (mentors) => {
    return {
        type: GET_MENTORS,
        payload: mentors
    }
}


export const getMentors = (zipcode) => async(dispatch) => {
    const response = await fetch(`/api/mentors/${zipcode}`)

    const data = await response.json();
    dispatch(setMentors(data.mentors))
}


const initialState = {}

const mentorsReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_MENTORS: {
            let newState = {...state}

            let mentors = action.payload;

            mentors.forEach(mentor => {
                newState[mentor.id] = mentor
            })

            return newState;
        }
        default: {
            return state;
        }
    }
}


export default mentorsReducer;

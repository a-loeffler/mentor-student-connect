
import {useSelector, useDispatch} from 'react-redux';

import Navbar from './Navbar';


import { getMessagesForUser, setMessagesNeedsRefreshState } from '../../store/messages'
import { getConnectionsForUser, setConnectionsNeedsRefreshState } from '../../store/connections';
import { getMentors } from '../../store/mentors';

const Navigation = ({ isLoaded }) => {
    const dispatch = useDispatch();


    const currentUser = useSelector(state => state.session.user);
    const connectionsNeedRefresh = useSelector(state => state.userConnections.needsRefresh)
    const messagesNeedRefresh = useSelector(state => state.userMessages.needsRefresh)
    const mentors = useSelector(state => state.mentors)

    if (currentUser) {
        if (connectionsNeedRefresh) {
            dispatch(getConnectionsForUser(currentUser.id))
            dispatch(setConnectionsNeedsRefreshState(false))
        }

        if (messagesNeedRefresh) {
            dispatch(getMessagesForUser(currentUser.id))
            dispatch(setMessagesNeedsRefreshState(false))
        }

        if (Object.keys(mentors).length === 0) {
            dispatch(getMentors(currentUser.zip_code))
        }

    }

    return (
        <nav className="header-nav">
            <Navbar />

        </nav>
    )
}


export default Navigation;

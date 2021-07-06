import {NavLink} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';

import Navbar from './Navbar';


import { getMessagesForUser, setMessagesNeedsRefreshState } from '../../store/messages'
import { getConnectionsForUser, setConnectionsNeedsRefreshState } from '../../store/connections';


const Navigation = ({ isLoaded }) => {
    const dispatch = useDispatch();


    const currentUser = useSelector(state => state.session.user);
    const connectionsNeedRefresh = useSelector(state => state.userConnections.needsRefresh)
    const messagesNeedRefresh = useSelector(state => state.userMessages.needsRefresh)

    if (currentUser) {
        if (connectionsNeedRefresh) {
            dispatch(getConnectionsForUser(currentUser.id))
            dispatch(setConnectionsNeedsRefreshState(false))
        }

        if (messagesNeedRefresh) {
            dispatch(getMessagesForUser(currentUser.id))
            dispatch(setMessagesNeedsRefreshState(false))
        }
    }

    return (
        <nav className="header-nav">
            <Navbar />

        </nav>
    )
}


export default Navigation;

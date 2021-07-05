import {NavLink} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';

import ProfileButton from './ProfileButton';
import SearchBar from './SearchBar';

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

    let navBarLinks;
    if (!currentUser) {
        navBarLinks = (
            <>
                <NavLink to="/login">Log In</NavLink>
                <NavLink to="/signup">Sign Up</NavLink>
            </>
        )
    } else {
        navBarLinks = (
            <ProfileButton user={currentUser}/>
        )
    }

    return (
        <nav className="header-nav">
            <ul>
                <li>
                    <NavLink exact to="/">Home</NavLink>
                    <SearchBar />
                    {isLoaded && navBarLinks}
                </li>
            </ul>

        </nav>
    )
}


export default Navigation;

import {NavLink} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';

import ProfileButton from './ProfileButton';
import SearchBar from './SearchBar';

import { getMessagesForUser } from '../../store/messages'


const Navigation = ({ isLoaded }) => {
    const dispatch = useDispatch();


    const currentUser = useSelector(state => state.session.user);

    if (currentUser) {
        dispatch(getMessagesForUser(currentUser.id))
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

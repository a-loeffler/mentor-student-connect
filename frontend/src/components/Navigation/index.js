import {NavLink} from 'react-router-dom';
import {useSelector} from 'react-redux';

import ProfileButton from './ProfileButton';
import SearchBar from './SearchBar';


const Navigation = ({ isLoaded }) => {



    const currentUser = useSelector(state => state.session.user);

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

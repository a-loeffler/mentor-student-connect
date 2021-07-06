import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom'
import * as sessionActions from '../../store/session';


const ProfileModal = () => {
    const dispatch = useDispatch();
    const history = useHistory()

    const logoutActions = (e) => {
        e.preventDefault();

        dispatch(sessionActions.logout())
            .then(history.push('/'))
    }

    return (
        <div className="profile-modal-container">
            <ul className="profile-menu-list">
                <li className="profile-menu-list-item">Find Nearby Events</li>
                <li className="profile-menu-list-item">Locate a Mentor</li>
                <li className="profile-menu-list-item">Edit Account Settings</li>
                <li className="profile-menu-list-item log-out-item" onClick={e => logoutActions(e)}>Log Out</li>
            </ul>
        </div>
    )
}

export default ProfileModal

import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';


import RedirectModal from '../RedirectModal';
import UserEditPage from './UserEditPage';
import MessagesWidget from '../MessagesWidget';
import FindMentorsWidget from '../FindMentorsWidget/FindMentorsWidget';
import ApproveConnectionsWidget from '../FindMentorsWidget/ApproveConnectionsWidget';

import './index.css'

const UserPage = ({editorOpen}) => {

    const { id } = useParams();


    const currentUser = useSelector(state => state.session.user)


    if (!currentUser) {
        return (
            <RedirectModal />
        )
    }

    if (currentUser) {
        if (currentUser.id !== parseInt(id, 10)) {
            return (
                <RedirectModal />
            )
        }
    }


    return (
        <div className="user-page-container">
            <div className="corner-container">
                <div className="corner-background"></div>
                <div className="corner-profile-image-container">
                    <img className="corner-profile-image" src="/images/profile.svg" alt="User profile avatar"></img>
                </div>
                {editorOpen === false && <div className="corner-profile-info-container">
                    <h1 className="corner-profile-info-name">{`${currentUser.first_name} ${currentUser.last_name}`}</h1>
                    <h2 className="corner-profile-info-data">{`Username: ${currentUser.username}`}</h2>
                    <h2 className="corner-profile-info-data" >{`Email: ${currentUser.email}`}</h2>
                    <h2 className="corner-profile-info-data">{`Zipcode: ${currentUser.zip_code}`}</h2>
                    <h2 className="corner-profile-info-data edit-settings"><Link className="edit-settings" to={`/users/${currentUser.id}/edit`} >edit settings</Link></h2>
                </div>}
                {editorOpen === true && <UserEditPage currentUser={currentUser}/>}
            </div>
            <div className="user-page-widgets-container">
                <MessagesWidget />
                {currentUser.student === true && <FindMentorsWidget />}
                {currentUser.mentor === true && <ApproveConnectionsWidget />}
            </div>
        </div>
    )
}

export default UserPage

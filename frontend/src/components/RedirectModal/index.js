import React, {useEffect, useState} from 'react';
import { useHistory } from 'react-router';


import './index.css'


const RedirectModal = () => {

    const history = useHistory();
    const [timeDone, setTimeDone] = useState(false)



    setTimeout(() => {
        setTimeDone(true);
    }, 2501)



    if (timeDone) {
        history.push('/')
    }


    return (
        <div className="redirect-modal-container">
            <h1 className="redirect-modal-title">Sorry, you do not have permission to access this page...</h1>
        </div>
    )

}


export default RedirectModal

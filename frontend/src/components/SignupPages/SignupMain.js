import { Switch, Route } from 'react-router-dom';

import CreateUserForm from '../CreateUserForms/CreateUserForm';

const SignUpMain = () => {



    return (
        <div className="signup-main-container">
            <Switch>
                <Route path="/mentor">
                    <CreateUserForm title={"Sign Up as a Mentor"} student={false} mentor={true} />
                </Route>
            </Switch>
        </div>
    )
}

export default SignUpMain;

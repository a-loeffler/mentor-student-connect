import { Switch, Route } from 'react-router-dom';

import CreateUserForm from '../CreateUserForms/CreateUserForm';

const SignUpMain = () => {



    return (
        <div className="signup-main-container">
            <Switch>
                <Route path="/signup/mentor">
                    <CreateUserForm title={"Sign Up as a Mentor"} student={false} mentor={true} />
                </Route>
                <Route path="/signup/student">
                    <CreateUserForm title={"Sign Up as a Student"} student={true} mentor={false} />
                </Route>
            </Switch>
        </div>
    )
}

export default SignUpMain;

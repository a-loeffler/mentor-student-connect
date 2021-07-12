import { Switch, Route } from 'react-router-dom';

import CreateUserForm from '../CreateUserForms/CreateUserForm';
import SignupChoice from './SignupChoice';

const SignUpMain = () => {



    return (
        <div className="signup-main-container">
            <Switch>
                <Route path="/signup/" exact>
                    <SignupChoice />
                </Route>
                <Route path="/signup/mentor" exact>
                    <CreateUserForm title={"Sign Up as a Mentor"} student={false} mentor={true} />
                </Route>
                <Route path="/signup/student" exact>
                    <CreateUserForm title={"Sign Up as a Student"} student={true} mentor={false} />
                </Route>
            </Switch>
        </div>
    )
}

export default SignUpMain;

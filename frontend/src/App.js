import { Switch, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import * as sessionActions from './store/session';


import LoginFormPage from './components/LoginFormPage';
import SignUpFormPage from './components/SignUpFormPage';
import Navigation from './components/Navigation';
import MessagesWidget from './components/MessagesWidget';
import CreateUserForm from './components/CreateUserForms/CreateUserForm';
import SignUpMain from './components/SignupPages/SignupMain';
import UserRouter from './components/UserPage/index';
import FindMentorsWidget from './components/FindMentorsWidget/FindMentorsWidget';

function App() {
  const dispatch = useDispatch()

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch])

  return isLoaded && (
    <>
      <Navigation isLoaded={isLoaded}/>
      <Switch>
        <Route path="/login">
          <LoginFormPage />
        </Route>
        <Route path="/signup">
          <SignUpMain />
        </Route>
        <Route path="/messages">
          <MessagesWidget />
        </Route>
        <Route path="/form" >
          <CreateUserForm title={"Sign Up as a Student"} mentor={false} student={true} />
        </Route>
        <Route path="/users">
          <UserRouter />
        </Route>
        <Route path="/findmentor">
          <FindMentorsWidget />
        </Route>
      </Switch>
    </>
  );
}

export default App;

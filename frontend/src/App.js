import { Switch, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import * as sessionActions from './store/session';


import LoginFormPage from './components/LoginFormPage';
import Navigation from './components/Navigation';
import SignUpMain from './components/SignupPages/SignupMain';
import UserRouter from './components/UserPage/index';
import ApproveConnectionsWidget from './components/FindMentorsWidget/ApproveConnectionsWidget';

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
        <Route path="/users">
          <UserRouter />
        </Route>
        <Route path="/approve">
          <ApproveConnectionsWidget />
        </Route>
      </Switch>
    </>
  );
}

export default App;

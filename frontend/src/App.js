import { Switch, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import * as sessionActions from './store/session';


import LoginFormPage from './components/LoginFormPage';
import Navigation from './components/Navigation';
import SignUpMain from './components/SignupPages/SignupMain';
import UserRouter from './components/UserPage/index';
import LandingPage from './components/LandingPage'


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
        <Route path="/" exact>
          <LandingPage />
        </Route>
        <Route path="/signup">
          <SignUpMain />
        </Route>
        <Route path="/users">
          <UserRouter />
        </Route>
        <Route path="/events">
          <div><h1>Coming soon!</h1></div>
        </Route>
        <Route path="*">
          <div><h1 >404 Not found</h1></div>
        </Route>
      </Switch>
    </>
  );
}

export default App;

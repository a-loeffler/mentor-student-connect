import { Switch, Route } from 'react-router-dom';


import UserPage from './UserPage';

const UserRouter = () => {



    return (
        <div className="user-pages-main-container">
            <Switch>
                <Route path="/users/:id/" exact={true} >
                    <UserPage editorOpen={false}/>
                </Route>
                <Route path="/users/:id/edit" exact={true} >
                    <UserPage editorOpen={true}/>
                </Route>
            </Switch>
        </div>
    )
}

export default UserRouter

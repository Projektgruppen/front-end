import './App.css';
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';
import ListQAMessageComponent from './component/test/ListQAMessageComponent';
import ModeratorComponent from './component/ModeratorComponent'
import AddQAMessageComponent from "./component/test/AddQAMessageComponent";
import StudentComponent from "./component/StudentComponent";
import RecruiterComponent from "./component/RecruiterComponent";
import LogComponent from './component/LogComponent';

function App() {
  return (
    <div>
        <Router>
            <div className="container">
                <Switch>
                    //student routes
                    <Route path="/students" component={StudentComponent}></Route>

                    //recruiter routes
                    <Route path="/recruiters" component={RecruiterComponent}></Route>

                    //moderator routes
                    <Route path="/moderators" component={ModeratorComponent}></Route>

                    //log page route
                    <Route path="/logs" component={LogComponent}></Route>
                    
                    //test routes
                    <Route exact path = "/" component= {ListQAMessageComponent}></Route>
                    <Route path = "/test" component= {ListQAMessageComponent}></Route>
                    <Route path = "/add-message" component= {AddQAMessageComponent}></Route>
                    <Route path="/edit-message/:id" component = {AddQAMessageComponent}></Route>
                    
                </Switch>
            </div>
        </Router>
    </div>
  );
}

export default App;

import './App.css';
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';
import ListQAMessageComponent from './component/test/ListQAMessageComponent';
import ModeratorComponent from './component/ModeratorComponent'
import AddQAMessageComponent from "./component/test/AddQAMessageComponent";
import StudentComponent from "./component/StudentComponent";
import RecruiterComponent from "./component/RecruiterComponent";
import LogComponent from './component/LogComponent';
import Iframetest from "./component/test/iframetest";
function App() {
  return (
    <div>
        <Router>
            <div className="container">
                <Switch>
                    //student routes
                    <Route path="/student/:organisationName" component={StudentComponent}> </Route>

                    //recruiter routes
                    <Route path="/recruiter/:organisationName" component={RecruiterComponent}> </Route>

                    //moderator routes
                    <Route path="/moderator/:organisationName" component={ModeratorComponent}> </Route>

                    //log page route
                    <Route path="/logs" component={LogComponent}> </Route>

                    //iframe
                    <Route path="/iframe" component={Iframetest}> </Route>
                    
                </Switch>
            </div>
        </Router>
    </div>
  );
}

export default App;

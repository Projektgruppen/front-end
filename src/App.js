import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import ModeratorComponent from './component/ModeratorComponent'
import StudentComponent from "./component/StudentComponent";
import RecruiterComponent from "./component/RecruiterComponent";
import LogComponent from './component/LogComponent';
import Iframe from "./component/Iframe";
function App() {
  return (
    <div>
        <Router>
            <div className="container">
                <Switch>
                    //student routes
                    <Route  path="/student/:organisationName" component={StudentComponent}></Route>

                    //recruiter routes
                    <Route path="/recruiter/:organisationName" component={RecruiterComponent}></Route>

                    //moderator routes
                    <Route path="/moderator/:organisationName" component={ModeratorComponent}></Route>

                    //log page route
                    <Route path="/logs" component={LogComponent}></Route>

                    //iframe
                    <Route path="/iframe" component={Iframe}></Route>
                </Switch>
            </div>
        </Router>
    </div>
  );
}

export default App;

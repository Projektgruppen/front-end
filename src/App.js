import './App.css';
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';
import ListQAMessageComponent from './component/test/ListQAMessageComponent';
import ModeratorComponent from './component/ModeratorComponent'
import AddQAMessageComponent from "./component/test/AddQAMessageComponent";
import StudentComponent from "./component/StudentComponent";
import RecruiterComponent from "./component/RecruiterComponent";
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

                    //test routes
                    <Route exact path = "/" component= {ListQAMessageComponent}></Route>
                    <Route path = "/test" component= {ListQAMessageComponent}></Route>
                    <Route path = "/add-message" component= {AddQAMessageComponent}></Route>
                    <Route path="/edit-message/:id" component = {AddQAMessageComponent}></Route>
                    <Route path="/moderatorview" component={ModeratorComponent}></Route>
                </Switch>
            </div>
        </Router>
    </div>
  );
}

export default App;

import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import ModeratorComponent from './component/ModeratorComponent'
import ModeratorHomeComponent from './component/ModeratorHomeComponent';
import ModeratorNewOrganisationComponent from './component/ModeratorNewOrganisationComponent';
import StudentComponent from "./component/StudentComponent";
import RecruiterComponent from "./component/RecruiterComponent";
import LogComponent from './component/LogComponent';
import Iframe from "./component/Iframe";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCheck, fas, faUserCheck } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import RecruiterLogComponent from "./component/RecruiterLogComponent";

library.add(faCheck, fas, faUserCheck)

function App() {
  return (
    <div>
        <Router>
            <div>
                <Switch>
                    {/*student routes*/}
                    <Route  path="/student/:organisationName" component={StudentComponent}></Route>

                    {/*recruiter routes*/}
                    <Route path="/recruiter/:organisationName" component={RecruiterComponent}></Route>

                    {/*moderator routes*/}
                    <Route path="/moderator/:organisationName" component={ModeratorComponent}></Route>
                    <Route path="/home/moderator/" component={ModeratorHomeComponent}></Route>
                    <Route path="/new/organisation/moderator/" component={ModeratorNewOrganisationComponent}></Route>

                    {/*log page routes*/}
                   
                    //log page route
                    <Route path="/:organisationName/logs" component={RecruiterLogComponent}></Route>

                    {/*ifram routes*/}
                    <Route path="/iframe" component={Iframe}></Route>


                </Switch>
            </div>
        </Router>

    </div>
  );
}

export default App;

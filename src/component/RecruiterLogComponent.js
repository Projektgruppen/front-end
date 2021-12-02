import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import RecruiterService from "../service/RecruiterService";

const RecruiterLogComponent = () => {

    const [session, setSession] = useState([]);
    const {organisationName} = useParams();
    let orgImage;

    //Gets all the questions that the recruiter should review.
    const getAllSessionsByOrganisationName = () => {
        RecruiterService.getAllSessionsByOrganisationName(organisationName).then((response) => {
            setSession(response.data)
            console.log(response.data)
        }).catch(error => {
            console.log(error)
        })
    }
    const loadOrgLogo = () => {

        switch (organisationName) {
            case "politiet":
                orgImage = "http://pingvinnyt.dk/wp-content/uploads/2019/07/POLITI-rigspoliet899.jpg"
                break;
            case "forsvaret":
                orgImage = "http://www.forsvaret.tv/images/forsvaret.png"
                break;
            default:
                orgImage = ""

        }
    }

    loadOrgLogo()

    //Fetches all questions on page load, and then every second afterwards.
    useEffect(() => {
        getAllSessionsByOrganisationName();
        const interval = setInterval(() => {
            getAllSessionsByOrganisationName();
        }, 1000);
        return () => clearInterval(interval);
    }, [])


    return (
        <div className="container">
            <div>
                <div>
                    <img id="img-org" className="image-resize float-right1" src={orgImage}></img>
                    <Link className="btn btn-outline-dark logs-button" to={`/recruiter/${organisationName}`}>Tilbage</Link>
                </div>
                <div>
                    {
                        session.map(
                            sessionMap =>
                                <table className="table table-bordered table-striped table-hover">
                                    <thead>
                                    <th>Session id</th>
                                    <th>Time created</th>
                                    <th>Download log</th>
                                    </thead>
                                    <tbody>
                                    <td>{sessionMap.sessionId}</td>
                                    <td>{sessionMap.timeOfCreation}</td>
                                    <td><a href={`http://localhost:8080/api/v1/logs/${sessionMap.sessionId}/download`}
                                           rel="nofollow"> Download </a></td>
                                    </tbody>
                                </table>
                        )
                    }
                </div>
            </div>

        </div>
    );
}

export default RecruiterLogComponent;
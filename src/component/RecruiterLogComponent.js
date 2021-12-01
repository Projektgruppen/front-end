import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import RecruiterService from "../service/RecruiterService";

const RecruiterLogComponent = () => {

    const [session, setSession] = useState([]);
    const {organisationName} = useParams();

    //Gets all the questions that the recruiter should review.
    const getAllSessionsByOrganisationName = () => {
        RecruiterService.getAllSessionsByOrganisationName(organisationName).then((response) => {
            setSession(response.data)
            console.log(response.data)
        }).catch(error => {
            console.log(error)
        })
    }
    //Fetches all questions on page load, and then every second afterwards.
    useEffect(() => {
        getAllSessionsByOrganisationName();
        const interval = setInterval(() => {
            getAllSessionsByOrganisationName();
        }, 1000);
        return () => clearInterval(interval);
    }, [])


    return (
        <div>
            <div>
                <h2 className="text-center">Logs for {organisationName} </h2>
                <Link to={`/recruiter/${organisationName}`}>Recruiter Q&A site</Link>
                <div>
                    {
                        session.map(
                            sessionMap =>
                                <table className="table table-bordered table-striped">
                                    <thead>
                                    <th>Session id</th>
                                    <th>Time created</th>
                                    <th>Download log</th>
                                    </thead>
                                    <tbody>
                                    <td>{sessionMap.sessionId}</td>
                                    <td>{sessionMap.timeOfCreation}</td>
                                    <td> <a href={`http://localhost:8080/api/v1/logs/${sessionMap.sessionId}/download`} rel="nofollow"> Download </a> </td>
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
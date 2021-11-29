import React, {useState, useEffect} from "react";
import {useParams} from 'react-router-dom'
import LogService from "../service/LogService";

const LogComponent = () => {

    const {organisationName} = useParams();
    const [sessions, setSessions] = useState([]);

    const getAllOrganisationSessions = () => {
        LogService.getAllOrganisationSessions(organisationName).then((response) => {
            setSessions(response.data)
        }).catch(error => {
            console.log(error)
        })
    }

    useEffect(() => {
        getAllOrganisationSessions();
    }, [])

    return (
        <div className = "container">
        <i>Logs fra {organisationName} </i>
        <div className="Session page">
                <div className="scroll-overflow">
                    {
                        sessions.map(
                            session =>
                                <div key={session.id} className="QASessions">
                                    <p className="question"><b>Session </b>{session.id}</p>
                                    <div className="linebreak"></div>
                                    <p id="answer" className={` ${session.id ? " " : "hidden"}`}> <b> A:  </b> {session.id}</p>
                                </div>
                        )
                    }
                </div>
            </div>
    </div>
    )
}

export default LogComponent

//<td> Test </td>  
//<td> Test 2 </td>
//<td> <a href="http://localhost:8080/api/v1/logs/download" rel="nofollow"> Download </a> </td>

import React, {useEffect} from "react";
import {useParams} from 'react-router-dom'
import LogService from "../service/LogService";

const LogComponent = () => {

    const {organisationName} = useParams();

    const getAllLogs = () => {
        LogService.getAllLogs(organisationName).then((response) => {
            setLogs(response.data)
        }).catch(error => {
            console.log(error)
        })
    }

    useEffect(() => {
        getAllLogs();
    }, [])

    return (
        <div className = "container">
        <i>Logs fra {organisationName} </i>
        <div className="Log page">
                <div className="scroll-overflow">
                    {
                        sessions.map(
                            session =>
                                <div key={log.id} className="QAlog">
                                    <p className="question"><b>Q:  </b>{log.question}</p>
                                    <div className="linebreak"></div>
                                    <p id="answer" className={` ${log.answer ? " " : "hidden"}`}> <b> A:  </b> {log.answer}</p>
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

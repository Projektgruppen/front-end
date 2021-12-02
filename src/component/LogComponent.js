import React from 'react'
import {useParams} from "react-router-dom";
import CSVservice from "../service/CSVservice";
const LogComponent = () => {
    const {sessionId} = useParams();

    const getCSVinfo = () =>{
        CSVservice.getFile(sessionId).then(() => {

            }

        )
    }
    getCSVinfo();

    return (
        <div className = "container">
        <h2 className = "text-center">List of Logs</h2>
        <table className="table table-bordered table-striped">
            <thead>
                <th> Session Id</th>
                <th> Log</th>
            </thead>
            <tbody>
                <tr>
                    <td>{sessionId}</td>
                   <td> <a href={`http://localhost:8080/api/v1/logs/${sessionId}/download`} rel="nofollow"> Download </a> </td>
                </tr>
            </tbody>
        </table>
    </div>
    )
}

export default LogComponent

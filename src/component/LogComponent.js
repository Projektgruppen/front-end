import React from 'react'

const LogComponent = () => {
    return (
        <div className = "container">
        <h2 className = "text-center">List of Logs</h2>
        <table className="table table-bordered table-striped">
            <thead>
                <th> Session</th>
                <th> Log</th>
            </thead>
            <tbody>
                <tr> 
                   <td> Test </td>  
                   <td> <a href="http://localhost:8080/api/v1/logs/download" rel="nofollow"> Download </a> </td>
                </tr>
            </tbody>
        </table>
    </div>
    )
}

export default LogComponent

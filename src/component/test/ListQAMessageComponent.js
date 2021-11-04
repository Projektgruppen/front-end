import React, {useState, useEffect} from 'react'
import StudentService from '../../service/QAMessageTestService'
import {Link} from "react-router-dom";
import QAMessageService from "../../service/QAMessageTestService";

function ListQAMessageComponent() {

    const [messages, setMessages] = useState([])

    useEffect(() => {
            QAMessageService.getAllMessages().then((response) =>{
                setMessages(response.data)
                console.log(response.data);
            }).catch(error => {
                console.log(error);
            })
    }, [])

    useEffect(() => {
        const interval = setInterval(() => {
            QAMessageService.getAllMessages().then((response) =>{
                setMessages(response.data)
                console.log(response.data);
            }).catch(error => {
                console.log(error);
            })
        }, 1000);
        return () => clearInterval(interval);
    }, [])

    function checkIfApproved(messageApproved){
        if (messageApproved === true){
            messageApproved = "Message Approved!"
        }else{
            messageApproved = "Message Denied!"
        }
        return messageApproved;
    }

    return (
        <div className = "container">
            <h2 className = "text-center">List of Messages</h2>
            <Link to = "/add-message" className = "btn btn-primary mb-2" > Add Message</Link>
            <table className="table table-bordered table-striped">
                <thead>
                    <th> Id</th>
                    <th> Question</th>
                    <th> Answer</th>
                    <th> Approved</th>
                    <th> Actions</th>
                </thead>
                <tbody>
                    {
                        messages.map(
                            message =>
                            <tr key = {message.id}>
                                <td>{message.id}</td>
                                <td>{message.question}</td>
                                <td>{message.answer}</td>
                                <td>{checkIfApproved(message.approve)}</td>
                                <td>
                                    <Link className="btn btn-info" to={`/edit-message/${message.id}`}> Update </Link>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}

export default ListQAMessageComponent

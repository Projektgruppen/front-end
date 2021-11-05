//Work in progress.
//This view does not work yet.



import React, {useState, useEffect} from "react";
import {Link, useHistory, useParams} from 'react-router-dom'
import ModeratorService from "../service/ModeratorService";

const ModeratorComponent = () => {

    const [approve, setApprove] = useState('');
    const [messages, setMessages] = useState([])

    const history = useHistory();
    const {id} = useParams();

    //runs when page refreshes
    useEffect(() => {
        getAllUnapprovedMessages();
    }, [])

    //runs when page refreshes but afterwards every second
    useEffect(() => {
        const interval = setInterval(() => {
            getAllUnapprovedMessages();
        }, 1000);
        return () => clearInterval(interval);
    }, [])

    //sets shown messages to be all the unapproved questions
    const getAllUnapprovedMessages = () =>{
        ModeratorService.getAllUnapprovedMessages().then((response) =>{
            setMessages(response.data)
        }).catch(error => {
            console.log(error);
        })
    }

    //sets the approve value of a question to true
    const approveQuestion = (messageId) => {

        console.log(messageId)

        ModeratorService.approveQuestion(messageId).then((response) =>{
        getAllUnapprovedMessages();
        }).catch(error =>{
            console.log(error);
        })
    }

    return (
        <div>
            <br/> <br/>
            <div className="container">
                <div className="row">
                    <div className="card col-md-6 offset-md-3 offset-md-3">
                        <div className="card-body">
                            <form>
                                <div className= "form-group mb-2">
                                    <table className="table table-bordered table-striped">
                                        <thead>
                                            <th> Question</th>
                                            <th> Status </th>
                                        </thead>
                                        <tbody>
                                        {
                                            messages.map(
                                                message =>
                                                    <tr key = {message.id}>
                                                        <td>{message.question}</td>
                                                        <td>
                                                        <Link className="btn btn-success" onClick={() => approveQuestion(message.id)} to="/moderators/" >Approve</Link>
                                                        </td>
                                                    </tr>
                                            )
                                        }
                                        </tbody>
                                    </table>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ModeratorComponent
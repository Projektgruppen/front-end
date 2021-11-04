//Work in progress.
//This view does not work yet.



import React, {useState, useEffect} from "react";
import {Link, useHistory, useParams} from 'react-router-dom'
import QAMessageService from "../service/QAMessageTestService";

const ModeratorComponent = () => {

    const [approve, setApprove] = useState('');
    const [messages, setMessages] = useState([])

    const history = useHistory();
    const {id} = useParams();

    useEffect(() => {
        QAMessageService.getAllMessages().then((response) =>{
            setMessages(response.data)
        }).catch(error => {
            console.log(error);
        })
    }, [])

    useEffect(() => {
        const interval = setInterval(() => {
            QAMessageService.getAllMessages().then((response) =>{
                setMessages(response.data)
            }).catch(error => {
                console.log(error);
            })
        }, 1000);
        return () => clearInterval(interval);
    }, [])
//TODO Fix this method so that it works
    const approveQuestion = (messageId) => {

         console.log(messageId)

         QAMessageService.approveQuestion(messageId).then((response) =>{

         }).catch(error =>{
             console.log(error);
        })
    }

    useEffect(() => {

        QAMessageService.getMessagesById(id).then((response) => {
            setApprove(response.data.approve)
        }).catch(error => {
            console.log(error)
        })
    }, []);
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
                                                        <button className="btn btn-success" onClick={() => approveQuestion(2)}>Approve</button>
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
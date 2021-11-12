import React, {useState, useEffect} from "react";
import {Link} from 'react-router-dom'
import RecruiterService from "../service/RecruiterService";

const RecruiterComponent = () => {

    const [qaMessages, setQAMessages] = useState([])
    const [answer, setAnswer] = useState([]);

    const getAllNoneAnsweredApprovedQAMessages = () => {
        RecruiterService.getAllNoneAnsweredApprovedQAMessages().then((response) =>{
            setQAMessages(response.data)
        }).catch(error => {
            console.log(error)
        })
    }
    //Fetches all messages once every second.
    useEffect(() => {
        getAllNoneAnsweredApprovedQAMessages();
        const interval = setInterval(() => {
            getAllNoneAnsweredApprovedQAMessages();
        }, 1000);
        return () => clearInterval(interval);
    }, [])


    //Update question with answer
    const answerQAMessage = (a,id) => {
        const answer = {a}

        RecruiterService.updateQAMessageAnswer(id,answer).then((response) =>{
            getAllNoneAnsweredApprovedQAMessages()
        }).catch(error =>{
            console.log(error);
        })
    }
    
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
            <h2 className = "text-center">Recruiter view</h2>
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
                    qaMessages.map(
                        message =>
                            <tr key = {message.id}>
                                <td>{message.id}</td>
                                <td>{message.question}</td>
                                <td>
                                    <form>
                                        <input
                                            type = "text"
                                            placeholder="Enter answer"
                                            name = "answer"
                                            className="form-control"
                                            value={message.id.answer}
                                            onChange={(a)=> setAnswer(a.target.value)}
                                            >
                                        </input>
                                        <Link className="btn btn-success" onClick={() => answerQAMessage(answer,message.id)}  to="/recruiters/"> Answer</Link>
                                    </form>
                                </td>
                                <td>{checkIfApproved(message.approve)}</td>

                            </tr>
                    )
                }
                </tbody>
            </table>
        </div>
    )
}
export default RecruiterComponent
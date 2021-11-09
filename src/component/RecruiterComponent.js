import React, {useState, useEffect} from "react";
import {Link, useHistory, useParams} from 'react-router-dom'
import RecruiterService from "../service/RecruiterService";

const RecruiterComponent = () => {

    //const [question, setQuestion] = useState('');
    const [messages, setMessages] = useState([])
    const [answer, setAnswer] = useState('');

    const history = useHistory();
    const {id} = useParams();

    //Fetches all messages when page loads.
    useEffect(() => {
        RecruiterService.getNoneAnsweredApprovedMessages().then((response) =>{
            setMessages(response.data)
            console.log(response.data);
        }).catch(error => {
            console.log(error);
        })
    }, [])

    //Fetches all messages once every second.
    useEffect(() => {
        const interval = setInterval(() => {
            RecruiterService.getNoneAnsweredApprovedMessages().then((response) =>{
                setMessages(response.data)
                console.log(response.data);
            }).catch(error => {
                console.log(error);
            })
        }, 1000);
        return () => clearInterval(interval);
    }, [])


    const getNoneAnsweredApprovedMessages = () => {
        RecruiterService.getNoneAnsweredApprovedMessages().then((response) =>{
            setAnswer(response.data)
        }).catch(error => {
            console.log(error)
        })
    }


    //Update question with answer
    const answerMessage = (a,id) => {

        const answer = {a}


        RecruiterService.updateMessages(id,answer).then((response) =>{
            getNoneAnsweredApprovedMessages()
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
                    messages.map(
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
                                            value={answer}
                                            onChange={(a)=> setAnswer(a.target.value)}
                                            >
                                        </input>
                                        <Link className="btn btn-success" onClick={() => answerMessage(answer,message.id)}  to="/recruiters/"> Answer</Link>
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
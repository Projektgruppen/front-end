import React, {useState, useEffect} from "react";
import {Link, useHistory, useParams} from 'react-router-dom'
import RecruiterService from "../service/RecruiterService";

const RecruiterComponent = () => {

    const [question, setQuestion] = useState('');
    const [messages, setMessages] = useState([])
    const [answer, setAnswer] = useState('');

    const history = useHistory();
    const {id} = useParams();

    //Fetches all messages when page loads.
    useEffect(() => {
        RecruiterService.getAllApprovedMessages().then((response) =>{
            setMessages(response.data)
            console.log(response.data);
        }).catch(error => {
            console.log(error);
        })
    }, [])

    //Fetches all messages once every second.
    useEffect(() => {
        const interval = setInterval(() => {
            RecruiterService.getAllApprovedMessages().then((response) =>{
                setMessages(response.data)
                console.log(response.data);
            }).catch(error => {
                console.log(error);
            })
        }, 1000);
        return () => clearInterval(interval);
    }, [])

    //Answer message
    useEffect(() => {
        RecruiterService.getMessagesById(id).then((response) => {
            //setQuestion(response.data.question)
            setAnswer(response.data.answer)
        }).catch(error => {
            console.log(error)
        })
    }, []);
    const title = () => {
        if(id){
            return <h2 className="text-center"> Update Message</h2>
        }
    }

    //Update question with answer
    const answerMessage = (a) => {
        a.preventDefault();

        const message = {answer};

        RecruiterService.updateMessages(id,message).then((response) =>{
            history.push('/recruiters')
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
export default RecruiterComponent
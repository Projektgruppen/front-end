import React, {useState, useEffect} from "react";
import {Link, useParams} from 'react-router-dom'
import RecruiterService from "../service/RecruiterService";

const RecruiterComponent = () => {

    const [qaMessages, setQAMessages] = useState([])
    const [answer, setAnswer] = useState([]);
    const {organisationName} = useParams();

    const getAllReviewedQAMessages = () => {
        RecruiterService.getAllReviewedQAMessages(organisationName).then((response) =>{
            setQAMessages(response.data)
        }).catch(error => {
            console.log(error)
        })
    }
    //Fetches all messages once every second.
    useEffect(() => {
        getAllReviewedQAMessages();
        const interval = setInterval(() => {
            getAllReviewedQAMessages();
        }, 1000);
        return () => clearInterval(interval);
    }, [])


    //Update question with answer
    const answerQAMessage = (a,id,q_id) => {
        a.preventDefault()

        const message = {id,answer}

        console.log(id,q_id,message)

        RecruiterService.updateQAMessageAnswer(q_id,message).then((response) =>{
            getAllReviewedQAMessages()
        }).catch(error =>{
            console.log(error);
        })
    }

    return (
        <div className = "container text-center chat-name">
            <h2 className = "text-center">Recruiter view</h2>
            <i>Du er logget ind som {organisationName} </i>
            <table className="table table-bordered table-striped">
                <thead>
                <th> Question</th>
                <th> Answer</th>
                </thead>
                <tbody>
                {
                    qaMessages.map(
                        message =>
                            <tr key = {message.id}>
                                <td>{message.question}</td>
                                <td>
                                    <form>
                                        <input
                                            type = "text"
                                            placeholder="Enter answer"
                                            name = "answer"
                                            className="form-control"
                                            onChange={(a)=> setAnswer(a.target.value)}
                                            >
                                        </input>
                                        <button type="submit" className="btn-success btn" id="sendAnswer" onClick={(a) => answerQAMessage(a,message.answerId,message.questionId)}>Answer question</button>
                                    </form>
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
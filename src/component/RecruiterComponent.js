import React, {useState, useEffect} from "react";
import {Link, useParams} from 'react-router-dom'
import RecruiterService from "../service/RecruiterService";

const RecruiterComponent = () => {

    const [qaMessages, setQAMessages] = useState([])
    const [answer, setAnswer] = useState([]);
    const {organisationName} = useParams();

    const getAllReviewedQAMessages = () => {
        RecruiterService.getAllReviewedQAMessages(organisationName).then((response) => {
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
    const answerQAMessage = (a, q_id) => {
        a.preventDefault()

        const message = {answer}

        RecruiterService.updateQAMessageAnswer(q_id, message).then((response) => {
            getAllReviewedQAMessages()
        }).catch(error => {
            console.log(error);
        })
    }

    return (
        <div className="container chat-name">
            <div className="container text-center">
                <i>Du er logget ind som {organisationName} </i>
            </div>
            {
                qaMessages.map(
                    message =>
                        <div className="message-box recruiter-margin">
                            <div key={message.id}>
                                <div className="padding-recruiter col-10">{message.question}</div>
                                <div className="">
                                    <form>
                                        <div className="row">
                                            <div className="col-10">
                                                <input
                                                    type="text"
                                                    placeholder="Enter answer"
                                                    name="answer"
                                                    className="form-control"
                                                    onChange={(a) => setAnswer(a.target.value)}
                                                >
                                                </input>
                                            </div>
                                            <div className="col-2">
                                                <button type="submit" className="btn-success btn" id="sendAnswer"
                                                        onClick={(a) => answerQAMessage(a, message.questionId)}>Answer
                                                    question
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                )
            }
        </div>
    )
}
export default RecruiterComponent
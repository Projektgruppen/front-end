import React, {useState, useEffect} from "react";
import {Link, useParams} from 'react-router-dom'
import ModeratorService from "../service/ModeratorService";

const ModeratorComponent = () => {

    const [question, setQuestion] = useState([])
    const {organisationName} = useParams();

    //Fetches all unapproved questions.
    const getAllUnapprovedQuestions = () => {
        ModeratorService.getAllUnapprovedQuestions(organisationName).then((response) => {
            setQuestion(response.data)
        }).catch(error => {
            console.log(error);
        })
    }



    //Runs when page refreshes and each second afterwards.
    useEffect(() => {
        getAllUnapprovedQuestions();
        const interval = setInterval(() => {
            getAllUnapprovedQuestions();
        }, 1000);
        return () => clearInterval(interval);
    }, [])


    //Approves a question.
    const approveQuestion = (messageId) => {
        ModeratorService.approveQuestion(messageId).then(() => {
            getAllUnapprovedQuestions();
        }).catch(error => {
            console.log(error);
        })
    }

    //Sends a question to the recruiter for review.
    const reviewQuestion = (messageId) => {
        ModeratorService.reviewQuestion(messageId).then(() => {
        }).catch(error => {
            console.log(error);
        })
    }

    return (
        <div>
            <br/> <br/>
            <div className="container-xl">
                <div className="row">
                    <div>
                        <div>
                            <h2 className="text-center headline">{organisationName.toUpperCase()}</h2>
                            <div className="form-group mb-2">
                                {
                                    question.map(
                                        message =>
                                            <div key={message.id} className={`${message.markedForReview ? "link-change row message-box" : "row message-box"}`}>
                                                <div className="font-size col-md-10">
                                                    {message.question}
                                                </div>
                                                <div className="col-md-2">
                                                    <div className="row link-inline">
                                                        <div className="col-md-6">
                                                            <Link
                                                                className="btn btn-success btn-change"
                                                                onClick={() => approveQuestion(message.questionId)}
                                                                to={`/moderator/${organisationName}`}>Approve
                                                            </Link>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <Link
                                                                className="btn btn-primary btn-change"
                                                                onClick={() => reviewQuestion(message.questionId)}
                                                                to={`/moderator/${organisationName}`}>Review
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ModeratorComponent
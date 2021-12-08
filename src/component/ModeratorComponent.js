import React, {useState, useEffect} from "react";
import {Link, useParams} from 'react-router-dom'
import ModeratorService from "../service/ModeratorService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ModeratorComponent = () => {

    const [question, setQuestion] = useState([])
    const {organisationName} = useParams();

    {/*Fetches all unapproved questions.*/}
    const getAllUnapprovedQuestions = () => {
        ModeratorService.getAllUnapprovedQuestions(organisationName).then((response) => {
            setQuestion(response.data)
            if (response.data.length === 0) {
                document.getElementById("empty_string").innerHTML = "Vent venligst på indkommende spørgsmål"
                document.getElementById("empty_string").className = "loading center-loading"
            } else {
                document.getElementById("empty_string").innerHTML = ""
                document.getElementById("empty_string").className = ""
            }
        }).catch(error => {
            console.log(error);
        })
    }


    {/*Runs when page refreshes and each second afterwards.*/}
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
            <div className="container-xl text-center">
                <div className="row">
                    <div>
                        <div>
                            <h2 className="text-center headline">{organisationName.toUpperCase()}</h2>
                            <div>
                                <h2 className="loading center-loading" id="empty_string"></h2>
                            </div>
                            <div className="form-group mb-2">
                                {
                                    question.map(
                                        questionMap =>
                                            <div key={questionMap.id} className={`${questionMap.markedForReview ? "link-change row message-box" : "row message-box"}`}>
                                                <div className="font-size col-md-10">
                                                    {questionMap.question}
                                                </div>
                                                <div className="col-md-2">
                                                    <div className="row link-inline">
                                                        <div>
                                                            
                                                            <Link
                                                                className="btn btn-primary btn-change ourbutton"
                                                                onClick={() => reviewQuestion(questionMap.questionId)}
                                                                to={`/moderator/${organisationName}`}
                                                                >
                                                                <a><FontAwesomeIcon icon="user-check"/></a>
                                                            </Link>
                                                            
                                                            <Link
                                                                className="btn btn-success btn-change ourbutton"
                                                                onClick={() => approveQuestion(questionMap.questionId)}
                                                                to={`/moderator/${organisationName}`}>
                                                                <a><FontAwesomeIcon icon="check"/></a>
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
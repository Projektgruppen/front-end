import React, {useState, useEffect} from "react";
import {Link, useParams} from 'react-router-dom'
import RecruiterService from "../service/RecruiterService";

const RecruiterComponent = () => {

    const [question, setQuestion] = useState([])
    const [answer, setAnswer] = useState([]);
    const {organisationName} = useParams();
    let orgImage;


    const getAllReviewedQuestions = () => {
        RecruiterService.getAllReviewedQuestions(organisationName).then((response) => {
            setQuestion(response.data)
            if (response.data.length === 0) {
                document.getElementById("empty_string").innerHTML = "Vent venligst på indkommende spørgsmål"
                document.getElementById("empty_string").className = "loading center-loading"
            } else {
                document.getElementById("empty_string").innerHTML = ""
                document.getElementById("empty_string").className = ""
            }
            console.log(response.data)
        }).catch(error => {
            console.log(error)
        })
    }
    const loadOrgLogo = () => {

        switch (organisationName) {
            case "politiet":
                orgImage = "http://pingvinnyt.dk/wp-content/uploads/2019/07/POLITI-rigspoliet899.jpg"
                break;
            case "forsvaret":
                orgImage = "http://www.forsvaret.tv/images/forsvaret.png"
                break;
            default:
                orgImage = ""

        }
    }

    loadOrgLogo();


    useEffect(() => {
        getAllReviewedQuestions();
        const interval = setInterval(() => {
            getAllReviewedQuestions();
        }, 1000);
        return () => clearInterval(interval);
    }, [])


    const answerQuestion = (a, q_id) => {
        a.preventDefault()

        document.getElementById("answer-input").value = ""

        const answerObj = {answer}

        RecruiterService.answerQuestion(q_id, answerObj).then(() => {
            getAllReviewedQuestions()
        }).catch(error => {
            console.log(error);
        })
    }

    return (
        <div className="container chat-name">
            <div className="container text-center">
                <div>
                    <img id="img-org" className="image-resize float-right1" src={orgImage}></img>
                    <Link className="btn btn-outline-dark logs-button" to={`/${organisationName}/logs`}>LOGS</Link>
                </div>
                <div>
                    <h2 className="loading center-loading" id="empty_string"></h2>
                </div>
            </div>
            <div className="border-qa">
                {
                    question.map(
                        questionMap =>
                            <div className="message-box recruiter-margin">
                                <div key={questionMap.id}>
                                    <div className="padding-recruiter col-10">{questionMap.question}</div>
                                    <div className="">
                                        <form>
                                            <div className="row">
                                                <div className="col-10">
                                                    <input
                                                        id="answer-input"
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
                                                            onClick={(a) => answerQuestion(a, questionMap.questionId)}>Answer
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
        </div>
    )
}
export default RecruiterComponent
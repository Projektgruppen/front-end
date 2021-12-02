import React, {useState, useEffect} from "react";
import {useParams} from 'react-router-dom'
import RecruiterService from "../service/RecruiterService";

const RecruiterComponent = () => {

    const [question, setQuestion] = useState([])
    const [answer, setAnswer] = useState([]);
    const {organisationName} = useParams();


    const getAllReviewedQuestions = () => {
        RecruiterService.getAllReviewedQuestions(organisationName).then((response) => {
            setQuestion(response.data)
        }).catch(error => {
            console.log(error)
        })
    }


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
                <i>Du er logget ind som {organisationName} </i>
            </div>
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
    )
}
export default RecruiterComponent
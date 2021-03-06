import React, {useState, useEffect} from "react";
import {useHistory, useParams} from 'react-router-dom'
import StudentService from "../service/StudentService";

const StudentComponent = () => {

    const [question, setQuestion] = useState('');
    const [questions, setQuestions] = useState([])

    const {organisationName} = useParams();

    const history = useHistory();


    //Gets all the questions that are approved.
    const getAllApprovedQuestions = () => {
        StudentService.getAllApprovedQuestions(organisationName).then((response) => {
            setQuestions(response.data)
        }).catch(error => {
            console.log(error);
        })
    }

    //Fetches all questions once every second.
    useEffect(() => {
        getAllApprovedQuestions();
        const interval = setInterval(() => {
            getAllApprovedQuestions();
        }, 1000);
        return () => clearInterval(interval);
    }, [])


    //Student question cooldown function
    function coolDown() {
        let i = 10;
        document.getElementById("inputQuestion").readOnly = true;
        const button = document.querySelector('button');
        button.disabled = true;

        let startCoolDown = setInterval(function () {
            setQuestion("You can now write again in: " + i + " sec");
            i--;
            if (i < 0) {
                clearInterval(startCoolDown);
                document.getElementById("inputQuestion").readOnly = false;
                button.disabled = false;

                return setQuestion("")
            }
        }, 1000)
    }

    //Creates a new message
    const createQuestion = (q) => {
        q.preventDefault();
        const questionObj = {question};

        StudentService.createQuestion(organisationName, questionObj).then(() => {
            history.push(`/student/${organisationName}`);
            coolDown();
        }).catch(error => {
            console.log(error)
        })
    }


    return (
        <div className="disable-scroll">
            <div className="container text-center chat-name">
                <i>Du er i {organisationName}s chat</i>
                <br></br><br></br>
            </div>
            <div className="QAfeed">
                <div className="scroll-overflow">
                    {
                        questions.map(
                            questionMap =>
                                <div key={questionMap.id} className="QAMessage">
                                    <p className="question"><b>Q:  </b>{questionMap.question}
                                        <span className= "timestamp">{questionMap.timeOfApprovalForQuestion}</span>
                                    </p>
                                    <div className="linebreak"></div>
                                    <p id="answer" className={` question ${questionMap.answer ? " " : "hidden"}`}> <b> A:  </b> {questionMap.answer}
                                        <span className= "timestamp">{questionMap.timeOfCreationForAnswer}</span>
                                    </p>
                                </div>
                        )
                    }
                </div>
            </div>
            <div className="questionButton">
                <div>
                    <form>
                        <div>
                            <input
                                className="input-group our-input from-control"
                                id="inputQuestion"
                                type="textarea"
                                placeholder="Skriv sp??rgsm??l"
                                name="question"
                                value={question}
                                onChange={(q) => setQuestion(q.target.value)}
                                maxLength="255"
                            >
                            </input><br></br>
                            <button type="submit" className="btn-success btn" id="sendQuestion" onClick={(q) => createQuestion(q)}>Stil sp??rgsm??l</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default StudentComponent
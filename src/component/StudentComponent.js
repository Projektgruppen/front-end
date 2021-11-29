import React, {useState, useEffect} from "react";
import {Link, useHistory, useParams} from 'react-router-dom'
import StudentService from "../service/StudentService";

const StudentComponent = () => {

    const [question, setQuestion] = useState('');
    const [messages, setMessages] = useState([])
    const {organisationName} = useParams();

    const history = useHistory();

    const getAllApprovedQAMessages = () => {
        StudentService.getAllApprovedQuestions(organisationName).then((response) => {
            setMessages(response.data)
        }).catch(error => {
            console.log(error);
        })
    }

    //Fetches all messages once every second.
    useEffect(() => {
        getAllApprovedQAMessages();
        const interval = setInterval(() => {
            getAllApprovedQAMessages();
        }, 1000);
        return () => clearInterval(interval);
    }, [])


    //Student question cooldown function
    function countDown() {
        let i = 10;
        document.getElementById("inputQuestion").readOnly = true;
        const button = document.querySelector('button');
        button.disabled = true;

        let coolDown = setInterval(function () {
            setQuestion("You can now write again in: " + i + " sec");
            i--;
            if (i < 0) {
                clearInterval(coolDown);
                document.getElementById("inputQuestion").readOnly = false;
                button.disabled = false;

                return setQuestion("")
            }
        }, 1000)
    }

    //Creates a new message
    const createQAMessage = (q) => {
        q.preventDefault();
        const message = {question};


        StudentService.createQAMessage(organisationName, message).then((response) => {
            console.log(response.data)
            history.push(`/student/${organisationName}`);
            countDown();
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
                        messages.map(
                            message =>
                                <div key={message.id} className="QAMessage">
                                    <p className="question"><b>Q:  </b>{message.question}</p>
                                    <div className="linebreak"></div>
                                    <p id="answer" className={` question ${message.answer ? " " : "hidden"}`}> <b> A:  </b> {message.answer}</p>
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
                                placeholder="Enter question"
                                name="question"
                                value={question}
                                onChange={(q) => setQuestion(q.target.value)}
                                maxLength="255"
                            >
                            </input><br></br>
                            <button type="submit" className="btn-success btn" id="sendQuestion" onClick={(q) => createQAMessage(q)}>Ask Question</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default StudentComponent
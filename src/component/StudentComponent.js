import React, {useState, useEffect} from "react";
import {useHistory} from 'react-router-dom'
import StudentService from "../service/StudentService";

const StudentComponent = () => {

    const [question, setQuestion] = useState('');
    const [messages, setMessages] = useState([])


    const history = useHistory();

    const getAllApprovedQAMessages = () => {
        StudentService.getAllApprovedQAMessages().then((response) => {
            setMessages(response.data)
            console.log(response.data);
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
            i --;
            if(i < 0){
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

        StudentService.createQAMessage(message).then((response) =>{
            console.log(response.data)
            history.push('/students');
            countDown();
        }).catch(error =>{
            console.log(error)
        })
    }


    return (
        <div>
            <div className="container py-5">
                <div className="d-flex justify-content-center">
                    <div className="col-md col-lg-8 col-xl-6">
                        <div className="d-flex flex-row justify-content-start">
                            <table>
                                <thead>
                                    <th> Question</th>
                                    <th className="float-end"> Answer</th>
                                </thead>
                                <tbody>
                                {
                                    messages.map(
                                        message =>
                                            <tr key = {message.id}>
                                                <td className="small p-2 ms-3 mb-1 rounded-3">{message.question}</td>
                                                <td className="small p-2 ms-3 mb-1 rounded-3">{message.answer}</td>
                                            </tr>
                                    )
                                }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        <div>
                <br/> <br/>
                <div className="container py-5">
                    <div className="row d-flex justify-content-center">
                        <div className="col-md col-lg-8 col-xl-6">
                                <form>
                                    <div className= "form-group mb-2">
                                        <input
                                            onKeyPress=""
                                            id="inputQuestion"
                                            type="text"
                                            placeholder="Enter question"
                                            name="question"
                                            className="form-control"
                                            value={question}
                                            onChange={(q) => setQuestion(q.target.value)}
                                        >
                                        </input><br></br>
                                        <button type="submit" id="sendQuestion" className="btn btn-light btn-lg btn-rounded float-end hover-shadow click"  onClick={(q) => createQAMessage(q)}>Ask Question</button>
                                    </div>
                                </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StudentComponent
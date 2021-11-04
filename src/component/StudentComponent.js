import React, {useState, useEffect} from "react";
import {Link, useHistory, useParams} from 'react-router-dom'
import QAMessageService from "../service/QAMessageTestService";
import StudentService from "../service/StudentService";

const StudentComponent = () => {

    const [question, setQuestion] = useState('');
    const [messages, setMessages] = useState([])


    const history = useHistory();
    const {id} = useParams();

    //Fetches all messages when page loads.
    useEffect(() => {
        StudentService.getAllApprovedMessages().then((response) =>{
            setMessages(response.data)
            console.log(response.data);
        }).catch(error => {
            console.log(error);
        })
    }, [])

    //Fetches all messages once every second.
    useEffect(() => {
        const interval = setInterval(() => {
            StudentService.getAllApprovedMessages().then((response) =>{
                setMessages(response.data)
                console.log(response.data);
            }).catch(error => {
                console.log(error);
            })
        }, 1000);
        return () => clearInterval(interval);
    }, [])

    //Creates a new message
    const createMessage = (q) => {
        q.preventDefault();

        const message = {question};

        StudentService.createQuestion(message).then((response) =>{
            console.log(response.data)
            history.push('/students');
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
                                            type="text"
                                            id="sendQ"
                                            placeholder="Enter question"
                                            name="question"
                                            className="form-control"
                                            value={question}
                                            onChange={(q) => setQuestion(q.target.value)}
                                        >
                                        </input><br></br>
                                        <button className="btn btn-light btn-lg btn-rounded float-end hover-shadow click"  onClick={(q) => createMessage(q)}>Ask Question</button>
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
import React, {useState, useEffect} from "react";
import {Link} from 'react-router-dom'
import ModeratorService from "../service/ModeratorService";

const ModeratorComponent = () => {

    const [qaMessages, setQAMessages] = useState([])

    //sets shown messages to be all the unapproved questions
    const getAllUnapprovedQAMessages = () =>{
        ModeratorService.getAllUnapprovedQAMessages().then((response) =>{
            setQAMessages(response.data)
        }).catch(error => {
            console.log(error);
        })
    }

    //runs when page refreshes but afterwards every second
    useEffect(() => {
        getAllUnapprovedQAMessages();
        const interval = setInterval(() => {
            getAllUnapprovedQAMessages();
        }, 1000);
        return () => clearInterval(interval);
    }, [])


    //sets the approve value of a question to true
    const approveQAMessage = (messageId) => {
        ModeratorService.approveQAMessage(messageId).then((response) =>{
        getAllUnapprovedQAMessages();
        }).catch(error =>{
            console.log(error);
        })
    }

    //sets the review value of a question to true
    const reviewQAMessage = (messageId) => {
        ModeratorService.reviewQAMessage(messageId).then((response) =>{
        getAllUnapprovedQAMessages();
        }).catch(error =>{
            console.log(error);
        })
    }
    

    return (
        <div>
            <br/> <br/>
            <div className="container">
            <h2 className = "text-center">Moderator view</h2>
                <div className="row">
                    <div className="card col-md-6 offset-md-3 offset-md-3">
                        <div className="card-body">
                            <form>
                                <div className= "form-group mb-2">
                                    <table className="table table-bordered table-striped">
                                        <thead>
                                            <th> Question</th>
                                            <th> Status </th>
                                        </thead>
                                        <tbody>
                                        {
                                            qaMessages.map(
                                                message =>
                                                    <tr key = {message.id}>
                                                        <td>{message.question}</td>
                                                        <td>
                                                            
                                                        <Link  className={`btn btn-success ${message.approve ? "approved" : ""}`} onClick={() => approveQAMessage(message.id)} to="/moderators/" >Approve</Link>
                                            
                                                        
                                                        <Link className={`btn btn-primary ${message.review ? "reviewed" : ""}`} onClick={() => reviewQAMessage(message.id)} to="/moderators/" >Review</Link>
                                                        </td>
                                                    </tr>
                                            )
                                        }
                                        </tbody>
                                    </table>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ModeratorComponent
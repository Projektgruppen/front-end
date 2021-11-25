import React, {useState, useEffect} from "react";
import {Link, useParams} from 'react-router-dom'
import ModeratorService from "../service/ModeratorService";

const ModeratorComponent = () => {

    const [qaMessages, setQAMessages] = useState([])
    const {organisationName} = useParams();

    //sets shown messages to be all the unapproved questions
    const getAllUnapprovedQAMessages = () =>{
        ModeratorService.getAllUnapprovedQAMessages(organisationName).then((response) =>{
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
        console.log(messageId)
        ModeratorService.approveQAMessage(messageId).then((response) =>{
        getAllUnapprovedQAMessages();
        }).catch(error =>{
            console.log(error);
        })
    }

    //sets the review value of a question to true
    const reviewQAMessage = (messageId) => {
        console.log(messageId)
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
                <div className="row">
                    <div className="card col-md-6 offset-md-3 offset-md-3">
                        <div className="card-body">
                            <h2 className="text-center">{organisationName.toUpperCase()}</h2>
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
                                                            
                                                        <Link  className={`btn btn-success ${message.approve ? "approved" : ""}`} onClick={() => approveQAMessage(message.questionId)} to={`/moderator/${organisationName}`} >Approve</Link>
                                            
                                                        
                                                        <Link className={`btn btn-primary ${message.review ? "reviewed" : ""}`} onClick={() => reviewQAMessage(message.questionId)} to= {`/moderator/${organisationName}`}>Review</Link>
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
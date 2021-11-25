import React, {useState, useEffect} from "react";
import {Link, useParams} from 'react-router-dom'
import ModeratorService from "../service/ModeratorService";

const ModeratorComponent = () => {

    const [qaMessages, setQAMessages] = useState([])
    const {organisationName} = useParams();

    //sets shown messages to be all the unapproved questions
    const getAllUnapprovedQAMessages = () => {
        ModeratorService.getAllUnapprovedQAMessages(organisationName).then((response) => {
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
        ModeratorService.approveQAMessage(messageId).then((response) => {
            getAllUnapprovedQAMessages();
        }).catch(error => {
            console.log(error);
        })
    }

    //sets the review value of a question to true
    const reviewQAMessage = (messageId) => {
        document.getElementById("link").className = "link-change";
        ModeratorService.reviewQAMessage(messageId).then((response) => {
            getAllUnapprovedQAMessages();
        }).catch(error => {
            console.log(error);
        })
    }


    return (
        <div>
            <br/> <br/>
            <div className="container-xl">
                <div className="row">
                    <div className="">
                        <div className="">
                            <h2 className="text-center headline">{organisationName.toUpperCase()}</h2>
                            <div className="form-group mb-2">
                                {
                                    qaMessages.map(
                                        message =>
                                            <div key={message.id} id="link" className="row message-box">
                                                <div className="font-size col-md-10">
                                                    {message.question}
                                                </div>
                                                <div className="col-md-2">
                                                    <div className="row link-inline">
                                                        <div className="col-md-6">
                                                            <Link
                                                                className={`btn btn-success btn-change  ${message.approve ? "approved" : ""}`}
                                                                onClick={() => approveQAMessage(message.questionId)}
                                                                to={`/moderator/${organisationName}`}>Approve
                                                            </Link>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <Link
                                                                className={`btn btn-primary btn-change ${message.review ? "link-change" : ""}`}
                                                                onClick={() => reviewQAMessage(message.questionId)}
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
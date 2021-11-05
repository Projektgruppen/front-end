import React, {useState, useEffect} from "react";
import {Link, useHistory, useParams} from 'react-router-dom'
import QAMessageService from "../../service/QAMessageTestService";

const AddQAMessageComponent = () => {

    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [approve, setApprove] = useState('');

    const history = useHistory();
    const {id} = useParams();


    const saveOrUpdateMessage = (e) => {
        e.preventDefault();

        const message = {question, answer, approve};

        if(id){
            QAMessageService.updateMessages(id,message).then((response) =>{
                history.push('/recruiters')
            }).catch(error =>{
                console.log(error);
            })
        }else{
            QAMessageService.createMessages(message).then((response) =>{

                console.log(response.data)

                history.push('/');

            }).catch(error =>{
                console.log(error)
            } )
        }

    }

    useEffect(() => {

        QAMessageService.getMessagesById(id).then((response) => {
            setQuestion(response.data.question)
            setAnswer(response.data.answer)
            setApprove(response.data.approve)
        }).catch(error => {
            console.log(error)
        })
    }, []);
    const title = () => {
        if(id){
            return <h2 className="text-center"> Update Message</h2>
        }else{
            return <h2 className="text-center"> Add Message</h2>
        }
    }
    return (
        <div>
            <br/> <br/>
            <div className="container">
                <div className="row">
                    <div className="card col-md-6 offset-md-3 offset-md-3">
                        {
                            title()
                        }
                        <div className="card-body">
                            <form>
                                <div className= "form-group mb-2">
                                    <label className="form-label"> Answer</label>
                                    <input
                                        type="text"
                                        placeholder="Enter answer"
                                        name="answer"
                                        className="form-control"
                                        value={answer}
                                        onChange = {(e) => setAnswer(e.target.value)}
                                    >
                                    </input>
                                </div>
                                <button className="btn btn-success" onClick={(e) => saveOrUpdateMessage(e)}>Submit</button>
                                <Link to = "/" className="btn btn-danger"> Cancel</Link>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default AddQAMessageComponent
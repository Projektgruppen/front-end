import React, { useState, useEffect } from "react";
import { Navbar } from "react-bootstrap";
import { Nav } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { Card } from "react-bootstrap";
import ModeratorService from "../service/ModeratorService";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const ModeratorHomeComponent = () => {
    const [organisations, setOrganisation] = useState([])


    {/*Fetches all organisations*/ }
    const getAllOrganisations = () => {
        ModeratorService.getAllOrganisations().then((response) => {
            setOrganisation(response.data)
        }).catch(error => {
            console.log(error);
        })
    }

    {/*Runs when page refreshes and each second afterwards.*/ }
    useEffect(() => {
        getAllOrganisations();
        const interval = setInterval(() => {
            getAllOrganisations();
        }, 1000);
        return () => clearInterval(interval);
    }, [])

    //new session
    const newSession = (organisationName) => {
        ModeratorService.newOrganisationSession(organisationName).then(() => {
            getAllOrganisations();
        }).catch(error => {
            console.log(error);
        })
    }

    //new session for all
    const newSessionForAll = () => {
        ModeratorService.newOrganisationSessionForAll().then(() => {
            getAllOrganisations();
        }).catch(error => {
            console.log(error);
        })
    }

    return (
        <div>
            <header>
                <Navbar bg="primary" variant="dark">
                    <Container>
                        <Navbar.Brand href="/home/moderator/">Home</Navbar.Brand>
                        <Nav className="me-auto">
                            <Nav.Link href="/new/organisation/moderator/">Create organisation</Nav.Link>
                        </Nav>
                    </Container>
                </Navbar>
            </header>
            <div className="container col">
                <div className="d-flex justify-content-center mt-1">
                    <p>Settings</p>
                </div>
                <div className="d-flex justify-content-center">
                    <Link
                        className="btn btn-success btn-change p-2"
                        onClick={() => newSessionForAll()}
                        to={"/home/moderator"}>
                        <a>New session for all</a>
                    </Link>
                </div>
                <hr/>

            </div>
            <div className="container col">

                <div className="d-flex justify-content-center mt-3">
                    <h2>Organisations</h2>
                </div>
                <div className="row">
                    {organisations.map(
                        organisationMap =>
                            <div class="col-sm-3 mt-3" key={organisationMap.id}>
                                <Card>
                                    <Card.Img variant="top" />
                                    <Card.Body>
                                        <Card.Title><p className="text-capitalize text-center">{organisationMap.name}</p></Card.Title>
                                        <div className="d-flex justify-content-center">
                                            <Card.Text>
                                                <p>Current session id: {organisationMap.currentSession}</p>
                                            </Card.Text>
                                        </div>
                                        <div className="d-flex justify-content-center mb-1">
                                            <Link
                                            className="btn btn-success btn-change p-2"
                                            onClick={() => newSession(organisationMap.name)}
                                            to={"/home/moderator"}>
                                            <a>New Session</a>
                                        </Link>
                                        </div>
                                        

                                        <div className="d-flex justify-content-center">
                                            <a className="btn btn-primary" href={`/moderator/${organisationMap.name}`}>Moderator</a>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </div>
                    )}
                </div>
                <hr />
            </div>
        </div>
    )
}
export default ModeratorHomeComponent
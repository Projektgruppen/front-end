import React, { useState, useEffect } from "react";
import { Navbar } from "react-bootstrap";
import { Nav } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { Card } from "react-bootstrap";
import { Button } from "react-bootstrap";
import ModeratorService from "../service/ModeratorService";
import {withRouter} from 'react-router-dom';
import { Link } from "react-router-dom";


const ModeratorHomeComponent = () => {

    const [orginisation, setOrganisation] = useState([])

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

    

    return (
        <div>
            <header>
                <Navbar bg="primary" variant="dark">
                    <Container>
                        <Navbar.Brand href=" ">Moderator</Navbar.Brand>
                        <Nav className="me-auto">
                            {/*<Nav.Link href="#home">Home</Nav.Link>*/}
                        </Nav>
                    </Container>
                </Navbar>
            </header>
            <div className="container">
                <div className="row">
                    {orginisation.map(
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
                                        <div className="d-flex justify-content-center">
                                            <a className="btn btn-primary" href={ `/moderator/${organisationMap.name}` }>Moderator</a>
                                        </div>

                                    </Card.Body>
                                </Card>
                            </div>
                    )}
                </div>


            </div>

        </div>
    )
}
export default ModeratorHomeComponent
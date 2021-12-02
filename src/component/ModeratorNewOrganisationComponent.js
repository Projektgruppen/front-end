import React, { useState, useEffect } from "react";
import { Navbar } from "react-bootstrap";
import { Nav } from "react-bootstrap";
import { Container } from "react-bootstrap";
import ModeratorService from "../service/ModeratorService";

const ModeratorNewOrganisationComponent = () => {
    const [name, setOrganisation] = useState('');

    
    //Creates a new message
    const createOrganisation = (o) => {
        o.preventDefault();
        const organisationObj = {name};

        ModeratorService.createOrganisation(organisationObj).then((response) => {
            
        }).catch(error => {
            console.log(error)
        })
    }

    return (
        <div>
            <header>
                <Navbar bg="primary" variant="dark">
                    <Container>
                        <Navbar.Brand href="/home/moderator/">Home</Navbar.Brand>
                        <Nav className="me-auto">
                            
                        </Nav>
                    </Container>
                </Navbar>
            </header>
            <div className="container">
                <div className="d-flex justify-content-center mt-3">
                    <h2>New Organisation</h2>
                </div>
                <div className="d-flex justify-content-center mt-3">
                    <form>
                        <div>
                            <p>You can create new organisations here</p>
                            <input
                                className="input-group our-input from-control"
                                id="inputOrganisation"
                                type="textarea"
                                placeholder="Organisation Name"
                                
                                value={name}
                                onChange={(o) => setOrganisation(o.target.value)}
                                maxLength="255"
                            >
                            </input>
                            <br/>
                            <div className="d-flex justify-content-center">
                            <button type="submit" className="btn-success btn" id="inputOrganisation" onClick={(o) => createOrganisation(o)}>Create</button>
                            </div>
                            
                        </div>
                    </form>
                </div>
                <hr />
            </div>
        </div>
    )
}
export default ModeratorNewOrganisationComponent
import React from "react";
import { Navbar ,Nav} from "react-bootstrap";
import {Container} from "react-bootstrap";
import { Form } from "react-bootstrap";


function Header({ params, onParamChange }) {
  return (
    <Navbar bg="primary" data-bs-theme="dark" collapseOnSelect expand="lg" className="mb-2 bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">TargetJobs</Navbar.Brand>
        <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Title,Skill or Company"
              className="mr-2"
              aria-label="Search"
              size="sm"
              onChange={onParamChange} 
              value={params.keyword} 
              name="keyword"
            />
             <Form.Control
              type="search"
              placeholder="City,state or Country"
              className="mr-10"
              aria-label="Location"
              onChange={onParamChange} 
              value={params.location} 
              name="location"
              size="sm"
            />
          </Form>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="">Home</Nav.Link>
            <Nav.Link href="">Jobs</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
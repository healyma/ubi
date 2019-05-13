import React, { Component } from "react";
import { ListGroup, ListGroupItem, Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import "./Home.css";

export default class ProjectsCard extends Component {
 render(){
     return(
        <Card >
        <Card.Img variant="top" src="holder.js/100px180" />
        <Card.Body>
          <Card.Title>My projects</Card.Title>
          <Card.Text>
            [ list projects I OWN and links to todos and gantt charts]
            [ stats about each project (% complete), time since last activity]
          </Card.Text>
          <Button variant="primary">Go somewhere</Button>
        </Card.Body>
      </Card>
     )
 }   
}
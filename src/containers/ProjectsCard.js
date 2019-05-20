import React, { Component } from "react";
import { Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
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
            [ list projects I'm involved in and links to todos and gantt charts]
            [project name | date created | Owner | All tasks | Available tasks (all/mine) | aging/health | <span className="oi oi-project"></span> | <span className="oi oi-list"></span> | <span className="oi oi-document"></span> ]
            
           
          </Card.Text><div className="d-flex justify-content-between">
          <LinkContainer
          key="projects"
          to="/projects"
        >
          <Button variant="primary">
            View All
          </Button>
        </LinkContainer>
        <LinkContainer
          key="newTodo"
          to="/projects/new"
        >
          <Button variant="primary">
            New Project
          </Button>
        </LinkContainer>
        <LinkContainer
          key="todos"
          to="/todos"
        >
          <Button variant="primary">
            View All
          </Button>
        </LinkContainer>
        </div>
        </Card.Body>
      </Card>
     )
 }   
}
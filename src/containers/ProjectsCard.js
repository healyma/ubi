import React, { Component } from "react";
import { Button, Col, Row } from "react-bootstrap";
import {API,Auth} from "aws-amplify"; 
import Card from "react-bootstrap/Card";
import { LinkContainer } from "react-router-bootstrap";
import "./Home.css";

export default class ProjectsCard extends Component {

  constructor(props){
    super(props);
    this.state={
      myProjects:[],
      user:""
    }
  }
  componentDidMount(){
    Auth.currentUserInfo().then((user)=>{
      API.get("todos","/project/user/"+user.attributes.email).then((projects)=>{
        this.setState({
          user:user,
          myProjects:projects
        })
      })
    })
    
  }
 render(){
     return(
        <Card >
        <Card.Img variant="top" src="holder.js/100px180" />
        <Card.Body>
          <Card.Title>My projects</Card.Title>
          <Row>
              <Col>Project Name</Col>
              <Col>Complete</Col>
              <Col>Open tasks (mine)</Col>
              <Col>Health</Col>
              <Col><span className="oi oi-project"></span> | <span className="oi oi-list"></span> | <span className="oi oi-document"></span></Col>
              </Row>
            {this.state.myProjects.map((project)=>(

              <LinkContainer
              key={"project" + project.PT_ID}
              to={"/projects/"+project.PT_ID}
            >
            <Row>
              <Col>{project.PT_Name}</Col>
              <Col>0%</Col>
              <Col>15(6)</Col>
              <Col> health</Col>
              <Col><span className="oi oi-project"></span> | <span className="oi oi-list"></span> | <span className="oi oi-document"></span></Col>
              </Row>
            </LinkContainer>
              )
            )}
            
            <div className="d-flex justify-content-between">
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
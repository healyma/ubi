import React, { Component } from "react";
import { Button } from "react-bootstrap";
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
    console.log("mounting")
    Auth.currentUserInfo().then((user)=>{
      console.log(user.attributes.email)
      API.get("todos","/project/user/"+user.attributes.email).then((projects)=>{
        console.log(projects)
        this.setState({
          user:user,
          myProjects:projects
        })
      })
    })
    
  }
 render(){
  console.log(this.state.myProjects)
     return(
        <Card >
        <Card.Img variant="top" src="holder.js/100px180" />
        <Card.Body>
          <Card.Title>My projects</Card.Title>
          <Card.Text>
            [ list projects I'm involved in and links to todos and gantt charts]
            {this.state.myProjects.map((project)=>(
              <h2>{project.PT_Name}</h2>
              )
            )}
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
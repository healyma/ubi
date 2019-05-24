import React, { Component } from "react";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import ProjectsCard from "./ProjectsCard";
import TasksCard from "./TasksCard";
import "./Home.css";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true
    };
  }



renderLander() {
  return (
    <div className="lander">
      <h1>UbiDoBi</h1>
      <p>Project management, simplified</p>
      <div>
        <Link to="/login" className="btn btn-info btn-lg">
          Login
        </Link>
        <Link to="/signup" className="btn btn-success btn-lg">
          Signup
        </Link>
      </div>
    </div>
  );
}

renderHome(){
  return (<div>
<Accordion defaultActiveKey="0">
<Card>
    <Accordion.Toggle as={Card.Header} eventKey="0">
      My Tasks
    </Accordion.Toggle>
    <Accordion.Collapse eventKey="0">
      <TasksCard></TasksCard>
    </Accordion.Collapse>
  </Card>
  <Card>
    <Accordion.Toggle as={Card.Header} eventKey="1">
      My Projects
    </Accordion.Toggle>
    <Accordion.Collapse eventKey="1">
      
    <ProjectsCard></ProjectsCard>
    </Accordion.Collapse>
  </Card>
 
</Accordion>

 
        </div>
        );
}

  render() {
    return (
      <div className="Home">
        {this.props.isAuthenticated ? this.renderHome() : this.renderLander()}
      </div>
    );
  }
}

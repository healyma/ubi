import React, { Component } from "react";
import { ListGroup, ListGroupItem, Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import ProjectsCard from "./ProjectsCard";
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

    <ProjectsCard></ProjectsCard>
<Card >
  <Card.Img variant="top" src="holder.js/100px180" />
  <Card.Body>
    <Card.Title>My Tasks</Card.Title>
    <Card.Text>
    [ Tasks assigned to me]
      [ Summary, complete, open/current and upcoming]
      [list open tasks  -> project->(sublists)->task]
      [button to start task, complete task]
    </Card.Text>
    <Button variant="primary">Go somewhere</Button>
  </Card.Body>
</Card>
  <ListGroup
  ><LinkContainer
            key="newNote"
            to="/notes"
          >
            <ListGroupItem>
              <h4>
                <b>{"\uFF0B"}</b> Notes
              </h4>
            </ListGroupItem>
          </LinkContainer>
          <LinkContainer
          key="newTodo"
          to="/todos"
        >
          <ListGroupItem>
            <h4>
              <b>{"\uFF0B"}</b> Todo Lists
            </h4>
          </ListGroupItem>
        </LinkContainer>
        </ListGroup>
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

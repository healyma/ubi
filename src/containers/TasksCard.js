import React, { Component } from "react";
import { ListGroup, ListGroupItem, Button } from "react-bootstrap";
import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import "./Home.css";

export default class TasksCard extends Component {
 render(){
     return(
      <Card >
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <Card.Title>My Tasks</Card.Title>
        <Card.Text>
        <ButtonToolbar>
    <ToggleButtonGroup type="radio" name="options" defaultValue={1}>
      <ToggleButton value={1}>My Overdue Tasks</ToggleButton>
      <ToggleButton value={2}>My Available Tasks</ToggleButton>
      <ToggleButton value={3}>My Incompete Tasks</ToggleButton>
      <ToggleButton value={4}>Everything</ToggleButton>
    </ToggleButtonGroup>
  </ButtonToolbar>
        [ Tasks assigned to me]
        [Projet -> List -> ... -> List -> tasks]
        [Pin open/next in project to home]
          [ Summary, complete, open/current and upcoming]
          [list open tasks  -> project->(sublists)->task]
          [button to start task, complete task]
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
     )
 }   
}
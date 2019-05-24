import React, { Component } from "react";
import {  Button,Row } from "react-bootstrap";
import {API, Auth } from "aws-amplify";
import Card from "react-bootstrap/Card";
import "./Home.css";

export default class TasksCard extends Component {
  constructor(props){
    super(props);
    this.state={
      tasks:[],
      user:{}
    }
  }
  componentDidMount(){
    Auth.currentUserInfo().then((user)=>{
      API.get("todos","/user_tasks/" + user.attributes.email).then((tasks)=>{

      this.setState({user, tasks});
      });
    });

  }
 render(){
     return(
      <Card >
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <Card.Title>My Tasks</Card.Title>
   
        [ Tasks assigned to me]
        [Projet -> List -> ... -> List -> tasks]
        [Pin open/next in project to home]
          [ Summary, complete, open/current and upcoming]
          [list open tasks  -> project->(sublists)->task]
          [button to start task, complete task]

{this.state.tasks.map((task)=>(
<Row key={task.LI_ID}> {task.LI_ItemType==="T" &&
         <div > <b><span style={
          task.LI_PercentComplete>=100
            ? { textDecoration: "line-through" }
            : {}
        }>{task.LI_Name}</span></b>
</div> 
}</Row>
)
)}
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
     )
 }   
}
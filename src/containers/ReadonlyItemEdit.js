import React, { Component } from "react";
import {  Row, Col} from "react-bootstrap";
import TodoItemEdit from "./TodoItemEdit";


export default class ReadonlyItemEdit extends Component {
  constructor(props) {
    super(props);
    this.state ={
      item:this.props.item
    }
    console.log(this.props);
  }
  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }
  
  handleNamechange(){

  }

  handleDelete(){
    this.props.delete(this.props.item.LI_LTID,this.props.item.LI_ItemID);
  }
  render(){
      return (
        <div className="Container">
        <Row>
          <Col xs={9}>
         
          </Col>
        </Row>
        <Row>
          <Col xs={9}></Col>

          <Col xs={3}>
   
          </Col>
        </Row>
        <Row>
            <Col md={4}>
                take ownwership or ask for update
                </Col>
    <Col md={8} style={{textAlign: "right"}}>
   
            </Col>

        </Row>
        <TodoItemEdit item={this.state.item} delete={this.props.delete} update={this.props.update}></TodoItemEdit>
      </div>     
      
      );
  }
}
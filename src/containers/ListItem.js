import React, { Component } from "react";
import styled  from "styled-components";
import TodoItemEdit from "./TodoItemEdit";
const Container = styled.div`
border: 1px solid lightgrey;
border-radius:2px;
padding:8px;
margin-bottom:8px;
background-color: white;
`;
const Box = styled.div`
border: 1px solid black;
border-radius:2px;
padding:0px;
margin-bottom:0px;
width:10px;
height:10px;
background-color: white;
`;
export default class todoItemItem extends Component {
  constructor(props) {
    super(props);
     this.state = {
      expand: false,
      todoItem: {}
    };
  }

  async componentDidMount() {
    this.setState({ todoItem: this.props.todoItem });
  }
  blurHandle = event => {};
  saveItem=  async() =>{
    this.props.item.TK_Complete = !this.props.item.TK_Complete;
    await this.props.update(this.props.item);
    await this.setState({ todoItem: this.props.item });
  }
  render() {
    return (    <Container>  <div style={{ border: "0px" }} className="[ form-group ]" >
    <div style={{ float: "left", width: "50px", border: "none" }} >
      <div
        
        onBlur={this.blurHandle}
        htmlFor="fancy-checkbox-default"
        className="[ btn btn-default ]"
        onClick={event => {
          this.saveItem();
        }}
      >
        {" "}
        {this.props.item.TK_Complete ? (
          
          <Box></Box>
        ) : (
          <span className="oi oi-check"></span>
        )}
      </div>
    </div>

    <div
      style={{
        float: "right",
        verticalAlign: "top",
        width: "40px",
        border: "none"
      }}
    >
      <div
        className="btn btn-default"
        onClick={event => {
          this.setState({expand:!this.state.expand});
        }}
      >
        {this.state.expand ? (
          <span
            className="oi oi-chevron-top"
            onClick={event => {
              event.preventDefault();
            }}
          />
        ) : (
          <span
            className="oi oi-chevron-bottom"
            onClick={event => {
              event.preventDefault();
            }}
          />
        )}
      </div>
    </div>
    <div style={{ border: "none" }}>
      <span
 
        onBlur={this.blurHandle}
      >
        <span
          style={
            this.props.item.TK_Complete
              ? { textDecoration: "line-through" }
              : {}
          }
          onClick={event => {
            this.saveItem();
          }}
        >
        {!this.state.expand && <span> {this.props.item.TK_Name} </span>}
        </span>
      </span>
    </div>
  </div>
  {this.state.expand && <TodoItemEdit item={this.props.item} delete={this.props.delete} update={this.props.update}/>}</Container>

      );
  }
}

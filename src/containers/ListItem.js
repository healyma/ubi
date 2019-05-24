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
export default class TodoItemItem extends Component {
  constructor(props) {
    super(props);
     this.state = {
      expand: false,
      item: {}
    };
  }

  async componentDidMount() {
    
  this.setState({ item: this.props.item });
  }
  blurHandle = event => {};
  saveItem=  async() =>{
    this.props.item.LI_PercentComplete = Math.abs(100-this.props.item.LI_PercentComplete);
    
    this.setState({ item: this.state.item },()=>{this.props.update(this.state.item)});
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
        {(this.props.item.LI_PercentComplete===100 ? (
          
          <span className="oi oi-task"></span>
        ) : 
          <Box></Box>   
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
            this.props.item.LI_PercentComplete>=100
              ? { textDecoration: "line-through" }
              : {}
          }
          onClick={event => {
            this.saveItem();
          }}
        >
        {!this.state.expand && <span> &nbsp;{this.state.item.LI_Name} </span>}
        </span>
      </span>
    </div>
  </div>
  {this.state.expand && <TodoItemEdit item={this.props.item} delete={this.props.delete} update={this.props.update}/>}</Container>

      );
  }
}

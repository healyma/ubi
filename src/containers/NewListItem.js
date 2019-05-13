import React, { Component } from "react";
import {      FormGroup,
    ListGroupItem } from "react-bootstrap";
    import Form from "react-bootstrap/Form";
    import { API, Auth } from "aws-amplify";



export default class NewTodoItem extends Component {

  constructor(props) {
    super(props);
    this.state = {
      todoItem: {
          todoItemId:null,
          itemName:null,
          complete:null
      }
    };
    this.todoItem = this.state.todoItem;
  }

  async componentDidMount() {
    this.email = (await Auth.currentUserInfo()).attributes.email;
  }
blurHandle = event => {
  console.log(this.state);
    if(this.itemInput.value.length>0){
        this.todoItem.itemName = this.itemInput.value;
        this.todoItem.complete=false;
        this.todoItem.TK_Assign_UserID=this.email;
        this.saveItem();
    }
}
async saveItem(){
    const newItem=   await API.post("todos","/list-contents",{
        body: {
          itemName: this.itemInput.value,
          listID: this.props.list,
          complete: false,
          LI_Order:this.props.nextOrder,
          TK_Assign_UserID: this.todoItem.TK_Assign_UserID,
          type:"T",

        }
    });
  this.itemInput.value="";
   this.props.itemAdded(newItem);
   
}
render(){
    return (<ListGroupItem key={1000000}>
        <FormGroup controlId="itemName">
        <div
              className="w-25"
              style={{
                float: "right",
                verticalAlign: "middle",
                align: "left",
                border: "none",
                paddingLeft:"10px"
              }}
            >
              
                  <span
                    className="oi oi-plus"
                    onClick={event => {
                      event.preventDefault();
                    }}
                  />
            </div>
        <div className="w-75">
          <Form.Control
          type="text"
            onChange={this.handleChange}
            value={this.state.itemName}
            onBlur={this.blurHandle}
            ref={ref => {
              this.itemInput = ref;
            }}
          />
          </div>
          
        </FormGroup>
      </ListGroupItem>
      );
}
}
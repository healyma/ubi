import React, { Component } from "react";
import {      FormGroup,ListGroupItem } from "react-bootstrap";
    import Form from "react-bootstrap/Form";
    import Button from "react-bootstrap/Button";
    import { API, Auth } from "aws-amplify";



export default class NewTodoItem extends Component {

  constructor(props) {
    super(props);
    this.state = {
      lastItem: props.lastItem,
      email:"",
      todoItem: {
          todoItemId:null,
          itemName:null,
          complete:null
      }
    };
    this.todoItem = this.state.todoItem;
  }

  async componentDidMount() {
    Auth.currentUserInfo().then((user)=>{
      this.setState({email:user.attributes.email})
    })
  }
blurHandle = event => {
    if(this.itemInput.value.length>0){
        this.todoItem.itemName = this.itemInput.value;
        this.todoItem.complete=false;
        this.todoItem.LI_Assign_UserID=this.state.email;
        console.log(this.todoItem)
        this.saveItem();
    }
}
async saveItem(){
  console.log(this.state.lastItem)
    API.post("todos","/list-contents",{
        body: {
          itemName: this.itemInput.value,
          listID: this.props.list,
          complete: 0,
          LI_Order:999,
          LI_Assign_UserID: this.state.email,
          type:"T",
          LI_DependsJSON:this.props.lastItem.LI_ID

        }
    }).then((newItem)=>{
  this.itemInput.value="";
   this.props.itemAdded(newItem);
   this.itemInput.focus();
  });
   
}
render(){
    return (<ListGroupItem key={1000000}>
        <FormGroup controlId="itemName">
        <Button
              className="w-25"
              variant="outline-dark"
              style={{
                float: "right",
                verticalAlign: "middle",
                align: "left",
                border: "1px",
                paddingLeft:"10px"
              }}>
              <span
                    className="oi oi-plus"
                    onClick={event => {
                      event.preventDefault();
                    }}
                  />
            </Button>
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
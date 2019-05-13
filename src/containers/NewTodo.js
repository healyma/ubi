import React, { Component } from "react";
import {
  FormGroup,
  FormControl,
  ListGroup
} from "react-bootstrap";
import { API } from "aws-amplify";
import LoaderButton from "../components/LoaderButton";
import "./NewTodo.css";
import TodoItem from "./ListItem";
import NewTodoItem from "./NewListItem";

export default class NewTodo extends Component {
  constructor(props) {
    super(props);
    this.listItems = [];
    this.state = {
      isLoading: null,
      LT_Name: "",
      listItemName: "",
      listItems: []
    };

    this.itemInput = React.createRef();
  }
  validateForm() {
    return true;
  }
  handleSubmit = async e => {
    e.preventDefault();
    this.setState({listItems:this.listItems});
    if (this.state.listItemName.length > 0) {
      this.addListItem();
    } else {

         this.setState({listItems: this.listItems}, async ()=>{

     try {
            console.log(this.state);
            await this.createList({
              LT_Name: this.state.LT_Name
            });
            this.props.history.push("/");
          } catch (e) {
            alert(e);
            this.setState({ isLoading: false });
          }
        
         });
 
    }

  };

createList(list) {
    return API.post("todos", "/todos", {
      body: list
    });
  }
  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  addItem() {}

  SaveList() {}

  blurHandle = event => {
    this.addListItem();
  };
  addListItem() {
    if (this.state.listItemName.length > 0) {
      this.listItems.push({
        itemName: this.state.listItemName,
        created: Date.now(),
        completed: false
      });
      this.setState({ listItemName: "" });
      this.itemInput.focus();
    }
  }
 newItem =item =>{
    this.listItems.push(item.todoItemId);
    this.setState({listItems:this.listItems});

 }
  render() {
    return (
      <div className="NewTodo">
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="LT_Name">
            <FormControl
              onChange={this.handleChange}
              value={this.state.listName}
              componentClass="input"
            />
          </FormGroup>
          <ListGroup>
            
            <NewTodoItem itemAdded={this.newItem}></NewTodoItem>
          </ListGroup>
          <LoaderButton
            block
            bsStyle="primary"
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
            isLoading={this.state.isLoading}
            text="Create"
            loadingText="Creating…"
          />
        </form>
      </div>
    );
  }
}

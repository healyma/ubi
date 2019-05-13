import React, { Component } from "react";
import {
  FormGroup,
  FormControl,
  ListGroup,
  ListGroupItem
} from "react-bootstrap";
import { API } from "aws-amplify";
import LoaderButton from "../components/LoaderButton";
import config from "../config";
import "./NewTodo.css";

export default class NewTodo extends Component {
  constructor(props) {
    super(props);
    this.listItems = [];
    this.state = {
      isLoading: null,
      listName: "",
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
    console.log(this.state.listItems);
    console.log("^ state | \\/ this.listItems");
    console.log(this.listItems);
    this.setState({listItems:this.listItems});
    console.log(this.state.listItems);
    if (this.state.listItemName.length > 0) {
      this.addListItem();
    } else {

         this.setState({listItems: this.listItems}, async ()=>{

     try {
            console.log(this.state);
            await this.createList({
              name: this.state.listName,
              listItems: this.listItems,
              complete: false
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
  renderItem(item,i){
      if(item.itemName){
        return (
            <ListGroupItem key={i} style={{borderBottom:"0px", padding: "0px"}}>
              <div
                style={{ border: "1px solid grey", border:"0px"}}
                className="[ form-group ]"
              >
                <div style={{float: "left", width: "50px", border: "none"}}>
                <label  onClick={event => {item.completed=!item.completed;  this.setState({listitems:this.listItems})}}
                      htmlFor="fancy-checkbox-default"
                      className="[ btn btn-default ]"
                    >
                    {(item.completed
                    ?
                      <span className="[ glyphicon glyphicon-ok ]"/>
                    :
                      <span className="[ glyphicon glyphicon-unchecked ]"/>
                    )}
                    </label>
                 
    
                </div>
                  <div className="[ btn-group ]">
                    
                  </div>
                  <div>
                   <span onClick={event => {item.completed=!item.completed;  this.setState({listitems:this.listItems})}}>
                      {item.itemName} -  {item.completed}</span>
                  </div>
              </div>
            </ListGroupItem>
        )
      }else{
          return "";
      }
      
  }
  render() {
    return (
      <div className="NewTodo">
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="listName">
            <FormControl
              onChange={this.handleChange}
              value={this.state.listName}
              componentClass="input"
            />
          </FormGroup>
          <ListGroup>
            {[{}].concat(this.listItems).map((item, i) =>
            this.renderItem(item,i)
              
            )}
            <ListGroupItem key={-1}>
              <FormGroup controlId="listItemName">
                <FormControl
                  onChange={this.handleChange}
                  value={this.state.listItemName}
                  onBlur={this.blurHandle}
                  inputRef={ref => {
                    this.itemInput = ref;
                  }}
                  componentClass="input"
                />
              </FormGroup>
            </ListGroupItem>
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

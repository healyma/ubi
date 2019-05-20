import React, { Component } from "react";
import { ListGroupItem } from "react-bootstrap";
import ReadonlyItemEdit from "./ReadonlyItemEdit";
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
    this.props.ListItem.LI_PercentComplete = !this.props.ListItem.LI_PercentComplete;
    await this.props.update(this.props.ListItem);
    await this.setState({ todoItem: this.props.ListItem });
  }
  render() {
    if (this.props.ListItem.LI_Name)
      return (
        <ListGroupItem
          key={this.props.ListItem.LI_ID}
          style={{ borderBottom: "0px", padding: "0px" }}
        >
          <div style={{ border: "0px" }} className="[ form-group ]" >
            <div style={{ float: "left", width: "50px", border: "none" }} >
              <span className="oi oi-lock-locked"></span>
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
              <span className="oi oi-person"></span>
              </div>
            </div>
            <div style={{ border: "none" }}>
              <span
         
                onBlur={this.blurHandle}
              >
                <span
                  style={
                    this.props.ListItem.LI_PercentComplete
                      ? { textDecoration: "line-through" }
                      : {}
                  }
                  onClick={event => {
                    this.saveItem();
                  }}
                >
                 <span>{this.props.ListItem.LI_Name}<br/> <i>assigned to: {this.props.ListItem.LI_AssignedToEmail }</i></span>
                    
                </span>
              </span>
            </div>
          </div>
          {this.state.expand && <ReadonlyItemEdit item={this.props.ListItem} delete={this.props.delete} update={this.props.update}/>}
        </ListGroupItem>
      );
    else return null;
  }
}

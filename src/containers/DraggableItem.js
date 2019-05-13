import React, { Component } from "react";
import { Auth } from "aws-amplify";
import { ListGroupItem } from "react-bootstrap";
import TodoItemEdit from "./TodoItemEdit";
import ListItem from "./ListItem";
import ReadonlyListItem from "./ReadonlyListItem";
import SubList from "./SubList";
import { Draggable } from 'react-beautiful-dnd';


export default class DraggableItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expand: false,
      todoItem: {}
    };
  }


  async componentDidMount() {
    this.setState({ todoItem: this.props.todoItem });
    const user = await Auth.currentUserInfo();
    await this.setState({ email: user.attributes.email });
  }
  blurHandle = event => { };
  saveItem = async () => {
    this.props.item.TK_Complete = !this.props.item.TK_Complete;
    await this.props.update(this.props.item);
    await this.setState({ todoItem: this.props.item });
  }
  render() {
    if (this.props.item.LI_ItemID) {
      return (
        <Draggable draggableId={"draggable-" + this.props.item.LI_ItemType + this.props.item.LI_ItemID} index={this.props.item.LI_Order} key={"draggable-" + this.props.item.LI_ItemType + this.props.item.LI_ItemID}>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              {this.props.item.LI_ItemType === "T" ?
                (
                  (this.props.item.TK_Assign_UserID === this.state.email ?
                    <ListItem key={"draggable-" + this.props.item.LI_ItemType+ this.props.item.LI_ItemID} item={this.props.item} delete={this.props.delete} update={this.props.update} ></ListItem>
                    :
                    <ReadonlyListItem key={"draggable-" + this.props.item.LI_ItemType+ this.props.item.LI_ItemID} ListItem={this.props.item} delete={this.props.delete} update={this.props.update}></ReadonlyListItem>
                  )
                )
                : (<SubList key={"draggable-"+ this.props.item.LI_ItemType + this.props.item.LI_ItemID} item={this.props.item}></SubList>)}


            </div>
          )}
        </Draggable>
      );
    } else {
      return (<span></span>)
    }

  }
  renderx() {
    if (this.props.item.TK_Name)
      return (
        <ListGroupItem
          key={this.props.item.TK_ID}
          style={{ borderBottom: "0px", padding: "0px" }}
        >
          <div style={{ border: "0px" }} className="[ form-group ]" >
            <div style={{ float: "left", width: "50px", border: "none" }} >
              <label

                onBlur={this.blurHandle}
                htmlFor="fancy-checkbox-default"
                className="[ btn btn-default ]"
                onClick={event => {
                  this.saveItem();
                }}
              >
                {" "}
                {this.props.item.TK_Complete ? (
                  <span className="[ glyphicon glyphicon-ok ]" />
                ) : (
                    <span className="[ glyphicon glyphicon-unchecked ]" />
                  )}
              </label>
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
                  this.setState({ expand: !this.state.expand });
                }}
              >
                {this.state.expand ? (
                  <span
                    className="glyphicon glyphicon-chevron-up"
                    onClick={event => {
                      event.preventDefault();
                    }}
                  />
                ) : (
                    <span
                      className="glyphicon glyphicon-chevron-down"
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
                  {!this.state.expand && this.props.item.TK_Name}
                </span>
              </span>
            </div>
          </div>
          {this.state.expand && <TodoItemEdit item={this.props.item} delete={this.props.delete} update={this.props.update} />}
        </ListGroupItem>
      );
    else return null;
  }
}

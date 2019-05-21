import React, { Component } from "react";
import { API,Auth } from "aws-amplify";
import { ListGroupItem } from "react-bootstrap";
import TodoItemEdit from "./TodoItemEdit";
import ListItem from "./ListItem";
import ReadonlyListItem from "./ReadonlyListItem";
import SubList from "./SubList";
import { Draggable } from 'react-beautiful-dnd';
import "./ListItem.css"

export default class DraggableItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dependencies:[],
      itemStatus:"notAvailable",
      expand: false,
      todoItem: {}
    };
  }


  async componentDidMount() {
    this.setState({ todoItem: this.props.todoItem });
    const item=this.props.item;
    if(item.LI_PercentComplete <100&& item.LI_DependsJSON){
      var itemStatus="open";
    API.get("todos","/dependency_status/" + item.LI_DependsJSON).then((deps)=>{
      var depArr=[];
      var blocked=false;
      var overdue=true;
      deps.forEach((dep)=>{
        if(dep.LI_PercentComplete<100){
          blocked=true;
        }else{
          //number off days it's been open
          if(Math.round((Date.now()-dep.LI_LastUpdate))/(24*60*60*1000)<=2){
            overdue=false;
          }
        }
        if(blocked){
          itemStatus="blocked";
        }else if(overdue){
          itemStatus="overdue";
        }
      })
      this.setState({itemStatus: itemStatus});
    
    })

    
  }else{
    if(item.LI_PercentComplete>=100){
      this.setState({itemStatus:"complete"});
    }else{
      this.setState({itemStatus:"open"});
    }
  }
    const user = await Auth.currentUserInfo();
    await this.setState({ email: user.attributes.email });
  }
  blurHandle = event => { };
  saveItem = async () => {
    this.props.item.LI_PercentComplete = !this.props.item.LI_PercentComplete;
    await this.props.update(this.props.item);
    await this.setState({ todoItem: this.props.item });
  }
  render() {
    if (this.props.item.LI_ID) {
      return (
        <Draggable draggableId={"draggable-" + this.props.item.LI_ItemID} index={this.props.item.LI_Order} key={"draggable-" + this.props.item.LI_ID}  >
          {(provided, snapshot) => (
            <div
            className={this.state.itemStatus}
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              {this.props.item.LI_ItemType === "T" ?
                (
                  (this.props.item.LI_AssignedToEmail === this.state.email ?
                    <ListItem key={"draggable-" + this.props.item.LI_ID} item={this.props.item} delete={this.props.delete} update={this.props.update}  className={this.state.itemStatus}></ListItem>
                    :
                    <ReadonlyListItem key={"draggable-" +  this.props.item.LI_ID} ListItem={this.props.item} delete={this.props.delete} update={this.props.update}></ReadonlyListItem>
                  )
                )
                : (<SubList key={"draggable-"+  this.props.item.LI_ID} item={this.props.item}></SubList>)}


            </div>
          )}
        </Draggable>
      );
    } else {
      return (<span></span>)
    }

  }
  renderx() {
    if (this.props.item.LI_Name)
      return (
        <ListGroupItem
          key={this.props.item.LI_ID}
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
                {this.props.item.LI_PercentComplete ? (
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
                    this.props.item.LI_PercentComplete
                      ? { textDecoration: "line-through" }
                      : {}
                  }
                  onClick={event => {
                    this.saveItem();
                  }}
                >
                  {!this.state.expand && this.props.item.LI_Name}
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

import React, { Component } from "react";
import { API,Auth } from "aws-amplify";
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


 componentDidMount() {
    this.setState({  });
    Auth.currentUserInfo().then((user=>{
      this.setState({ email: user.attributes.email,todoItem: this.props.todoItem });
    }));
    this.updateStatus();
  }
  updateStatus(){
    const item=this.props.item;
    if(item.LI_PercentComplete <100&& item.LI_DependsJSON){
      var itemStatus="open";
    API.get("todos","/dependency_status/" + item.LI_DependsJSON).then((deps)=>{
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
    
  }
  blurHandle = event => { };
  saveItem = async () => {
    this.props.item.LI_PercentComplete = !this.props.item.LI_PercentComplete;
    await this.update(this.props.item);
    await this.setState({ todoItem: this.props.item });
  }
  update=(item)=>{
    this.props.update(item);
    
    this.setState({item},()=>{this.updateStatus()});
  }
  render() {
    if (this.props.item.LI_ID) {
      return (
        <Draggable draggableId={"draggable-" + this.props.item.LI_ID} index={this.props.item.LI_Order} key={"draggable-" + this.props.item.LI_ID}  >
          {(provided, snapshot) => (
            <div
            className={(this.props.item.LI_ItemType==='T'?this.state.itemStatus:"subList")}
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              {this.props.item.LI_ItemType === "T" ?
                (
                  (this.props.item.LI_AssignedToEmail === this.state.email && this.state.itemStatus!=="blocked"?

                    <ListItem key={"draggable-" + this.props.item.LI_ID} itemStatus={this.state.itemStatus} item={this.props.item} delete={this.props.delete} update={this.update}  className={this.state.itemStatus}></ListItem>
                    :
                    <ReadonlyListItem key={"draggable-" +  this.props.item.LI_ID} itemStatus={this.state.itemStatus}  ListItem={this.props.item} delete={this.props.delete} update={this.update}></ReadonlyListItem>
                  )
                )
                : (<SubList key={"draggable-"+  this.props.item.LI_ID} item={this.props.item} className="subList"></SubList>)}


            </div>
          )}
        </Draggable>
      );
    } else {
      return (<span></span>)
    }

  }
  
}

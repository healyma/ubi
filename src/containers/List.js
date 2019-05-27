import React, { Component } from "react";
import { API, Auth } from "aws-amplify";
import { FormGroup, ListGroupItem } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { LinkContainer } from "react-router-bootstrap";
import Button from "react-bootstrap/Button";
import GanttChart from "./Gantt";
import config from "../config";
import "./Lists.css";
import ListItem from "./ListItem";
import { DragDropContext } from "react-beautiful-dnd";
import  DroppableList from "./DroppableList";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import NewListItem from "./NewListItem";
export default class List extends Component {
  lastItem={};
  constructor(props) {
    super(props);
this.newList = props.listItems;
    this.state = {
      listID: (props.match?props.match.params.id:props.id),
      nextOrder:0,
      hideComplete:false,
      email: "",
      listItems: [],
      childItems:[],
      List: {
        LI_Name: ""
      },
      lastItem:{}
    };
  }

  componentDidMount() {
    Auth.currentUserInfo().then((user)=>{
      this.setState({ 
        email: user.attributes.email
       },()=>{
        this.loadData();
    });
  });
}
  loadData(){
    if(this.state.listID>0){
    this.getList().then((list)=>{
      this.getListItems().then((items)=>{
        this.setState({nextOrder: (this.state.listItems[0]? this.state.listItems[0].nextOrder: 0),
        List:list,
      listItems:items,
      lastItem:items[items.length-1]
    },()=>{console.log(this.state.lastItem)});
      })
    });
  }
  }

  getList() {
    return API.get("todos", `/list/${this.state.listID}`);
  }
  getListItems() {
    return API.get("todos", `/list-contents/${this.state.listID}`);

  }

  validateForm() {
    return true;
  }

  formatFilename(str) {
    return str.replace(/^\w+-/, "");
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleFileChange = event => {
    this.file = event.target.files[0];
  }

   saveList(List) {
    this.setState({[List.LI_Name] : this.LI_Name.value});
    this.setState({ List: this.state.List });
    return API.put("todos", `/list/${this.state.listID}`, {
      body: { LI_ID: this.state.listID, LI_Name: this.LI_Name.value }
    });
  }

  handleSubmit =  event => {
    event.preventDefault();
this.setState({ isLoading: true, List: { listName: this.LI_Name.value } },()=>{
  this.saveList(this.state.List);
  this.props.history.push("/");
    })
  }
  ListLists() {
    return API.get("Lists", "/lists");
  }
  renderListsLists(Lists) {
    return [{}].concat(Lists).map(
      (aList, i) =>
        i !== 0
          ? <ListItem List={aList}></ListItem>
          : <LinkContainer
            key="new"
            to="/list"
          >
            <ListGroupItem>
              <h4>
                <b>{"\uFF0B"}</b> Create a new List list
              </h4>
            </ListGroupItem>
          </LinkContainer>
    );
  }


  deleteList() {
    return API.del("todos", `/list/${this.state.listID}`);
  }
  filterItems= (value)=>{
    return (this.state.hideComplete? value.LI_PercentComplete<100: true);
  }  
  handleDelete = async event => {
    event.preventDefault();

    const confirmed = window.confirm(
      "Are you sure you want to delete this  list?"
    );

    if (!confirmed) {
      return;
    }

    this.setState({ isDeleting: true });

    try {
      await this.deleteList();
      this.props.history.push("/");
    } catch (e) {
      alert(e);
      this.setState({ isDeleting: false });
    }
  }
  deleteItem = async (list, listItem) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this item?"
    );

    if (!confirmed) {
      return;
    }

    API.del("todos", `/list-contents/${list}/${listItem}`);
    return;
  }
  updateItem = (item) => {
    API.put('todos', `/list-contents/${item.LI_LTID}/${item.LI_ItemID}`, { body: item }, function (err, res) {
    });
  }
  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  newItem =  ()=> {
    this.loadData();
  }
  reorder(list, startIndex, endIndex) {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };


  blurHandle = event => {
    this.addListItem();
  };
  addListItem() {
    if (this.listItemName.value.length > 0) {
      this.state.List.listItems.push({
        itemName: this.listItemName.value,
        completed: false
      });

      this.saveList(this.state.List);
    }
  }


   render() {
     if(this.state.listItems.length>0){
     this.lastItem=this.state.listItems.slice(-1)[0];
     }
    return (
      <div className="NewList" >
      Hide Completed tasks <BootstrapSwitchButton
                            checked={this.state.hideComplete}
                            size="xs"
                            onlabel="Yes"
                            offlabel="No"
                            offstyle="outline-danger" 
                            onstyle="outline-success"
                            onChange= {()=>{
                                this.setState({
                                    hideComplete:!this.state.hideComplete
                                })
                                
                            }}
                            />
      {(this.props.match?<span><b>Project Name</b>[stick in project name]:</span>:<span></span>)}
      <Form onSubmit={this.handleSubmit}>
        <FormGroup >
        <Button className="w-25"
        style={{
          float: "right",
          verticalAlign: "middle",
          align: "left",
          border: "1px",
          paddingLeft:"10px"
        }}
          disabled={!this.validateForm()}
          type="submit"
        > <span className="oi oi-pencil"></span></Button>
        <div className="w-75">
          <Form.Control type="text" placeholder="New task"
            ref={input => this.LI_Name = input}
            onChange={this.handleChange}
            defaultValue={this.state.List.LI_Name}
            
          />
          </div>
          </FormGroup>
       </Form>

        <DragDropContext onDragEnd={ (result)=> {
    if(!result.destination){
      return;
    }
    if(result.destination.droppableId === result.source.droppableId && result.destination.index === result.source.index){
      return;
    }
    this.newList=this.state.listItems;
    var movedTask= this.newList[result.source.index-1];
    this.newList.splice(result.source.index-1, 1);
    this.newList.splice(result.destination.index,0,movedTask);
    //iterate through the list and update LI_Order
    for(var i=1;i<=this.newList.length;i++){
      if(this.newList[i-1]!==i){
        this.newList[i-1].LI_Order = i;
        this.updateItem(this.newList[i-1]);
      }
    }
    this.setState({
      listItems: this.newList
    });
    }}>


          <DroppableList delete={this.deleteItem} update={this.updateItem} hideComplete={this.state.hideComplete} listItems={this.state.listItems}></DroppableList>
        </DragDropContext>

        <NewListItem itemAdded={this.newItem} list={this.state.listID} nextOrder={this.state.nextOrder} lastItem={this.state.lastItem}></NewListItem>
        <GanttChart listid={this.state.listID}></GanttChart>
    </div>
        );
  }
}

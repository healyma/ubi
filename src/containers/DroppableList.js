import React, { Component } from "react";
import { API, Auth } from "aws-amplify";
import { ListGroupItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import config from "../config";
import DraggableItem from "./DraggableItem";
import "./Lists.css";
import ListItem from "./ListItem";
import {  Droppable } from "react-beautiful-dnd";

export default class DroppableList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listID: 0,
      loaded:false,
      email: "",
      listItems: [],
      List: {
        LT_Name: ""
      }
    };
  }
  componentWillReceiveProps(newProps){
    const user = Auth.currentUserInfo().then((user)=>{
      this.setState({ loaded:true,email: user.attributes.email, listItems: this.props.listItems });
    })
  }
  componentWillMount() {
  }

  
   loadData() {
    var listItems=this.state.listItems;
    listItems.forEach((item,index)=>{
      if(item.LI_Order != index+1){
        console.log(`index ${index+1} - order ${item.LI_Order}`)
        item.LI_Order=index+1;
        this.updateItem(item);
      }
    })
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

  async saveList(List) {
    this.state.List.LT_Name = this.LT_Name.value;
    await this.setState({ List: this.state.List });
    console.log({ LT_ID: this.state.listID, LT_Name: this.LT_Name.value });
    return API.put("todos", `/list/${this.state.listID}`, {
      body: { LT_ID: this.state.listID, LT_Name: this.LT_Name.value }
    });
  }

  handleSubmit = async event => {
    event.preventDefault();

    if (this.file && this.file.size > config.MAX_ATTACHMENT_SIZE) {
      alert(`Please pick a file smaller than ${config.MAX_ATTACHMENT_SIZE / 1000000} MB.`);
      return;
    }

    await this.setState({ isLoading: true, List: { listName: this.LT_Name.value } });

    try {

      await this.saveList(this.state.List);
      this.props.history.push("/");
    } catch (e) {
      alert(e);
      this.setState({ isLoading: false });
    }
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
    this.loadData();
    return;
  }
  updateItem = async (item) => {
    console.log(item);
    API.put('todos', `/list-contents/${item.LI_LTID}/${item.LI_ItemID}`, { body: item }, function (err, res) {
      console.log(res);
    });
  }
  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  newItem = async item => {
    this.loadData();

  }
  reorder(list, startIndex, endIndex) {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };


  SaveList() { }

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
    if(!this.state.loaded)return (<div>loading...</div>)
    this.loadData();
    
    return (
      <Droppable droppableId="droppable-1">
      {(provided, snapshot) => (
        <div
         ref={provided.innerRef}
          {...provided.droppableProps}
        >
          {[{}].concat(this.state.listItems).map((item) => 
         ( (item &&<DraggableItem delete={this.props.delete} update={this.props.update} item={item} key={item.LI_ID}></DraggableItem>)))}

          {provided.placeholder}
        </div>
      )}
    </Droppable>

        );
  }
}

import React, { Component } from "react";
import { API, Auth } from "aws-amplify";
import { ListGroupItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import config from "../config";
import DraggableItem from "./DraggableItem";
import "./Lists.css";
import ListItem from "./ListItem";
import { Draggable, Droppable } from "react-beautiful-dnd";

export default class DroppableList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listID: 0,
      email: "",
      listItems: [],
      List: {
        LT_Name: ""
      }
    };
  }

  async componentDidMount() {
    this.loadData();
    const user = await Auth.currentUserInfo();
    await this.setState({ email: user.attributes.email });


  }
  async loadData() {
    
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
    this.loadData();
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
  renderItem(item, i) {
    if (item.itemName) {
      return (
        <Draggable  delete={this.props.delete} update={this.props.update} draggableId={i} index={i} style={{ borderBottom: "0px", padding: "0px" }}>
          {(provided) => (
            <ListGroupItem
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              innerRef={provided.innerRef}
              style={{ border: "0px" }}
              className="[ form-group ]"
            >
              <div>
                <div style={{ float: "left", width: "50px", border: "none" }}>
                  <label onClick={event => { item.completed = !item.completed; this.setState({ listitems: this.List.listItems }) }}

                    onBlur={this.blurHandle}
                    htmlFor="fancy-checkbox-default"
                    className="[ btn btn-default ]"
                  >
                    {(item.completed
                      ?
                      <span className="[ glyphicon glyphicon-ok ]" />
                      :
                      <span className="[ glyphicon glyphicon-unchecked ]" />
                    )}
                  </label>


                </div>
                <div className="[ btn-group ]">

                </div>
                <div>
                  <span onClick={event => { item.completed = !item.completed; this.setState({ listitems: this.listItems }) }} >
                    {item.itemName} </span>
                </div>
              </div>
            </ListGroupItem>
          )}

        </Draggable>
      )
    } else {
      return "";
    }

  }

  render() {
    console.log(this.props.listItems)
    return (
      <Droppable droppableId="droppable-1">
      {(provided, snapshot) => (
        <div
         ref={provided.innerRef}
          {...provided.droppableProps}
        >
          {[{}].concat(this.props.listItems).map((item) => 
         ( (item &&<DraggableItem delete={this.props.delete} update={this.props.update} item={item} key={item.LI_ID}></DraggableItem>)))}

          {provided.placeholder}
        </div>
      )}
    </Droppable>

        );
  }
}

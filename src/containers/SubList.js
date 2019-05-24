import React, { Component } from "react";
import { API, Auth } from "aws-amplify";
import { FormGroup, ListGroupItem,Row, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Lists.css";
import ListItem from "./ListItem";
import ReadonlyListItem from './ReadonlyListItem';
import NewListItem from "./NewListItem";
export default class SubList extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      expand:false,
      user:{},
      listID:(props.list?props.list.LI_LTID:0),
      email:"",
      listItems:[],
      List: {
        LI_Name:""
      }
    };
  }
 
  componentDidMount() {
    Auth.currentUserInfo().then((usr)=>{
      var nextOrder= (this.state.listItems[0]? this.state.listItems[0].nextOrder: 0);
      this.setState(
        {
          user:usr, 
          email:usr.attributes.email,
          listID: this.props.item.LI_ID,
          nextOrder:nextOrder
        });
     
    });
    this.loadData();
  }
   loadData(){
    this.getList().then((list)=>{
      this.getListItems().then((listItems)=>{
        var lastItem=listItems[listItems.length-1]
        this.setState({
          List: list ,
          listItems: listItems 
        })  
      })
    })
        
  }

  getList() {
    return API.get("todos", `/list/${this.props.item.LI_ID}`);
  }
  getListItems(){
    return API.get("todos", `/list-contents/${this.props.item.LI_ID}`);

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
  this.state.List.LI_Name = this.LI_Name.value;
  await this.setState({List: this.state.List});
  return API.put("todos", `/list/${this.state.listID}`, {
    body: {LI_ID:this.state.listID,LI_Name:this.LI_Name.value}
  });
}

handleSubmit = async event => {
  event.preventDefault();

  this.setState({ isLoading: true, List:{listName:this.LI_Name.value}} );
  this.saveList(this.state.List).then(()=>{
    this.setState({ isLoading: false });
  })
}
ListLists(){
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
deleteItem= async (list,listItem) =>{
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
updateItem = async (item)=>{
  API.put('todos', `/list-contents/${item.LI_LTID}/${item.LI_ItemID}`,{body:item},function(err,res){
  });
  this.loadData();
}
handleChange = event => {
  this.setState({
    [event.target.id]: event.target.value
  });
};

newItem = async item =>{
  this.loadData();

}
blurHandle = event => {
  this.addListItem();
};
addListItem() {
  if(this.listItemName.value.length>0){
    this.state.List.listItems.push({
      itemName: this.listItemName.value,
      completed: false
    });
  
    this.saveList(this.state.List);
  }
}

render() {
  return (
    <div className="subListContainer"  key={this.props.item.LI_ID + "_____" }>
      <form onSubmit={this.handleSubmit}>
      <Row>
          <Col xs={1}><label
                
                htmlFor="fancy-checkbox-default"
                className="[ btn btn-default ]"
              
              >
                  <span className="[ oi oi-list ]" />
                
              </label></Col>
          
              <Col xs={10}>
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
          onClick={this.handleSubmit}
        > <span className="oi oi-pencil"></span></Button>
        <div className="w-75">
          <Form.Control type="text" placeholder="New task"
            ref={input => this.LI_Name = input}
            onChange={this.handleChange}
            defaultValue={this.state.List.LI_Name}
            
          />
          </div>
          </FormGroup>
       
          
            </Col>
            <Col xs={1}>
          <div
                className="btn btn-default"
                onClick={event => {
                  this.setState({expand:!this.state.expand});
                }}
              >
                {this.state.expand ? (
                  <span
                    className="oi oi-chevron-top"
                    onClick={event => {
                      event.preventDefault();
                    }}
                  />
                ) : (
                  <span
                    className="oi oi-chevron-bottom"
                    onClick={event => {
                      event.preventDefault();
                    }}
                  />
                )}
              </div>
              </Col>
            </Row>
            {this.state.expand && 
            <div>
       
          {[{}].concat(this.state.listItems).map((item,index) => 
         (item.LI_ItemType==='T' ?
         (item.LI_AssignedToEmail===this.state.email ?
           <ListItem item={item} delete={this.deleteItem} update={this.updateItem} key={this.props.item.LI_ItemID + "_____" + index}></ListItem>
           :
           <ReadonlyListItem ListItem={item} delete={this.deleteItem} update={this.updateItem} key={this.props.item.LI_ItemID + "_____" + index}></ReadonlyListItem>
           )
         :
         
         (item.LI_ItemType==='L' ? <SubList item={item}  key={this.props.item.LI_ID + "_____" + index}></SubList> : <div></div>)
         )
         )}
           <NewListItem itemAdded={this.newItem} list={this.state.listID} lastItem={this.state.lastItem} key={this.props.item.LI_ID + "_____new"} nextOrder={this.state.nextOrder}></NewListItem>
  
        </div>
            }
      </form>
    </div>
  );
}
}

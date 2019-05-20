import React, { Component } from "react";
import { API, Auth } from "aws-amplify";
import { FormGroup, FormControl, ListGroupItem,Row, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import LoaderButton from "../components/LoaderButton";
import config from "../config";
import "./Lists.css";
import ListItem from "./ListItem";
import ReadonlyListItem from './ReadonlyListItem';
import NewListItem from "./NewListItem";
export default class SubList extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      expand:false,
      listID:0,
      email:"",
      listItems:[],
      List: {
        LI_Name:""
      }
    };
  }
 
  async componentDidMount() {
    this.loadData();
    const user = await Auth.currentUserInfo();
    await this.setState({email: user.attributes.email});
    if(this.props.match){
     await this.setState({listID: this.props.item.LI_ItemID});
    }else if(this.props.item.LI_ItemID){
      await this.setState({listID:this.props.item.LI_ItemID});
    
    }

  }
  async loadData(){
       await  this.setState({
           List: await this.getList(),
           listItems: await this.getListItems()
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

  if (this.file && this.file.size > config.MAX_ATTACHMENT_SIZE) {
    alert(`Please pick a file smaller than ${config.MAX_ATTACHMENT_SIZE/1000000} MB.`);
    return;
  }
  
  await this.setState({ isLoading: true, List:{listName:this.LI_Name.value}} );

  try {

    await this.saveList(this.state.List);
    this.props.history.push("/");
  } catch (e) {
    alert(e);
    this.setState({ isLoading: false });
  }
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


SaveList() {}

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
renderItem(item,i){
    if(item.itemName){
      return (
          <ListGroupItem key={i} style={{borderBottom:"0px", padding: "0px"}}>
            <div
              style={{ border:"0px"}}
              className="[ form-group ]"
            >
              <div style={{float: "left", width: "50px", border: "none"}}>
              <label  onClick={event => {item.completed=!item.completed;  this.setState({listitems:this.List.listItems})}}

onBlur={this.blurHandle}
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
                 <span onClick={event => {item.completed=!item.completed;  this.setState({listitems:this.listItems})}} >
                    {item.itemName} </span>
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
    <div className="subList"  key={this.props.item.LI_ItemID + "_____" }>
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
            <FormControl
            ref={input => this.LI_Name = input}
              onChange={this.handleChange}
              defaultValue={this.state.List.LI_Name}
            />
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
         
         (item.LI_ItemType==='L' ? <SubList id={item.LI_ItemID}  key={this.props.item.LI_ItemID + "_____" + index}></SubList> : <div></div>)
         )
         )}
           <NewListItem itemAdded={this.newItem} list={this.state.listID} key={this.props.item.LI_ItemID + "_____new"}></NewListItem>
        
            
        <LoaderButton 
          block
          bsStyle="primary"
          bsSize="large"
          disabled={!this.validateForm()}
          type="submit"
          isLoading={this.state.isLoading}
          text="OK"
          loadingText="Saving..."
        />
        </div>
            }
      </form>
    </div>
  );
}
}

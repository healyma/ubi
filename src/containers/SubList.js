import React, { Component } from "react";
import { API, Auth } from "aws-amplify";
import { FormGroup, ListGroupItem,Row, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Lists.css";
import ListItem from "./ListItem";
import ReadonlyListItem from './ReadonlyListItem';
import {CircularProgressbar} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import TodoItemEdit from "./TodoItemEdit";
import NewListItem from "./NewListItem";
export default class SubList extends Component {
  constructor(props) {
    super(props);
    console.log(props)
    this.state = {
      expand:false,
      expandList:false,
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
      this.listItems(list.LI_ID).then((listItems,percentComplete,lastItem)=>{
        this.setState({
          List: list ,
          percentComplete:listItems.percentComplete,
          listItems: listItems.listItems ,
          lastItem:listItems.lastItem
        })  
      })
    })
        
  }

  getList() {
    return API.get("todos", `/list/${this.props.item.LI_ID}`);
  }
  getPercentComplete(){

  }
  getListItems(){
    return this.listItems(this.props.item.LI_ID).listItems;
}
  listItems(list){
    var percentComplete=0;
    return API.get("todos", `/list-contents/${list}`).then((_listItems)=>{
      for(var i=0;i<_listItems.length;i++){
        console.log(_listItems[i])
        if(_listItems[i].LI_ItemType==='L'){
          this.listItems(_listItems[i].LI_ID).then((__list)=>{
            percentComplete+= __list.listItems.percentComplete
          })
        }else{
          percentComplete+=_listItems[i].LI_PercentComplete;
        }
        
      }
      percentComplete=percentComplete/_listItems.length;
      return {listItems:_listItems,percentComplete, lastItem:_listItems[_listItems.lenght-1]};
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
  API.put('todos', `/list-contents/${item.LI_ID}`,{body:item},function(err,res){
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
  console.log(this.state)
  return (
    <div className="subListContainer"  key={this.props.item.LI_ID + "_____" }>
      <form onSubmit={this.handleSubmit}>
      <Row>
          <Col xs={2} onClick={event => {
                  this.setState({expandList:!this.state.expandList},()=>{
                    if(this.state.expandList)
                      this.setState({expand:false});
                  
                });
                }}><label
                
                htmlFor="fancy-checkbox-default"
                className="[ btn btn-default ]"
              
              >
                  <span className="oi oi-list" 
              ></span>
                
              </label>
                <CircularProgressbar
                 styles={{ // Customize the root svg element
                  root: {
                    width:'40px',
                    height:'40px',
                    padding:'0px',
                    margin:'0px'
                  },
                  // Customize the path, i.e. the "completed progress"
                  path: {
                    // Path color
                    strokeLinecap: 'butt',
                    // Customize transition animation
                    transition: 'stroke-dashoffset 0.5s ease 0s',
                    // Rotate the path
                    transform: 'rotate(0.25turn)',
                    transformOrigin: 'center center',
                  },
                  // Customize the circle behind the path, i.e. the "total progress"
                  trail: {
                    // Trail color
                    stroke: '#d6d6d6',
                    // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                    strokeLinecap: 'butt',
                    // Rotate the trail
                    transform: 'rotate(0.25turn)',
                    transformOrigin: 'center center',
                  },
                  // Customize the text
                  text: {
                    // Text color
                    fill: '#f88',
                    // Text size
                    fontSize: '16px',
                  },
                  // Customize background - only used when the `background` prop is true
                  background: {
                    fill: '#3e98c7',
                  },
                }}
                value={this.state.percentComplete} text={""+this.state.percentComplete  + "%"}/></Col>
              <Col xs={9}>
        <FormGroup >
          <div  className="w-25"  style={{
          float: "right",
          verticalAlign: "middle",
          align: "left",
          border: "1px",
          paddingLeft:"10px"
        }}>
        <Button style={{
          marginLeft:"5px",
          marginRight:"5px"
        }}
       
          disabled={!this.validateForm()}
          type="submit"
          onClick={this.handleSubmit}
        > <span className="oi oi-pencil"></span></Button>
        <LinkContainer
        key={this.state.listID}
        to={`/todos/${this.state.listID}`}
        >
        <Button style={{
          marginLeft:"5px",
          marginRight:"5px"
        }}
       
       disabled={!this.validateForm()}
     > <span className="oi oi-zoom-in"></span></Button>
     </LinkContainer>
        </div>
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
                  this.setState({expand:!this.state.expand},()=>{
                    if(this.state.expand)
                      this.setState({expandList:false});
                  
                })
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
            {this.state.expandList && 
            <div>
       
          {[{}].concat(this.state.listItems).map((item,index) => 
         (item.LI_ItemType==='T' ?
         (item.LI_AssignedToEmail===this.state.email ?
           <ListItem item={item} delete={this.deleteItem} update={this.updateItem} key={this.props.item.LI_ItemID + "_____" + index}></ListItem>
           :
           <ReadonlyListItem item={item} delete={this.deleteItem} update={this.updateItem} key={this.props.item.LI_ItemID + "_____" + index}></ReadonlyListItem>
           )
         :
         
         (item.LI_ItemType==='L' ? <SubList item={item}  key={this.props.item.LI_ID + "_____" + index}></SubList> : <div></div>)
         )
         )}
           <NewListItem itemAdded={this.newItem} list={this.state.listID} lastItem={this.state.lastItem} key={this.props.item.LI_ID + "_____new"} nextOrder={this.state.nextOrder}></NewListItem>
  
        </div>
            }
            {this.state.expand && 
            <div>
       <TodoItemEdit  item={this.state.List} delete={this.props.delete} update={this.props.update}></TodoItemEdit>
        </div>
            }
      </form>
    </div>
  );
}
}

import React, { Component } from "react";
import { API, Auth } from "aws-amplify";
import { FormGroup, FormControl, FormLabel, ListGroupItem, ListGroup,Form,Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import LoaderButton from "../components/LoaderButton";
import config from "../config";
import "./Lists.css";
export default class Todos extends Component {
  constructor(props) {
    super(props);
    this.email="";
    this.file = null;
    this.todos=[];
    this.state = {
      todo: null,
      name: "",
      items:[],
      people: null
    };
  }

  async componentDidMount() {
    this.email = (await Auth.currentUserInfo()).attributes.email;
    try {
      try {
        this.todos = await this.todoLists();
        this.setState({ todos:this.todos });
      } catch (e) {
        alert(e);
      }

      if(this.props.match.params.id){
        const todo = await this.getTodo();
        this.setState({
          todo
        });
      } 
      }catch (e) {
        alert("Here's the error : " + e);
      }
     
  }

  getTodo() {
    return API.get("todos", `/list/${this.props.match.params.id}`);
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

saveTodo(todo) {
  return API.put("todos", `/lists/${this.props.match.params.id}`, {
    body: todo
  });
}

handleSubmit = async event => {
  let attachment;

  event.preventDefault();

  if (this.file && this.file.size > config.MAX_ATTACHMENT_SIZE) {
    alert(`Please pick a file smaller than ${config.MAX_ATTACHMENT_SIZE/1000000} MB.`);
    return;
  }

  this.setState({ isLoading: true });

  try {

    await this.saveTodo({
      title: this.state.title,
      content: this.state.content,
      attachment: attachment || this.state.todo.attachment
    });
    this.props.history.push("/");
  } catch (e) {
    alert(e);
    this.setState({ isLoading: false });
  }
}
handleNewSubmit = async event => {
  event.preventDefault();
  this.setState({ isLoading: true });
  try{
    await API.post("todos", "/lists/" + this.email, {
      body: {
        LT_Name:this.itemInput.value
      }
    }).then(res=>{
      this.props.history.push("/todos/" + res);
    }).catch(error=>{});
    
} catch (e) {
  alert(e);
  this.setState({ isLoading: false });
}
}
todoLists(){
  return API.get("todos", "/lists/" + this.email);
}
renderTodosLists(todos) {
  return [{}].concat(todos).map(
    (aTodo, i) => 
      i !== 0
        ? <LinkContainer
            key={aTodo.LT_ID}
            to={`/todos/${aTodo.LI_ID}`}
          >
            <ListGroupItem>
            <div className="d-flex w-100 justify-content-between">
      <h5 className="mb-1">{ aTodo.LI_Name }</h5>
      <small>3 days ago</small>
    </div>
              {"Created: " + new Date(aTodo.LI_Created).toLocaleString()}
            </ListGroupItem>
          </LinkContainer>
        : 
            <ListGroupItem key="new_project">

                <Form  onSubmit={this.handleNewSubmit}>
  <Form.Group controlId="formBasic">
    <Form.Label>Create a new project</Form.Label>
    <Form.Control type="text" placeholder="Project Name" 
            onChange={this.handleChange}
            onBlur={this.blurHandle}
            ref={ref => {
              this.itemInput = ref;
            }}/>
    <Form.Text className="text-muted">
      You can add tasks after you click "Create"
    </Form.Text>
  </Form.Group>
  <Button variant="primary" type="submit">
    Create
  </Button>
  </Form>
            </ListGroupItem>
  );
}


deleteTodo() {
  return API.del("todos", `/list/${this.props.match.params.id}`);
}

handleDelete = async event => {
  event.preventDefault();

  const confirmed = window.confirm(
    "Are you sure you want to delete this todo list?"
  );

  if (!confirmed) {
    return;
  }

  this.setState({ isDeleting: true });

  try {
    await this.deleteTodo();
    this.props.history.push("/");
  } catch (e) {
    alert(e);
    this.setState({ isDeleting: false });
  }
}
renderTodos() {
  return (
    <div className="todos">

      <ListGroup>
        {!this.state.isLoading && this.renderTodosLists(this.todos)}
      </ListGroup>
    </div>
  );
}
render() {
  return (
    <div className="Todos">
    {this.renderTodos()}
      {this.state.todo &&
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="title">
            <FormControl
              onChange={this.handleChange}
              value={this.state.title}
              componentClass="input"
            />
          </FormGroup>
          <FormGroup controlId="content">
            <FormControl
              onChange={this.handleChange}
              value={this.state.content}
              componentClass="textarea"
            />
          </FormGroup>
          {this.state.todo.attachment &&
            <FormGroup>
              <FormLabel>Attachment</FormLabel>
              <FormControl.Static>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={this.state.attachmentURL}
                >
                  {this.formatFilename(this.state.todo.attachment)}
                </a>
              </FormControl.Static>
            </FormGroup>}
          <FormGroup controlId="file">
            {!this.state.todo.attachment &&
              <FormLabel>Attachment</FormLabel>}
            <FormControl onChange={this.handleFileChange} type="file" />
          </FormGroup>
          <LoaderButton
            block
            bsStyle="primary"
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
            isLoading={this.state.isLoading}
            text="Save"
            loadingText="Saving…"
          />
          <LoaderButton
            block
            bsStyle="danger"
            bsSize="large"
            isLoading={this.state.isDeleting}
            onClick={this.handleDelete}
            text="Delete"
            loadingText="Deleting…"
          />
        </form>}
    </div>
  );
}
}

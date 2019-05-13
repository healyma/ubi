import React, { Component } from "react";
import { API, Storage } from "aws-amplify";
import { ListGroup, ListGroupItem, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import LoaderButton from "../components/LoaderButton";
import config from "../config";
import { s3Upload } from "../libs/awsLib";
import "./Notes.css";
export default class Notes extends Component {
  constructor(props) {
    super(props);

    this.file = null;

    this.state = {
      note: null,
      content: "",
      title: "",
      attachmentURL: null,
      notes: []
    };
   
  }

  async componentDidMount() {
    try {
      let attachmentURL;
      console.log(this.props.match.params.id)
      if(this.props.match.params.id){
        const note = await this.getNote();
        const { content, title, attachment } = note;
      

      if (attachment) {
        attachmentURL = await Storage.vault.get(attachment);
      }

      this.setState({
        note,
        title,
        content,
        attachmentURL,
      });
    }
    } catch (e) {
      alert("Here's the error : " + e);
    }
    if (!this.props.isAuthenticated) {
      return;
      }
      
      try {
      const notes = await this.notes();
      this.setState({ notes });
      } catch (e) {
      alert("here's the error on line 56:"+e);
      }
      
      this.setState({ isLoading: false });
      }
      
      notes() {
        return API.get("notes", "/notes");
      }

  getNote() {
    return API.get("notes", `/notes/${this.props.match.params.id}`);
  }

 validateForm() {
  return this.state.content.length > 0;
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

saveNote(note) {
  return API.put("notes", `/notes/${this.props.match.params.id}`, {
    body: note
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
    if (this.file) {
      attachment = await s3Upload(this.file);
    }
    await this.saveNote({
      title: this.state.title,
      content: this.state.content,
      attachment: attachment || this.state.note.attachment
    });
    this.props.history.push("/");
  } catch (e) {
    alert(e);
    this.setState({ isLoading: false });
  }
}



deleteNote() {
  return API.del("notes", `/notes/${this.props.match.params.id}`);
}

handleDelete = async event => {
  event.preventDefault();

  const confirmed = window.confirm(
    "Are you sure you want to delete this note?"
  );

  if (!confirmed) {
    return;
  }

  this.setState({ isDeleting: true });

  try {
    await this.deleteNote();
    this.props.history.push("/");
  } catch (e) {
    alert(e);
    this.setState({ isDeleting: false });
  }
}
renderNotesList(notes) {
  return [{}].concat(notes).map(
    (note, i) =>
      (i !== 0 &&
         <LinkContainer
            key={note.noteId}
            to={`/notes/${note.noteId}`}
          >
            <ListGroupItem header={ note.title + " : " + note.content.trim().split("\n")[0]}>
              {"Created: " + new Date(note.createdAt).toLocaleString()}
            </ListGroupItem>
          </LinkContainer>
      ) 
  );

}
renderNotes() {
  return (
    <div className="notes">
      <div>Add a note, task or list to get started</div>
      <ListGroup>
        {!this.state.isLoading && this.renderNotesList(this.state.notes)}
      </ListGroup>
    </div>
  );
}

render() {
  console.log(this.state.note);
  return (
    <div className="Notes">
      {this.state.note ?
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
          {this.state.note.attachment &&
            <FormGroup>
              <FormLabel>Attachment</FormLabel>
              <FormControl.Static>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={this.state.attachmentURL}
                >
                  {this.formatFilename(this.state.note.attachment)}
                </a>
              </FormControl.Static>
            </FormGroup>}
          <FormGroup controlId="file">
            {!this.state.note.attachment &&
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
        </form>
        :
        this.renderNotes()
        }

    </div>
  );
}
}

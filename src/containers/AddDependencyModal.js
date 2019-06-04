import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import { API, Auth } from "aws-amplify";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";

export default class AddDependencyModal extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            show: false,
            searchList: true,
            task:props.task,
            tasks:[],
            email:""
        };

        this.handleShow = () => {
            this.setState({ show: true });
        };

        this.handleHide = () => {
            this.setState({ show: false });
        };
    }
    addDep=(task)=>{
        var path=(this.props.dependType==="Dependency"?"/dependency/":"/dependant");
        
        API.post("todos",path,{body:{taskId:this.state.task,depId:task.LI_ID}}).then((newDep)=>{
            this.getTasks();
            this.props.depsUpdated();
        });
    }
    
    componentDidMount(){
        Auth.currentUserInfo().then((user) => {
            this.setState({email:user.attributes.email},()=>{
                this.getTasks();
            });
        });
    }
    getTasks() {
        if (this.state.searchList) {
            var path = "/list-contents/getListFromTask/" + this.state.task;
        } else {
                path = "/list-contents/byUser/" + this.state.email;
        }
        API.get("todos",path).then((tasks)=>{
            this.setState({tasks},()=>{console.log(tasks)});
        })
    }

    render() {
        return (
            <>
                <Button variant="primary" onClick={this.handleShow}>
                    Add {this.props.dependType}
                </Button>

                <Modal
                    show={this.state.show}
                    onHide={this.handleHide}
                    dialogClassName="modal-90w"
                    aria-labelledby="example-custom-modal-styling-title"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="example-custom-modal-styling-title">
                            Add {this.props.dependType}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        
                            Show items from: <Form.Control as="select">
                                <option>This List</option>
                                <option>All my projects &amp; lists</option>
                                </Form.Control>
                                <ListGroup>
                                {this.state.tasks.map((task)=>(
                                <ListGroup.Item ><Button onClick={()=>{this.addDep(task)}} variant="success" style={{marginRight:"10px"}}>Add</Button>&nbsp;{task.LI_Name}</ListGroup.Item>
                                ))

                                }
                                </ListGroup>
                    </Modal.Body>
                </Modal>
            </>
        );
    }
}
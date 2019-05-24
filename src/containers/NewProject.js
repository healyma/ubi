import React, { Component } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Form from "react-bootstrap/Form";
import ProjectTemplate from "./ProjectTemplate";
import TabImportProject from "./TabImportProject";
import { API,Auth } from "aws-amplify";
export default class NewProject extends Component {

    constructor(props){
        super(props);
        this.state={
            projectCreated:false,
            projectId:0,
            email:"",
            projectName:""
        }
    }
    saveProject=()=>{
        if(!this.state.projectCreated){
            console.log("creating")
            Auth.currentUserInfo().then((user)=>{
                API.post("todos","/project",{body:{PT_Name:this.state.projectName,
                    PT_TEID:0,
                    PT_isActive:true,
                    PT_Owner_URID: user.attributes.email,
                    PT_Creator_URID:user.attributes.email
                }}).then((project)=>{
                    console.log(project)
                    this.setState({projectCreated:true,projectId: project.insertId, email:user.attributes.email});
                })
            }
            )
            
       }else{
            API.put("todos","/project/" + this.state.projectId,{body:{PT_Name:this.state.projectName,
                PT_TEID:0,
                PT_isActive:true,
                PT_Owner_URID: this.state.email,
                PT_Creator_URID:this.state.email,
                PT_CloseStatus:0
            }},(project)=>{
            })
           } 
    }
    updateName=event=>{
        console.log(event.target.value)
        this.setState({projectName:event.target.value})
    }

    render() {
        return (
            <div>
                <div>
                        <h3>Let's start a new project</h3>
                        <p>If you like, you can just enter a name and complete everything else later</p>
                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Project Name</Form.Label>
                            <Form.Control type="text" placeholder="What are you calling the project" onChange={this.updateName} ref={input => this.projectName = input}/>
                            <Form.Text className="text-muted">
                                It's better to keep it short and sweet, but meaningful.
</Form.Text>
                        </Form.Group>
</Form>
</div>
                <Tabs defaultActiveKey="template" id="newprojecttabs">

                <Tab eventKey="template" title="Project Template">
                        <ProjectTemplate template={0} industry={0}></ProjectTemplate>
                    </Tab>
                    <Tab eventKey="import" title="Import or Copy a Project">
                        <TabImportProject></TabImportProject>
                    </Tab>
                    
                </Tabs>
<button onClick={this.saveProject}>OK</button>
            </div>
        )
    }
}
import React, { Component } from "react";

import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Form from "react-bootstrap/Form";
import List from "./List";
import TabImportProject from "./TabImportProject";
import { API,Auth } from "aws-amplify";
import ProjectTemplate from "./ProjectTemplate";
import ProjectTeam from "./ProjectTeam";
import ProjectDocs from "./ProjectDocs";
import NavbarCollapse from "react-bootstrap/NavbarCollapse";
export default class NewProject extends Component {

    constructor(props){
        super(props);
        
        this.state={
            projectCreated:(props.match.params.id?true:false),
            projectId:(props.match.params.id?props.match.params.id:0),
            email:"",
            projectName:"",
            listId:0
        }
        
    }
    componentDidMount(){
        if(this.state.projectId){
            API.get("todos","/project/"+ this.state.projectId).then((project)=>{
                this.loadLists();
                this.setState({projectName:project.PT_Name}); 
            })
        }
    }
    loadLists(){
        API.get("todos","/list/project/"+ this.state.projectId).then((lists)=>{
            this.setState({ listId:lists[0].LI_ID});
        }) 
    }
    saveProject=()=>{
        if(!this.state.projectCreated){
            Auth.currentUserInfo().then((user)=>{
                API.post("todos","/project",{body:{PT_Name:this.state.projectName,
                    PT_TEID:0,
                    PT_isActive:true,
                    PT_Owner_URID: user.attributes.email,
                    PT_Creator_URID:user.attributes.email
                }}).then((project)=>{
                    this.setState({projectCreated:true,projectId: project.insertId, email:user.attributes.email});
                    this.loadLists();
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
    handleChange=event=>{
        this.setState({[event.target.id]:event.target.value})
    }

    

    render() {
        return (
            <div>
               {(this.state.projectCreated?
               <h2>{this.state.projectName}</h2>
               :
                
                <div>
                <h3>Let's start a new project</h3>
                <p>You can just enter a name and complete everything else later</p>
            <Form>
                <Form.Group controlId="projectName">
                    <Form.Label>Project Name</Form.Label>
                    <Form.Control type="text" placeholder="What are you calling the project" onChange={this.handleChange} onblur={this.handleChange} ref={input => this.projectName = input}/>
                    <Form.Text className="text-muted">
                        It's better to keep it short and sweet, but meaningful.
</Form.Text>

                </Form.Group>
</Form>
<button onClick={this.saveProject}>OK</button>
</div>)} 

       
            {this.state.projectCreated && 

                <Tabs defaultActiveKey="project" id="projecttabs">
               
                    <Tab eventKey="project" title="Summary">
                        [new component with summary info]
                    </Tab>
                 {(this.state.listId?<Tab eventKey="tasks" title="Tasks">
                        <List id={this.state.listId}></List>
                    </Tab>:<Tab></Tab>)}   
                    <Tab eventKey="reports" title="Reports">
                        [dashboards and reports]
                    </Tab>
                    <Tab eventKey="team" title="Team" >
                        <ProjectTeam></ProjectTeam>
                    </Tab>
                    <Tab eventKey="docs" title="Documents" >
                        <ProjectDocs></ProjectDocs>
                    </Tab>
                    <Tab eventKey="template" title="Project Template">
                <ProjectTemplate template={0} industry={0}></ProjectTemplate>
            </Tab>
            <Tab eventKey="import" title="Import or Copy a Project">
                <TabImportProject></TabImportProject>
            </Tab>
                </Tabs>}

            </div>
        )
    }
}
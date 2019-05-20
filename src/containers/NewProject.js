import React, { Component } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import TabNewProject from "./TabNewProject";
import ProjectTemplate from "./ProjectTemplate";
import ProjectTeam from "./ProjectTeam";
import TabImportProject from "./TabImportProject";
export default class NewProject extends Component {

    

    render() {
        return (
            <div>
                [ add predefined lists and doc templates (feature requests)]
                <Tabs defaultActiveKey="project" id="projecttabs">

                    <Tab eventKey="project" title="Project">
                        <TabNewProject></TabNewProject>
                    </Tab>
                    <Tab eventKey="import" title="Import">
                        <TabImportProject></TabImportProject>
                    </Tab>
                    <Tab eventKey="template" title="Template">
                        <ProjectTemplate></ProjectTemplate>
                    </Tab>
                    <Tab eventKey="team" title="Team" >
                        <ProjectTeam></ProjectTeam>
                    </Tab>
                </Tabs>

            </div>
        )
    }
}
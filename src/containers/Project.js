import React, { Component } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import TabNewProject from "./TabNewProject";
import ProjectTemplate from "./ProjectTemplate";
import ProjectTeam from "./ProjectTeam";
import TabImportProject from "./TabImportProject";
import ProjectDocs from "./ProjectDocs";
export default class NewProject extends Component {

    

    render() {
        return (
            <div>
                [project name ]
                <Tabs defaultActiveKey="project" id="projecttabs">

                    <Tab eventKey="project" title="Summary">
                        [new component with summary info]
                    </Tab>
                    <Tab eventKey="import" title="Tasks">
                        [gantt etc]
                    </Tab>
                    <Tab eventKey="template" title="Reports">
                        [dashboards and reports]
                    </Tab>
                    <Tab eventKey="team" title="Team" >
                        <ProjectTeam></ProjectTeam>
                    </Tab>
                    <Tab eventKey="docs" title="Documents" >
                        <ProjectDocs></ProjectDocs>
                    </Tab>
                </Tabs>

            </div>
        )
    }
}
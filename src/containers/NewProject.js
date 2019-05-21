import React, { Component } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import TabNewProject from "./TabNewProject";
import ProjectTemplate from "./ProjectTemplate";
import TabImportProject from "./TabImportProject";
export default class NewProject extends Component {

    

    render() {
        return (
            <div>
                [ add predefined lists and doc templates (feature requests)]
                <TabNewProject></TabNewProject>
                <Tabs defaultActiveKey="template" id="newprojecttabs">

                <Tab eventKey="template" title="Template">
                        <ProjectTemplate template={0} industry={0}></ProjectTemplate>
                    </Tab>
                    <Tab eventKey="import" title="Import">
                        <TabImportProject></TabImportProject>
                    </Tab>
                    
                </Tabs>

            </div>
        )
    }
}
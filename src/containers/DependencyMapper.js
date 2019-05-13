import React, { Component } from "react";
import {Row,Col} from "react-bootstrap";
import DependencyList from "./DependencyList";
import DependantsList from "./DependantsList";

export default class DependencyMapper extends Component{
    render(){
        return(
            <Row>
                <Col>
<DependantsList></DependantsList>
                </Col>
                <Col>
                <DependencyList></DependencyList>
                </Col>
            </Row>
        )
    }
}
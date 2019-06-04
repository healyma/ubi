import React, { Component } from "react";
import {Row,Col} from "react-bootstrap";
import DependsList from "./DependsList";

export default class DependencyMapper extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <Row>
                <Col>
                <DependsList task={this.props.task}></DependsList>
                </Col>
                <Col>
                
<DependsList task={this.props.task} dependants={true}></DependsList>
                </Col>
            </Row>
        )
    }
}
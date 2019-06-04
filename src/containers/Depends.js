import React, { Component } from "react";
import {API} from "aws-amplify";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";

export default class Depends extends Component{
    constructor(props){
        super(props);
        
    }
    removeDep=()=>{
        var path=(this.props.dependType==="Dependency"?"/dependency/":"/dependant/");
        
        API.del("todos",path,{body:{taskId:this.props.task,depId:this.props.depId}}).then(()=>{
            this.props.depsUpdated();
        });

    }
    render(){
        return (
            <ListGroup.Item>
                <Row>
                <Col xs md="10" className="w-75">{this.props.dep.LI_Name}</Col>
                <Col xs md="2"><Button variant="danger" onClick={()=>{this.removeDep()}}><span className="oi oi-trash"></span></Button></Col>
                </Row>
            
            </ListGroup.Item>
        )
    }
}
import React, { Component } from "react";
import {API} from "aws-amplify";
import ListGroup from "react-bootstrap/ListGroup";
import Depends from "./Depends";
import AddDependencyModal from "./AddDependencyModal";
import "./Dependency.css"
export default class DependantsList extends Component{
    constructor(props){
        super(props);
        this.state={
            deps:[],
            taskId:props.task
        }
    }
    componentDidMount(){
        this.loadDeps();
    }
    loadDeps(){
        var path=(this.props.dependants?"/dependant/":"/dependency/")
        API.get("todos",path + this.props.task).then((deps)=>{
            var depList=[];
            for(var i=0;i<deps.length;i++){
                depList.push(deps[i]);
            }
            this.setState({deps:depList});
        });
    }
    componentWillReceiveProps(newProps){

    }
    update=()=>{
        this.loadDeps();
        
    }
    render(){

        return(
        <div>
            <div><b>{this.props.dependants?"Dependants":"Dependencies"}</b>
                <ListGroup>
                    {
                        this.state.deps.map((dep)=>(
                            (<Depends dep={dep} depId={dep.LI_ID} dependType={(this.props.dependants?"Dependant":"Dependency")} depsUpdated={this.update} task={this.state.taskId}></Depends>)
                        ))
                    }
                    
                </ListGroup>
            </div>
            <div><AddDependencyModal task={this.props.task}  dependType={(this.props.dependants?"Dependant":"Dependency")} depsUpdated={this.update}></AddDependencyModal></div>
            </div>
        )
    }
}
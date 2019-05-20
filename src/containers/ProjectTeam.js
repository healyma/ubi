import React, {Component} from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
export default class ProjectTemplate extends Component{
    constructor(props){
        super(props);
        this.state={
            members:[
                {
                    id:1,
                    name:"Mark Healy",
                    email:"healy.mark.a@gmail.com",
                    memberRoles:[{id:"PM"},{id:"PS"},{id:"IC"},{id:"MN"}],
                    isUser:"true"
                }
            ]
        }
    }
    render(){
        return (
            <Container>
                <Row>
                    <Col>
                        Team Member
                    </Col>
                    <Col>
                        Email
                    </Col>
                    <Col>
                        Role
                    </Col>
                    <Col>
                        is User?
                    </Col>
                    <Col></Col>
                </Row>
                {[{}].concat(this.state.members).map((member)=>(
                    (member.memberRoles && 
                    <Row>
                    <Col>
                        {member.name}
                    </Col>
                    <Col>
                        {member.email}
                    </Col>
                    <Col>
                    { member.memberRoles.map((role)=>{
                       return( <div>{role.id} </div>)
                    })
                }
                    
                    </Col>
                    <Col>
                        {member.isUser}
                    </Col>
                    <Col><Button variant="outline-dark"><span className="oi oi-pencil"></span></Button></Col>
                </Row>
                )))}
            </Container>
        );
    }
}
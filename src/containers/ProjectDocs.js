import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import EditDoc from "./EditDoc";
import { API } from "aws-amplify";
export default class ProjectDocs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            docs: [{
                name: "some doc",
                link: "",
                lastUpdate: "2019-05-12"
            }],
            templates: [],
            doc: {
                body: null,
                title: null,
                _id: 0
            }
        }
    }
    componentDidMount() {
        this.getTemplates();
    }
    getTemplates() {
        API.get("todos", `/doc_templates`).then((temps) => {

            this.setState({
                templates: temps
            });
        });
    }
    loadTemplate = (event) => {
        API.get("todos", `/doc_template/${event.target.value}`).then((template) => {
            this.setState({
                doc:{
                body: atob(template.b64Body),
                title: template.title,
                _id: template._id
                }
            });
            console.log(this.state)
        })
    }
    render() {
        return (
            <Container>
                <Row>
                    <Col>
                        Doc Type
                    </Col>
                    <Col>
                        Name
                    </Col>
                    <Col>
                        link
                    </Col>
                    <Col>
                        last update
                    </Col>
                    <Col></Col>
                </Row>
                {[{}].concat(this.state.docs).map((doc) => (
                    (doc.lastUpdate &&
                        <Row>
                            <Col>
                                {doc.name}
                            </Col>
                            <Col>
                                {doc.link}
                            </Col>
                            <Col>
                                {doc.lastUpdate}
                            </Col>
                            <Col>
                            </Col>

                            <Col>
                                <Button variant="outline-dark"><span className="oi oi-document"></span></Button>
                                <Button variant="outline-dark"><span className="oi oi-pencil"></span></Button></Col>
                        </Row>
                    )))}
                <Row>
                    <Col>
                        <Form.Label>Document Type</Form.Label>
                        <Form.Control as="select" onChange={this.loadTemplate}>
                            <option value={0} key={0}>...</option>
                            {this.state.templates.map((item) =>
                                (item._id && <option value={item._id} key={item._id}>{item.title}</option>))}
                        </Form.Control>
                    </Col>
                    <Col><Button variant="outline-dark"><span className="oi oi-plus"></span></Button></Col>
                </Row>
                {this.state.doc.title && <EditDoc doc={this.state.doc}></EditDoc>}
            </Container>
        );
    }
}
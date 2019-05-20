import React, {Component} from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
export default class ProjectTemplate extends Component{
    constructor(props) {
        super(props);
        this.state = {
            ddIndustry: 0,
            templates: [
                [
                    { value: 1, name: "Blank" }
                ],
                [{ value: 3, name: "Self build" },
                { value: 4, name: "something else" }

                ],
                [
                    { value: 5, name: "Migration to Microservices" },
                    { value: 6, name: "MS Exchange upgrade" }

                ]
            ]
        }
    }
    handleChange = event => {

        this.setState({
            [event.target.id]: event.target.value
        });
    }
    updateTemplates = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }
    render(){
        return (
            <Form>
                            <div><h3>Select an industry and template</h3></div>
                            <Container>
                                <Row>
                                    <Col>
                                        <Form.Group controlId="ddIndustry">
                                            <Form.Label>Industry</Form.Label>
                                            <Form.Control as="select" onChange={this.updateTemplates}
                                                ref={ref => {
                                                    this.ddIndustry = ref;
                                                }}
                                                defaultValue={this.state.ddIndustry}
                                            >
                                                <option value="0">None</option>
                                                <option value="1">Construction</option>
                                                <option value="2">IT</option>
                                            </Form.Control>
                                        </Form.Group>

                                        <Form.Group controlId="formGridState">
                                            <Form.Label>Template</Form.Label>
                                            <Form.Control as="select">
                                                <option value={0} key={0}>...</option>
                                                {[{}].concat(this.state.templates[this.state.ddIndustry]).map((item) =>
                                                    (item.value && <option value={item.value} key={item.value}>{item.name}</option>))}
                                            </Form.Control>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                    </Col>
                                </Row>
                            </Container>
                        </Form>
        )
    }
}
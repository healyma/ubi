import React, {Component} from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
export default class ProjectTemplate extends Component{
    constructor(props) {
        super(props);
        this.state = {
            ddIndustry: (props.industry?props.industry:0),
            ddTemplate:(props.template?props.template:0),
            templates: [
                {industry:0, value: 0, name: "Blank", description:"An empty project where you can pick and choose the items to include" },
                {industry:1, value: 1, name: "Self build", description:"A template based on a self build project" },
                {industry:1, value: 2, name: "something else",description:"some other type of construction project" },
                {industry:2, value: 3, name: "Migration to Microservices", description:"A project template based on the typical tasks associated with migrating a legacy solution to microservices" },
                {industry:2, value: 4, name: "MS Exchange upgrade", description:"This one is based on upgrading an enterprise solution (Microsoft Exchange)" }
            ]
        }
    }
    handleChange = event => {

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
                                            <Form.Control as="select" onChange={this.handleChange}
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

                                        <Form.Group controlId="ddTemplate">
                                            <Form.Label>Template</Form.Label>
                                            <Form.Control as="select"  onChange={this.handleChange}
                                            ref={ref => {
                                                this.ddTemplate = ref;
                                            }}
                                            defaultValue={this.state.industry}>
                                            <option value={0}>---</option>
                                                {[{}].concat(this.state.templates).map((item) =>
                                                    (item.industry===this.state.ddIndustry && <option value={item.value} key={item.value}>{item.name}</option>))}
                                            </Form.Control>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                    {(this.state.templates[this.state.ddTemplate]?this.state.templates[this.state.ddTemplate].description:"please select a template")}
                                    </Col>
                                </Row>
                            </Container>
                        </Form>
        )
    }
}